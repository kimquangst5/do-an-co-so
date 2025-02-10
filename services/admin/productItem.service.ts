import Product from "../../models/products.model";
import { ObjectId } from "mongodb";
import ProductItem from "../../models/product-items.model";

const get = async (query: any) => {
     const productItems = await ProductItem.find(query);
     return productItems;
};

const create = async (productId: any, bien_the: any, userId: any) => {
     const listData = JSON.parse(bien_the);
     const result = [];
     listData.forEach((it) => {
          const data = {
               productId: new ObjectId(productId),
               color: new ObjectId(it.color),
               size: new ObjectId(it.size),
               price: parseInt(it.price),
               discount: parseInt(it.discount),
               quantity: parseInt(it.quantity),
               createdBy: new ObjectId(userId),
               status: it.status,
          };
          result.push(data);
     });

     await ProductItem.insertMany(result);
};

const update = async (productId: any, bien_the: any, userId: any) => {
     const listData = JSON.parse(bien_the);
     const id = listData.filter((it) => it.id).map((it) => it.id);
     await ProductItem.deleteMany({
          productId: productId,
          _id: {
               $nin: id,
          },
     });

     for await (const it of listData) {
          it.color = new ObjectId(it.color);
          it.size = new ObjectId(it.size);
          it.productId = new ObjectId(productId);
          if (it.id) {
               await ProductItem.updateOne(
                    {
                         _id: it.id,
                    },
                    it
               );
          } else {
               it.productId = new ObjectId(productId);
               const newPI = new ProductItem(it);
               await newPI.save();
          }
     }
};

export { get, create, update };
