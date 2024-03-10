import mongoose from "mongoose";

const faqSchema = mongoose.Schema({
  question: String,
  answer: String,
});

const bannerImageSchema = mongoose.Schema({
  public_id: String,
  url: String,
});

const categories = mongoose.Schema({
  title: String,
});

const layoutSchema = mongoose.Schema({
  type: { type: String },
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
  categories: [categories],
  faqs: [faqSchema],
});

export default mongoose.model("Layout", layoutSchema);
