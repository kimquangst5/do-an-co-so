import { Request, Response } from "express";
import Role from "../../models/roles.models";
import { rolesService } from "../../services/admin/index.service";
import { ObjectId } from "mongodb";
import Account from "../../models/accounts.model";

const index = async (req: Request, res: Response) => {
  const roles = await Role.find({
    deleted: false,
  });
  for (const it of roles) {
    if (it.createdBy) {
      const user = await Account.findOne({
        _id: it.createdBy,
      });
      it['author'] = user.fullname
    }
  }
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Danh sách nhóm quyền",
    pageDesc: "Danh sách nhóm quyền",
    roles: roles,
  });
};

const create = (req: Request, res: Response) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Thêm nhóm quyền",
    pageDesc: "Thêm nhóm quyền",
  });
};

const createPost = async (req: Request, res: Response) => {
  req.body.createdBy = new ObjectId(res.locals.INFOR_USER.id);
  const newRole = rolesService.create(req.body);
  res.json({
    code: 200,
  });
};

const permission = async (req: Request, res: Response) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/roles/permission.pug", {
    pageTitle: "Phân quyền",
    roles: roles,
  });
};
const permissionPatch = async (req: Request, res: Response) => {
  req.body.forEach(async (it: any) => {
    await Role.updateOne(
      {
        _id: it.roleId,
      },
      {
        permission: it.permission,
      }
    );
  });
  res.json({
    code: 200,
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await Role.findOne({
    _id: id,
  });

  res.render("admin/pages/roles/update.pug", {
    pageTitle: role.name,
    pageDesc: role.description,
    role: role,
  });
};

const updatePatch = async (req: Request, res: Response) => {
  await Role.updateOne(
    {
      _id: req.params.id,
    },
    req.body
  );
  res.json({
    code: 200,
  });
};

const deletePatch = async (req: Request, res: Response) => {
  await Role.updateOne({
    _id: new ObjectId(req.params.id)
  }, {
    deleted: true
  })
  console.log(req.params);
  
  res.json({
    code: 200
  })
}

export {
  index,
  create,
  createPost,
  permission,
  permissionPatch,
  updatePatch,
  update,
  deletePatch
};
