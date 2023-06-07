// Note: Set up for favs
import { Router } from 'express'
import * as controllers from '../controllers/fav-controller.js'

const router = Router()


// GET all quotes
router.get('/quotes', controllers.getAllQuotes);

// GET routes
router.get('/quotes/:quoteId/favorites', controllers.getAllFavoritesForQuote);

// POST routes
router.post('/quotes/:quoteId/favorite', controllers.createFavorite);

// PUT routes
router.put('/favorite/:id', controllers.updateFavorite);

// DELETE routes
router.delete('/favorite/:id', controllers.deleteFavorite);

export default router
