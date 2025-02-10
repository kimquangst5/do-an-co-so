import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";

const get = async (data: any) => {
  const listSize = await SizeProduct.find(data);
  return listSize;
};

const deleteMany = async (data: any) => {
  const listId = data
    .filter((it: { id: any }) => it.id)
    .map((it: { id: any }) => it.id);
  await SizeProduct.deleteMany({
    _id: {
      $nin: listId,
    },
  });
};

const findOneAndUpdate = async (data: any) => {
  for (const it of data) {
    if (it.id) {
      await SizeProduct.findOneAndUpdate(
        { _id: it.id },
        { $set: it },
        { upsert: true }
      );
    } else {
      const newColorProduct = new SizeProduct(it);
      await newColorProduct.save();
    }
  }
};

export { get, deleteMany, findOneAndUpdate };
