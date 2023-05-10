import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    bid: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: String,
    },
    listingId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", BidSchema);
export default Bid;
