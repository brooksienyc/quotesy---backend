
import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  category: String,
  author: String,
  text: String,
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;