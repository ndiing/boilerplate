const { AppError } = require("./app-error.js");

function notFoundHandler() {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    return function (req, res) {
        throw new AppError({
            status: 404,
            code: "NOT_FOUND",
            message: "Not Found",
        });
    };
}
exports.notFoundHandler = notFoundHandler;
