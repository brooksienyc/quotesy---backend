import Quote from '../models/quote-model.js'

// Get
export const getAllQuotes = async (req, res) => {
    try {
      const quotes = await Quote.find()
      res.json(quotes)
    } 
    catch(error) {
        console.log(error)
    }
};

// Get
export const getQuoteById = async (req, res) => {
  try {
    const quotesId = await Quote.find({ _id: req.params.id });
    console.log(quotesId)
    if (quotesId.length === 0) {
        return res.status(404).json({ message: 'No quote found by Id' });
    }
    res.status(200).json(quotesId);
} catch (err) {
    return res.status(500).json({ message: err.message });
}
};

// Create
export const createQuote = async (req, res) => {
  try {
    const quoteCreate = await Quote(req.body);
    console.log(quoteCreate)
    await quoteCreate.save()
    res.status(200).json(quoteCreate);
} catch (err) {
    return res.status(500).json({ message: err.message });
}
};

// Update 
export const updateQuote = async (req, res) => {
    const quoteUpdate = req.body
    const quotesId = req.params.id
    Quote.findByIdAndUpdate(quotesId, quoteUpdate, {new: true}) 
    .then(quote => {
        if(!quote) {
          return res.status(404).json({error:"Quote is not found"})
        } 
        res.json(quote)
    }) .catch(error =>  {
      res.status(500).json({error: error.message})

    })
}

// Delete
export const deleteQuote = async (req, res) => {
  const quotesId = req.params.id
  Quote.findByIdAndRemove(quotesId) 
  .then(quote => {
      if(!quote) {
        return res.status(404).json({error:"Quote is not found"})
      } 
      res.json({message:"Quote has been removed."})
  }) .catch(error =>  {
    res.status(500).json({error: error.message})

  })
}

