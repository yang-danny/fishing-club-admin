import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  title: String,
  date: String,
  time: String,
  location:String,
  funder:String,
  media: [String],
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
