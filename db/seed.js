// To grab data from API
// Import the necessary modules
// const fs = require('fs');
// const axios = require('axios');


// // Make a GET request to the specified URL
// axios.get('https://www.freetogame.com/api/games')
//   .then((response) => {
//         // Retrieve the data from the response
//     const games = response.data;


//         // Write the data to a file named 'games.json'
//     fs.writeFile('data/games.json', JSON.stringify(games, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing to file:', err);
//       } else {
//         console.log('Data imported successfully.');
//       }
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching data from API:', error);
//   });



// run node seed.js when seeding database
import db from './connection.js'
import Quote from '../models/quote-model.js'
// import Fav from '../models/fav-model.js'

import quotes from '../data/quotes.json' assert {type: "json"}

const seedData = async () => {
    db.dropDatabase()
    Quote.deleteMany({})
    await Quote.insertMany(quotes)
    db.close()
}

seedData()




