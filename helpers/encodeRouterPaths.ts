import { GeneralRoutes, RouterAdmin } from "../constants/routes/admin.routes";

function encodeRouterPathsSync(router: RouterAdmin): RouterAdmin {
  const encodedRouter: any = {};

  for (const key in router) {
    if (typeof router[key] === "object" && router[key] !== null) {
      encodedRouter[key] = encodeRouterPathsSync(router[key] as any);
    } else if (typeof router[key] === "string") {
      const originalValue = router[key];
      const encodedValue = encodeURIComponent(router[key]).replace(/%2F/g, "/");
      encodedRouter[key] =
        originalValue === encodedValue ? originalValue : encodedValue;
    } else {
      encodedRouter[key] = router[key];
    }
  }

  return encodedRouter as RouterAdmin;
}
export { encodeRouterPathsSync };
