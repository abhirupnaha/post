const times = [100, 500, 1000];
export default async function delay(req, res, next) {
    const time = times[Math.floor(Math.random() * (times.length - 1))];
    await new Promise((resolve) => {
        setTimeout(() => resolve(1), time);
    });
    next();
}
//# sourceMappingURL=delay.js.map