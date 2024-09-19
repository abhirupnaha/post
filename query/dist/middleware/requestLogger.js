export default function requestLogger(req, res, next) {
    const date = new Date().toUTCString();
    console.log(`${req.method} ${req.url} ${date}`);
    next();
}
//# sourceMappingURL=requestLogger.js.map