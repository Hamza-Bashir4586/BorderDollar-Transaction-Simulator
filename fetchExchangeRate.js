const axios = require('axios');
const cheerio = require('cheerio');

async function fetchExchangeRate(url) {
    try {
        // Fetch the HTML content of the Google Finance page
        const { data } = await axios.get(url);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Use the correct selector to find the price element
        const priceElement = $('div.YMlKec.fxKbKc');

        // Extract the price text
        const priceTEXT = priceElement.first().text();

        const price = parseFloat(priceTEXT);

        console.log(`Fetched price from ${url}: ${price}`);
        return price;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        throw error;
    }
}

// Export the function
module.exports = fetchExchangeRate;
