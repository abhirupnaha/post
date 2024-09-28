import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export default function requestLogger(req: Request, res: Response, next: NextFunction) {
    const date = new Date().toUTCString();
    console.log(chalk.blue(`${req.method} ${req.url} ${date}`));
    next();
}