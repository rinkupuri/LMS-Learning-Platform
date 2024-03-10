import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    payment_info: {
      type: Object,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
