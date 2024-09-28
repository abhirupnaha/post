import chalk from "chalk";
export default function requestLogger(req, res, next) {
    const date = new Date().toUTCString();
    console.log(chalk.blue(`${req.method} ${req.url} ${date}`));
    next();
}
//# sourceMappingURL=requestLogger.js.map