import Favorite from '../models/fav-model.js'

export const getFavorites = {
  index: (req, res) => {
    Favorite.find({}).then(favorites => {
      res.json(favorites);
    });
  }
};

