import mongoose from "mongoose";
import Product from "../../models/products.model";
import { ObjectId } from "mongodb";

const getOne = async (query: any, selected: any) => {
  const product = await Product.findOne(query).select(selected).lean();
  return product;
};

const get = async (query: any, selected: any) => {
  const product = await Product.find(query).select(selected).lean();
  return product;
};

const create = async (data: any, userId: any) => {
  data.featured ? (data.featured = JSON.parse(data.featured)) : data;

  data.position
    ? (data.position = parseInt(data.position))
    : (data.position = (await Product.countDocuments()) + 1);
  data.createdBy = new ObjectId(userId);
  data.categoryId = JSON.parse(data.categoryId).map(
    (it: any) => new mongoose.Types.ObjectId(it)
  );
  const newProduct = new Product(data);
  await newProduct.save();
  return newProduct;
};

const update = async (productId: any, data: any) => {
  data.featured ? (data.featured = JSON.parse(data.featured)) : data;

  data.position
    ? (data.position = parseInt(data.position))
    : (data.position = await Product.countDocuments()) + 1;
  data.updatedBy = new ObjectId(data.updatedBy);
  data.categoryId = JSON.parse(data.categoryId).map(
    (it: any) => new mongoose.Types.ObjectId(it)
  );

  await Product.updateOne(
    {
      _id: productId,
    },
    data
  );
};

export { get, create, update, getOne };
