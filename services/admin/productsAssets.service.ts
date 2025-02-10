import Product from "../../models/products.model";
import { ObjectId } from "mongodb";
import { TYPE_IMAGE } from "../../constants/enum";
import ProductAssets from "../../models/productAssets.model";
import console from "console";
import { productAssetsService, productItemService } from "./index.service";

const get = async (query: any) => {
     const listProAsset = await ProductAssets.find(query);
     return listProAsset;
};

const create = async (productId: any, data: any) => {
     if (data.images_main && data.images_main.length > 0) {
          const result = [];
          for await (const it of data.images_main) {
               const data = {
                    productId: new ObjectId(productId),
                    assetsId: new ObjectId(it.id),
                    type: TYPE_IMAGE.MAIN,
               };
               result.push(data);
          }
          await ProductAssets.insertMany(result);
     }
     if (data.images_sub && data.images_sub.length > 0) {
          const result = [];
          for await (const it of data.images_sub) {
               const data = {
                    productId: new ObjectId(productId),
                    assetsId: new ObjectId(it.id),
                    type: TYPE_IMAGE.SUB,
               };
               result.push(data);
          }
          await ProductAssets.insertMany(result);
     }
};

const update = async (productId: any, data: any) => {
     // await ProductAssets.deleteMany({
     //      productId: productId,
     //      assetsId: { $nin: JSON.parse(data.images_main_id) },
     //      type: TYPE_IMAGE.MAIN,
     // });
     // await ProductAssets.deleteMany({
     //      productId: productId,
     //      assetsId: { $nin: JSON.parse(data.images_sub_id) },
     //      type: TYPE_IMAGE.SUB,
     // });
     //   console.log(data);

     if (data.images_main && data.images_main.length > 0) {
          const result = [];
          let indexMain: Number = 1;
          for await (const [index, it] of data.images_main.entries()) {
               const data = {
                    productId: new ObjectId(productId),
                    assetsId: new ObjectId(it.id),
                    type: TYPE_IMAGE.MAIN,
                    position: index + 1
               };
               result.push(data);
          }
          await ProductAssets.insertMany(result);
     }
     if (data.images_sub && data.images_sub.length > 0) {
          const result = [];
          for await (const [index, it] of data.images_sub.entries()) {
               const data = {
                    productId: new ObjectId(productId),
                    assetsId: new ObjectId(it.id),
                    type: TYPE_IMAGE.SUB,
                    position: index + 1
               };
               result.push(data);
          }
          await ProductAssets.insertMany(result);
     }
};

export { get, create, update };
