import { NextFunction, Request, Response } from "express";
import ROUTERS from "../../constants/routes/index.routes";
import jwt from "jsonwebtoken";
import Account from "../../models/accounts.model";
import Role from "../../models/roles.models";
import Path from "../../models/paths.model";

const checkRoute = async (req: Request, res: Response, next: NextFunction) => {
  const paths = await Path.find();
  res.locals.ROUTERS = paths[0];

  next();
};

export default checkRoute;
