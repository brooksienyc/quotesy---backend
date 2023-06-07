
import Favorite from '../models/fav-model'
import Quote from '../models/quote-model'

import favoriteRaw from '../data/quotes.json'
import quoteRaw from '../data/categories.json'

Favorite.find({})
    .then(favorites => {
        console.log(favorites)
        favorites.forEach(favorite => {
            let favoriteJSON = favoriteRaw.find(favoriteJSON => favoriteJSON.name === favorite.name)
            Quote.findOne({ title: favoriteJSON.quote })
                .then(quote => {
                    favorite.quote = quote._id
                    favorite.save()
                })
        })
    })