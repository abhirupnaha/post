export default function requestLogger(req, res, next) {
    const date = new Date();
    console.log(`${req.method} ${req.url} ${date.toUTCString()}`);
    next();
}
//# sourceMappingURL=requestLogger.js.map