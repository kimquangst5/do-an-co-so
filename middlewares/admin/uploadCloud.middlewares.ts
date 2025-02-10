import { NextFunction, Request, Response } from "express";
import streamUploadHelper from "../../helpers/streamUpload.helper";
import iconv from "iconv-lite";
import Assets from "../../models/assets.model";

const multi = async (req: Request, res: Response, next: NextFunction) => {
     if (req["files"].images_main && req["files"].images_main.length > 0) {
          let dataPushAssetsMain = [];
          for await (const it of req["files"].images_main) {
               const fileName = it.originalname.slice(
                    0,
                    it.originalname.lastIndexOf(".")
               );
               const filename = iconv
                    .decode(Buffer.from(fileName, "latin1"), "utf8")
                    .replace(/\s+/g, "_");

               let upload = async (buffer: any) => {
                    let result = await streamUploadHelper(buffer, filename);
                    const newAssets = {
                         filename: result["display_name"].replace(/_/g, " "),
                         path: result["secure_url"],
                         size: parseInt(result["bytes"]),
                         type: result["resource_type"],
                         format: result["format"],
                    };
                    dataPushAssetsMain.push(newAssets);
               };
               await upload(it.buffer);
          }
          const listAssets = await Assets.insertMany(dataPushAssetsMain);
          req.body[req["files"].images_main[0].fieldname] = listAssets;
     }
     if (req["files"].images_sub && req["files"].images_sub.length > 0) {
          let dataPushAssetsSub = [];
          for await (const it of req["files"].images_sub) {
               const fileName = it.originalname.slice(
                    0,
                    it.originalname.lastIndexOf(".")
               );
               const filename = iconv
                    .decode(Buffer.from(fileName, "latin1"), "utf8")
                    .replace(/\s+/g, "_");

               let upload = async (buffer: any) => {
                    let result = await streamUploadHelper(buffer, filename);

                    const newAssets = {
                         filename: result["display_name"].replace(/_/g, " "),
                         path: result["secure_url"],
                         size: parseInt(result["bytes"]),
                         type: result["resource_type"],
                         format: result["format"],
                    };
                    dataPushAssetsSub.push(newAssets);
               };
               await upload(it.buffer);
          }
          const listAssets = await Assets.insertMany(dataPushAssetsSub);
          req.body[req["files"].images_sub[0].fieldname] = listAssets;
     }
     next();
};

const single = async (req: Request, res: Response, next: NextFunction) => {
     next();
};

export { multi, single };
