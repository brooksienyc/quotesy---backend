import Favorite from '../models/fav-model.js'
import Quote from '../models/quote-model.js'


// CREATE
export const createFavorite = async (req, res) => {
  try {
    const { quoteId } = req.body;

    // Check if the Quote already exists
    const existingQuote = await Quote.findById(quoteId);

    let quote;
    if (existingQuote) {
      quote = existingQuote;
    } else {
      // Create a new Quote document
      const { category, author, text } = req.body;
      quote = new Quote({ category, author, text });
      await quote.save();
    }

    // Create a new Favorite document
    const favorite = new Favorite({ quoteId: quote._id });
    await favorite.save();

    // Fetch the complete quote data
    const populatedFavorite = await Favorite.findById(favorite._id).populate('quoteId', 'category author text');

    res.status(200).json(populatedFavorite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};







// READ ALL (must choose populate so that the entire quote content is the response and map through for that ID)
// export const getAllFavorites = async (req, res) => {
//   try {
//     const favorites = await Favorite.find().populate('quoteId', '-_id category author text');
//     res.json(favorites.map(favorite => favorite.quoteId));
//   }
//   catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: error.message });
//   }
// };

// READ ALL
export const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find();
    const populatedFavorites = await Promise.all(
      favorites.map(async (favorite) => {
        const quote = await Quote.findById(favorite.quoteId);
        return {
          // using spread operator - creating a new object to house all of the properties in favorite
          ...favorite.toObject(),
          quoteId: quote,
        };
      })
    );
    res.json(populatedFavorites);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};



// READ BY ID
export const getFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    const quote = await Quote.findById(favorite.quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    const populatedFavorite = {
      ...favorite.toObject(),
      quoteId: quote,
    };
    res.json(populatedFavorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};



// DELETE BY ID
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // Retrieve the quoteId associated with the favorite
    const quoteId = favorite.quoteId;

    // Remove the favorite from the favorites collection
    await favorite.remove();

    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};








