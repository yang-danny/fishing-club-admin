import mongoose from "mongoose";

const publishNewsSchema = new mongoose.Schema({

  title: String,
  author: String,
  publisher: String,
  media: [String],
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PublishNews = mongoose.models.PublishNews || mongoose.model("PublishNews", publishNewsSchema);

export default PublishNews;
