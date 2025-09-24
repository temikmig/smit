import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const authRouter = Router();
const REFRESH_COOKIE_NAME = "jid";

function signAccess(userId: string, role: string) {
  return jwt.sign({ sub: userId, role }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

authRouter.post("/register", async (req, res) => {
  const { login, password, name, lastName } = req.body;

  if (!login || !password) {
    return res.status(400).json({ msg: "Login and password required" });
  }

  const exists = await prisma.user.findUnique({ where: { login } });
  if (exists) return res.status(409).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      login,
      password: hash,
      name,
      lastName,
      role: "ADMIN", // 👈 дефолтная роль
    },
    select: { id: true, login: true, name: true, lastName: true, role: true },
  });

  res.status(201).json(user);
});

authRouter.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await prisma.user.findUnique({ where: { login } });
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

  const accessToken = signAccess(user.id, user.role);

  const refreshToken = crypto.randomBytes(64).toString("hex");
  const tokenHash = hashToken(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней

  await prisma.refreshToken.create({
    data: { tokenHash, userId: user.id, expiresAt },
  });

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.json({
    accessToken,
    user: {
      id: user.id,
      login: user.login,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
    },
  });
});

authRouter.post("/refresh", async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE_NAME];
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  const tokenHash = hashToken(token);

  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return res.status(401).json({ msg: "Invalid or expired refresh token" });
  }

  const accessToken = signAccess(tokenRecord.user.id, tokenRecord.user.role);

  res.json({
    accessToken,
    user: {
      id: tokenRecord.user.id,
      login: tokenRecord.user.login,
      name: tokenRecord.user.name,
      lastName: tokenRecord.user.lastName,
      role: tokenRecord.user.role,
    },
  });
});

// ---------- LOGOUT ----------
authRouter.post("/logout", async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE_NAME];
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.refreshToken.deleteMany({ where: { tokenHash } });
  }

  res.clearCookie(REFRESH_COOKIE_NAME);
  res.json({ msg: "Logged out" });
});

export default authRouter;
