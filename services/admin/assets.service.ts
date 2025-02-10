import Product from "../../models/products.model";
import { ObjectId } from "mongodb";
import { TYPE_IMAGE } from "../../constants/enum";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";

const getOne = async (query: any) => {
  const listAsset = await Assets.findOne(query);
  return listAsset;
};

const get = async (query: any) => {
  const listAsset = await Assets.find(query);
  return listAsset;
};

export { get, getOne };
