import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Role from "../../models/roles.models";
import argon2 from "argon2";
import Account from "../../models/accounts.model";
import { ObjectId } from "mongodb";
import { authService } from "./index.service";
const get = async (query: any) => {
  const account = await Account.find(query);
  return account;
};

const create = async (data: Object, userId: string) => {
  data["password"] = await argon2.hash(data["password"]);
  data["roles"] = new ObjectId(data["roles"]);
  data["createdBy"] = new ObjectId(userId);
  const newAccount = new Account(data);
  await newAccount.save();
  data["token"] = await authService.createToken(newAccount["id"]);
  await Account.updateOne(
    {
      _id: newAccount["id"],
    },
    {
      token: data["token"],
    }
  );
};

export { get, create };
