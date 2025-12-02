import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

interface CustomClaims {
  roles?: string[];
  [key: string]: any;
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken & CustomClaims;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "test") return next();

  const header = req.headers.authorization;

  if (!header?.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const roles = req.user.roles || [];
    if (req.user[role] === true || roles.includes(role)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};