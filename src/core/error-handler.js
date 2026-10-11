function errorHandler() {
    /**
     * @param {Error} err
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    return function (err, req, res) {
        res.statusCode = err.status ?? 500;
        res.json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
                ...(process.env.NODE_ENV === "development" && {
                    stack: err.stack,
                }),
            },
        });
    };
}
exports.errorHandler = errorHandler;
