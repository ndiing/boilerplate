const { template } = require("../module.js");

function transformMethod(method) {
    return method.toLowerCase();
}

/**@param {import("../module").ParseResult} parsed*/
module.exports = (parsed) => /* prettier-ignore */ template`const {Router} = require("@ndiinginc/router/src/router.js");
const controller = require("./controller.js");

const router = new Router();
${template`
${parsed.requests?.filter(req=>!req.isDuplicate)?.map(req=>`router.${transformMethod(req.method)}("/:sessionId${req.pathname}", controller.${req.methodName});`)}
`}
module.exports = {
    path: "/api/${parsed.name}",
    router,
};`;
