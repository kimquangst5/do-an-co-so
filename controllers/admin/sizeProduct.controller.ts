import { Request, Response } from "express";
import { sizeProductService } from "../../services/admin/index.service";

const index = async (req: Request, res: Response) => {
  const listSize = await sizeProductService.get(req.query);

  res.render("admin/pages/sizeProduct/index.pug", {
    pageTitle: "Kích thước sản phẩm",
    pageDesc: "Kích thước sản phẩm",
    listSize: listSize,
  });
};

const update = async (req: Request, res: Response) => {
  try {
    const deleteManySize = await sizeProductService.deleteMany(req.body);
    const findOneAndUpdateSize = await sizeProductService.findOneAndUpdate(
      req.body
    );

    res.json({
      code: 200,
    });
  } catch (error) {
    res.json({
      code: 400,
    });
  }
};

export { index, update };
