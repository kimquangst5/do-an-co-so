import { Request, Response } from "express";
import {
     accountsService,
     rolesService,
} from "../../services/admin/index.service";
import Role from "../../models/roles.models";
import Account from "../../models/accounts.model";

const index = async (req: Request, res: Response) => {
     const accounts = await Account.find({
          deleted: false,
     });
     for await (const acc of accounts) {
          const role = await Role.findOne({
               _id: acc.roles,
          });
          acc["role_name"] = role.name;
     }
     // accounts.forEach(async (acc) => {
     //   const role = await Role.findOne({
     //     _id: acc.roles,
     //   });
     //   console.log(role);

     // });
     res.render("admin/pages/accounts/index.pug", {
          pageTitle: "Danh sách tài khoản quản trị",
          pageDesc: "Danh sách tài khoản quản trị",
          accounts: accounts,
     });
};

const create = async (req: Request, res: Response) => {
     req.query.deleted = "false";
     req.query.status = "active";
     const listRole = await rolesService.get(req.query);
     res.render("admin/pages/accounts/create.pug", {
          pageTitle: "Thêm tài khoản quản trị",
          pageDesc: "Thêm tài khoản quản trị",
          listRole: listRole,
     });
};

const createPost = async (req: Request, res: Response) => {
     const newAccount = await accountsService.create(
          req.body,
          res.locals.INFOR_USER.id
     );
     res.json({
          code: 200,
     });
};

export { index, create, createPost };
