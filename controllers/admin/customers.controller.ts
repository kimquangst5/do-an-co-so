import { Request, Response } from "express";
import { colorProductService } from "../../services/admin/index.service";
import Customer from "../../models/customers.model";
import { STATUS } from "../../constants/enum";
import axios from "axios";
import { ObjectId } from "mongodb";

const index = async (req: Request, res: Response) => {
  const customers = await Customer.find({
    deleted: false,
  });

  res.render("admin/pages/customers/index.pug", {
    pageTitle: "Danh sách khách hàng",
    pageDesc: "Danh sách khách hàng",
    customers: customers,
  });
};
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findOne({
    _id: id,
    deleted: false,
  });

  // const response = await axios.get(customer.avatar, { responseType: 'arraybuffer' });
  // console.log(response.data);
  // customer['thumbnail'] = response.data
  // res.set('Content-Type', response.headers['content-type']);

  res.render("admin/pages/customers/update.pug", {
    pageTitle: "Danh sách khách hàng",
    pageDesc: "Danh sách khách hàng",
    customer,
  });
};
function capitalizeWords(str) {
  str = str.toLowerCase();
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    const firstChar = words[i].charAt(0).toUpperCase();
    const restOfWord = words[i].slice(1);
    words[i] = firstChar + restOfWord;
  }
  return words.join(" ");
}
const updatePatch = async (req: Request, res: Response) => {
  req.body.birthday = req.body.birthday.split("-").reverse().join("/");
  req.body.fullname = capitalizeWords(
    req.body.fullname.trim().replace(/\s+/g, " ")
  );
  req.body.username = req.body.username.trim().toLowerCase();
  await Customer.updateOne(
    {
      _id: new ObjectId(req.params.id),
      deleted: false,
    },
    req.body
  );

  res.json({
    code: 200,
  });
};
const deletePatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Customer.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      deleted: true,
    }
  );
  res.status(200).json({
    code: 200,
  });
};
const createAddress = async (req: Request, res: Response) => {
  await Customer.updateMany(
    { _id: req.params.id, "address.default": true }, // Tìm các địa chỉ có `default: true`
    { $set: { "address.$[].default": false } } // Cập nhật tất cả thành `false`
  );
  req.body.fullname = capitalizeWords(req.body.fullname.trim().replace(/\s+/g, ' '))
  req.body.address = capitalizeWords(req.body.address.trim().replace(/\s+/g, ' '))
  await Customer.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    {
      $push: {
        address: req.body,
      },
    }
  );

  res.json({
    code: 200,
  });
};

const getAddress = async (req: Request, res: Response) => {
  const customer = await Customer.findOne({
    _id: req.params.id,
  })
    .select("address")
    .sort({
      createdAt: -1,
    });
  res.json(customer.address);
};
const updateAddressDefault = async (req: Request, res: Response) => {
  const { customer, id } = req.params
  
  await Customer.updateMany(
    { _id: customer, "address.default": true },
    { $set: { "address.$[].default": false } }
  );

  await Customer.updateOne(
    { _id: customer, "address._id": new ObjectId(id) },
    { $set: { "address.$.default": true } }
  );
  res.json({
    code: 200
  })
};
export {
  index,
  update,
  updatePatch,
  deletePatch,
  createAddress,
  getAddress,
  updateAddressDefault,
};
