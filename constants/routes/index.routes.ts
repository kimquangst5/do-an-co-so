import "dotenv/config";
import ROUTER_ADMIN from "./admin.routes";
import ROUTER_CLIENT from "./client.routes";

const ROUTERS = {
  ADMIN: ROUTER_ADMIN,
  CLIENT: ROUTER_CLIENT,
};
export default ROUTERS;
