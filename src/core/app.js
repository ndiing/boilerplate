const App = require("@ndiinginc/router");
const { json } = require("@ndiinginc/router/src/middleware.js");
const { notFoundHandler } = require("./not-found-handler.js");
const { errorHandler } = require("./error-handler.js");
const { loadModules } = require("./load-modules.js");

const app = new App();
app.use(json());
loadModules(app);
app.use(notFoundHandler());
app.use(errorHandler());
exports.app = app;
