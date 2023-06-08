import Quote from '../models/quote-model.js'
import quoteCategories from '../data/categories.json' assert {type: "json"}


// CREATE
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


// READ
export const getAllQuotes = async (req, res) => {
    try {
      const quotes = await Quote.find()
      res.json(quotes)
    } 
    catch(error) {
        console.log(error)
    }
};

// READ BY ID
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

// READ BY CATEGORY
export const getQuoteByCategory = async (req, res) => {
  try {
    // const { category } = req.params;
    const quoteCategories = req.params;

    // Check if the requested category exists in the quoteCategories array
    if (!quoteCategories.includes(category)) {
      return res.status(404).json({ message: 'No quotes found for this category.' });
    }

    // Find quotes that match the requested category
    const quotes = await Quote.find({ category });

    res.status(200).json(quotes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  

// UPDATE
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

// DELETE
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
