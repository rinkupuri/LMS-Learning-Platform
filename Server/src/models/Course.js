import mongoose from "mongoose";

// review Reply Schema
const reviewReplySchema = mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  reply: {
    type: String,
  },
});

// review Schema

const reviewSchema = mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  reviewRating: {
    type: Number,
    default: 0,
  },
  review: {
    type: String,
  },
  reviewReply: [reviewReplySchema],
});

const linkSchema = mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
});

const commentSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    questionReply: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const courseDataSchema = mongoose.Schema({
  videoUrl: String,
  title: String,
  description: String,
  videoThumbnail: Object,
  videoSection: String,
  videolength: Number,
  videoplayer: String,
  links: [linkSchema],
  suggestion: String,
  question: [commentSchema],
});

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    estimatedprice: {
      type: Number,
    },
    thumbnail: {
      public_id: String,
      url: String,
    },
    tags: {
      type: String,
    },
    level: {
      type: String,
    },
    demoUrl: { type: String, require: true },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
