import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
     {
          product_id: {
               type: mongoose.SchemaTypes.ObjectId,
               required: true,
          },
          customer_id: {
               type: mongoose.SchemaTypes.ObjectId,
               required: true,
          },
          rating: Number,
          content: {
               type: String,
          },


          is_approved: {
               type: Boolean,
               default: false,
          },

     },
     {
          timestamps: true,
          autoCreate: true,
     }
);


const Review = mongoose.model("Review", reviewSchema);

export default Review;
