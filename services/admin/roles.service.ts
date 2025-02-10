import { Request, Response } from "express";
import Role from "../../models/roles.models";

const get = async (data: Object) => {
  data["deleted"] ? (data["deleted"] = JSON.parse(data["deleted"])) : data;
  const listRole = await Role.find(data);
  return listRole;
};

const create = async (data: Object) => {
  const newRole = new Role(data);
  await newRole.save();
};

export { get, create };
