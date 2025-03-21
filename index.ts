import "dotenv/config";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import routeClient from "./routes/client/index.route";
import routeAdmin from "./routes/admin/index.route";
import ROUTERS from "./constants/routes/index.routes";
import "./database/mongodb.connect";
import Path from "./models/paths.model";

const app: Application = express();
const port: number = parseInt(process.env.PORT) | 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// app.locals.ROUTERS = ROUTERS;
// console.log(ROUTERS);

app.use(express.static(`${__dirname}/public`));

const isDist = __dirname.includes("dist");
const nodeModulesPathTinymce = isDist
  ? path.join(__dirname, "..", "node_modules", "tinymce")
  : path.join(__dirname, "node_modules", "tinymce");
app.use(`/tinymce`, express.static(nodeModulesPathTinymce));

const nodeModulesPath = isDist
  ? path.join(__dirname, "..", "node_modules")
  : path.join(__dirname, "node_modules");
app.use("/node_modules", express.static(nodeModulesPath));
// app.get("/tinymce", (req: Request, res: Response) => {
//   res.setHeader("Content-Type", "text/javascript");
//   res.sendFile(path.join(__dirname, "node_modules", "tinymce"));
// });

routeClient(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(
    `Đang lắng nghe cổng ${port} - http://localhost:${port}/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT.PATH}${ROUTERS.ADMIN.PRODUCT.INDEX}`
  );
});
