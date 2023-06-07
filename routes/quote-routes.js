import { Router } from 'express'
import * as quoteController from '../controllers/quote-controller.js'

const router = Router()



// GET routes
router.get('/all', quoteController.getAllQuotes);

// GET ref as a key or a value
// router.get('/quotes/:id', quoteController.getQuoteByCategory);
router.get('/:id', quoteController.getQuoteById);
// // POST routes
router.post('/create', quoteController.createQuote);

// // PUT routes
router.put('/:id', quoteController.updateQuote);

// // DELETE routes
router.delete('/:id', quoteController.deleteQuote);

export default router

// fetch API here and return (to test)