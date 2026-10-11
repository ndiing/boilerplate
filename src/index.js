require("dotenv").config();

const http = require("http");
const { shutdown } = require("./core/shutdown.js");
const { start } = require("./core/start.js");
const { app } = require("./core/app.js");
const { Request } = require("@ndiinginc/router/src/request.js");
const { Response } = require("@ndiinginc/router/src/response.js");

const server = http.createServer(
    {
        IncomingMessage: Request,
        ServerResponse: Response,
    },
    (req, res) => app.handleRequest(req, res),
);

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception", error);

    shutdown(server, "uncaughtException");
});
process.on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection", reason);

    shutdown(server, "unhandledRejection");
});

process.on("SIGTERM", () => shutdown(server, "SIGTERM"));
process.on("SIGINT", () => shutdown(server, "SIGINT"));

start(server);
