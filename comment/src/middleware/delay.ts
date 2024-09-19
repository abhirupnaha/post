import { NextFunction, Request, Response } from "express";

const times = [100, 500, 1000];

export default async function delay(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const time = times[Math.floor(Math.random() * (times.length - 1))];
  await new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
  next();
}
