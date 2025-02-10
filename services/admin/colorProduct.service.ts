import ColorProduct from "../../models/colorProduct.model";

const get = async (data: any) => {
  const listColor = await ColorProduct.find({});
  return listColor;
};

const deleteMany = async (data: any) => {
  const listId = data
    .filter((it: { id: any }) => it.id)
    .map((it: { id: any }) => it.id);
  await ColorProduct.deleteMany({
    _id: {
      $nin: listId,
    },
  });
};

const findOneAndUpdate = async (data: any) => {
  for (const it of data) {
    if (it.id) {
      await ColorProduct.findOneAndUpdate(
        { _id: it.id },
        { $set: it },
        { upsert: true }
      );
    } else {
      const newColorProduct = new ColorProduct(it);
      await newColorProduct.save();
    }
  }
};

export { get, deleteMany, findOneAndUpdate };
