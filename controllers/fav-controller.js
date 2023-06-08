import Favorite from '../models/fav-model.js'
import Quote from '../models/quote-model.js'




export const createFavorite = async (req, res) => {
  try {
    const quoteId = req.body.quoteId;

    // Check if the Favorite already exists
    const existingFavorite = await Favorite.findOne({ quoteId: quoteId });
    if (existingFavorite) {
      return res.status(302).json({ message: "This quote already exists in Favorites." });
    }

    // Create a new Favorite document
    const favorite = new Favorite({ quoteId: quoteId });
    await favorite.save();

    res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
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
    console.log(req.params.id)
    // const favorite = await Favorite.findById(req.params.id);
    // if (!favorite) {
    //   return res.status(404).json({ message: 'Favorite not found' });
    // }
    const quote = await Favorite.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    console.log(quote._doc);

    const populatedFavorite = {
      ...quote._doc
    };
    res.json(populatedFavorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};



// DELETE BY ID
export const deleteFavoriteById = async (req, res) => {
  // try {
    Favorite.findByIdAndRemove(req.params.id)
  //   const id  = req.params.id;

  //   const favorite = await Favorite.findById(id);
  //   if (!favorite) {
  //     return res.status(404).json({ message: 'Favorite not found' });
  //   }

  //   // Retrieve the quoteId associated with the favorite
  //   const quoteId = favorite.quoteId;

  //   // Remove the favorite from the favorites collection
  //   await favorite.remove();

  //   res.status(200).json({ message: 'Favorite deleted successfully' });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ message: error.message });
  // }
};








