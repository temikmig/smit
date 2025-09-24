import { Router, type Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, UserRole, Prisma } from "@prisma/client";
import type { AuthRequest, UpdateUserData } from "../types/auth.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";
import type { CreateUserData } from "../types/users.js";

const prisma = new PrismaClient();
const usersRouter = Router();

usersRouter.get(
  "/list",
  authMiddleware,
  adminOnly,
  async (req: AuthRequest, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const sortColumn = (req.query.sortColumn as string) || "name";
      const sortOrder =
        (req.query.sortOrder as string) === "desc" ? "desc" : "asc";

      const where: Prisma.UserWhereInput = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { login: { contains: search, mode: "insensitive" } },
            ],
          }
        : {};

      const total = await prisma.user.count({ where });

      const users = await prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortColumn ? { [sortColumn]: sortOrder } : { name: "asc" },
        select: {
          id: true,
          login: true,
          name: true,
          lastName: true,
          role: true,
        },
      });

      res.json({ users, total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

usersRouter.get(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: { id: true, login: true, name: true, lastName: true, role: true },
    });

    res.json(user);
  }
);

usersRouter.get(
  "/:id",
  authMiddleware,
  adminOnly,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "User ID required" });

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, login: true, name: true, lastName: true, role: true },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  }
);

usersRouter.post(
  "/create",
  authMiddleware,
  adminOnly,
  async (req: AuthRequest<CreateUserData>, res: Response) => {
    const { login, password, name, lastName, role } = req.body;

    if (!login || !password || !role)
      return res.status(400).json({ msg: "Login, password and role required" });

    const exists = await prisma.user.findUnique({ where: { login } });
    if (exists) return res.status(409).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { login, password: hash, role, name, lastName },
      select: { id: true, login: true, name: true, lastName: true, role: true },
    });

    res.status(201).json(user);
  }
);

usersRouter.patch(
  "/update/:id",
  authMiddleware,
  async (req: AuthRequest<UpdateUserData>, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "User ID required" });

    const { login, password, name, lastName, role } = req.body;

    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
    if (req.user.role !== UserRole.ADMIN && req.user.sub !== id)
      return res.status(403).json({ msg: "Forbidden" });
    if (req.user.role !== UserRole.ADMIN && role)
      return res.status(403).json({ msg: "Cannot change your role" });

    const data: Partial<UpdateUserData> = {
      ...(login && { login }),
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(password && { password: await bcrypt.hash(password, 12) }),
      ...(role && req.user.role === UserRole.ADMIN && { role }),
    };

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, login: true, name: true, lastName: true, role: true },
    });

    res.json(user);
  }
);

usersRouter.patch(
  "/update-me",
  authMiddleware,
  async (req: AuthRequest<UpdateUserData>, res: Response) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const { login, password, name, lastName } = req.body;

    const data: Partial<UpdateUserData> = {
      ...(login && { login }),
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(password && { password: await bcrypt.hash(password, 12) }),
    };

    const user = await prisma.user.update({
      where: { id: req.user.sub },
      data,
      select: { id: true, login: true, name: true, lastName: true, role: true },
    });

    res.json(user);
  }
);

usersRouter.delete(
  "/delete/:id",
  authMiddleware,
  adminOnly,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "User ID required" });

    await prisma.user.delete({ where: { id } });
    res.json({ msg: "User deleted" });
  }
);

export default usersRouter;
