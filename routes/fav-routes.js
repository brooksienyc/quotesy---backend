// Note: Set up for favs
import { Router } from 'express'
import * as controllers from '../controllers/fav-controller.js'

const router = Router()

// CREATE routes
router.post('/create', controllers.createFavorite);

// READ routes
router.get('/all', controllers.getAllFavorites);
router.get('/:id', controllers.getFavoriteById);

// DELETE route
router.delete('/delete/:id', controllers.deleteFavoriteById);




export default router
