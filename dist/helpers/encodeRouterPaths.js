"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeRouterPathsSync = encodeRouterPathsSync;
function encodeRouterPathsSync(router) {
    const encodedRouter = {};
    for (const key in router) {
        if (typeof router[key] === "object" && router[key] !== null) {
            encodedRouter[key] = encodeRouterPathsSync(router[key]);
        }
        else if (typeof router[key] === "string") {
            const originalValue = router[key];
            const encodedValue = encodeURIComponent(router[key]).replace(/%2F/g, "/");
            encodedRouter[key] =
                originalValue === encodedValue ? originalValue : encodedValue;
        }
        else {
            encodedRouter[key] = router[key];
        }
    }
    return encodedRouter;
}
