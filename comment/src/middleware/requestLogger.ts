import { Request, Response, NextFunction } from "express";

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date = new Date().toUTCString();
  console.log(`${req.method} ${req.url} ${date}`);
  next();
}
