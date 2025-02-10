import { Request, Response } from "express";
import { colorProductService } from "../../services/admin/index.service";

const index = async (req: Request, res: Response) => {
  const listColor = await colorProductService.get(req.query);

  res.render("admin/pages/colorProduct/index.pug", {
    pageTitle: "Thêm màu sắc sản phẩm",
    pageDesc: "Thêm màu sắc sản phẩm",
    listColor: listColor,
  });
};

const update = async (req: Request, res: Response) => {
  const deleteManyColor = await colorProductService.deleteMany(req.body);
  const findOneAndUpdateColor = await colorProductService.findOneAndUpdate(
    req.body
  );

  res.json({
    code: 200,
  });
};

export { index, update };
