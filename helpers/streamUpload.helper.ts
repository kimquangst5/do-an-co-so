import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import "../configs/cloudinary.config";

export default (buffer: Buffer, filename: any) => {
  return new Promise((resolve: any, reject: any) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "Kim Quang",
        public_id: filename,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
