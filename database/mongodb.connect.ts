import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECT);
    console.log("Kết nối database thành công!");
  } catch (error) {
    console.log("Kết nối database thất bại!");
  }
};

connect();

export default connect;
