import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quote"
  }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;