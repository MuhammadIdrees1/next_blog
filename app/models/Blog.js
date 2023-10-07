import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      required: true,
      min: 6,
    },
    imageurl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Nature",
        "Mountain",
        "Ocean",
        "Wildlife",
        "Forest",
        "Tech",
        "Science",
      ],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
