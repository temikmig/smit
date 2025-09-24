import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest, AuthUserPayload } from "../types/auth.js";
import { UserRole } from "@prisma/client";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ msg: "Malformed token" });
  }

  const token = parts[1];
  if (!token) return res.status(401).json({ msg: "Token missing" });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as unknown as AuthUserPayload;

    if (!payload?.sub || !payload?.role) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== UserRole.ADMIN)
    return res.status(403).json({ msg: "Forbidden" });
  next();
}
