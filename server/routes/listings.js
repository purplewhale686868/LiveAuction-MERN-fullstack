import express from "express";
import Listing from "../models/Listing.js";
import User from "../models/User.js";
import Bid from "../models/Bid.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create listing
router.post("/newListing", verifyToken, async (req, res) => {
  try {
    const { userId, title, description, imagePath, category, bid } = req.body;

    const newListing = new Listing({
      ownerId: userId,
      title,
      description,
      imagePath,
      category,
      bid,
      winnerId: "",
    });
    const savedListing = await newListing.save();

    const newBid = new Bid({ bid, ownerId: userId, listingId: newListing._id });
    await newBid.save();

    res.status(200).json(savedListing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get 1 listing
router.get("/find/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all listings
router.get("/allListings", async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get category listings
router.get("/listings/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const listings = await Listing.find({
      category: category,
    });

    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// addRemoveWatchlist
router.patch("/:listingId/watchlist", verifyToken, async (req, res) => {
  try {
    const { listingId } = req.params;
    const { userId } = req.body;
    const listing = await Listing.findById(listingId);

    const user = await User.findById(userId);

    if (user.watchlist.includes(listingId)) {
      user.watchlist = user.watchlist.filter((id) => id !== listingId);
      listing.watchlistOwner = listing.watchlistOwner.filter(
        (id) => id !== userId
      );
    } else {
      user.watchlist.push(listingId);
      listing.watchlistOwner.push(userId);
    }
    // await user.save();
    await User.findByIdAndUpdate(
      userId,
      { watchlist: user.watchlist },
      { new: true }
    );

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { watchlistOwner: listing.watchlistOwner },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// bidding
router.patch("/:listingId/bidding", verifyToken, async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    const { userId } = req.body;

    const { bid } = req.body;
    let currentBid = listing.bid;
    const bidding = Number(bid);
    if (bidding > currentBid) {
      currentBid = bidding;
      await Bid.findOneAndUpdate(
        { listingId: listingId },
        { bid: currentBid, ownerId: userId },
        { new: true }
      );

      const updatedListing = await Listing.findByIdAndUpdate(
        listingId,
        { bid: currentBid },
        { new: true }
      );
      res.status(200).json(updatedListing);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// close listing
router.patch("/:listingId/closeListing", verifyToken, async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId);

    // const { bid } = req.body;

    const winningBid = await Bid.findOne({ listingId: listingId });
    const winner = winningBid.ownerId;

    listing.winnerId = winner;

    const updatedListing = await Listing.findOneAndUpdate(
      { _id: listingId },
      { winnerId: listing.winnerId, isActive: false },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
