
import mongoose from "mongoose";

const DistinovaSchema=new mongoose.Schema(
    {
           packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    packageImage: {
      type: String,
      // required: true,
    },
    packageType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Distinova = mongoose.model("Distinova",DistinovaSchema);

export default Distinova;