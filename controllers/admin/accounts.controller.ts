import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  accountsService,
  rolesService,
} from "../../services/admin/index.service";
import Role from "../../models/roles.models";
import Account from "../../models/accounts.model";
import { capitalizeWords } from "../../helpers/capitalizeWords.helper";

const index = async (req: Request, res: Response) => {
  const accounts = await Account.find({
    deleted: false,
  });
  for await (const acc of accounts) {
    const role = await Role.findOne({
      _id: acc.roles,
    });
    acc["role_name"] = role.name;
    if (acc.createdBy) {
      const author = await Account.findOne({
        _id: acc.createdBy,
      });
      acc["author"] = author.fullname;
    }
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

const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  const account = await Account.findOne({
    deleted: false,
    _id: new ObjectId(id),
  }).select("-token -password");
  const listRole = await Role.find({
    deleted: false,
    status: "active",
  });
  res.render("admin/pages/accounts/update.pug", {
    pageTitle: "Cập nhật tài khoản",
    account: account,
    listRole: listRole,
  });
};
const updatePatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  req.body.fullname = capitalizeWords(
    req.body.fullname.trim().replace(/\s+/g, " ")
  );

  await Account.updateOne(
    {
      deleted: false,
      _id: new ObjectId(id),
    },
    req.body
  );
  res.json({
    code: 200,
  });
};
const deletePatch = async (req: Request, res: Response) => {
  console.log(req.params);
  await Account.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    {
      deleted: true,
    }
  );
  res.json({
    code: 200,
  });
};

export { index, create, createPost, update, updatePatch, deletePatch };
