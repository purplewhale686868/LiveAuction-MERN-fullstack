import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // price
    bid: {
      type: Number,
      required: true,
      min: [1, "At least $1"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // winner -> userId
    winnerId: {
      type: String,
    },
    ownerId: {
      type: String,
    },

    // array of userId
    watchlistOwner: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
