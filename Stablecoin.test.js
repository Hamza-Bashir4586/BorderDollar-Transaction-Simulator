const Stablecoin = artifacts.require("Stablecoin");
const { assert } = require('chai');
const fetchExchangeRate = require('../fetchExchangeRate'); 

contract("Stablecoin", accounts => {
    let stablecoin;
    const [owner, user1, user2] = accounts;

    beforeEach(async () => {
        stablecoin = await Stablecoin.new(1000); // Initial supply of 1000
    });

    it("should mint new tokens", async () => {
        await stablecoin.mint(user1, 500, { from: owner });
        const balance = await stablecoin.balances(user1);
        const totalSupply = await stablecoin.totalSupply();
        assert.equal(balance.toString(), '500', "Minting failed");
        assert.equal(totalSupply.toString(), '1500', "Total supply after minting is incorrect");
    });

    it("should transfer tokens", async () => {
        await stablecoin.mint(user1, 500, { from: owner });
        await stablecoin.transfer(user2, 200, { from: user1 });
        const balanceUser2 = await stablecoin.balances(user2);
        const balanceUser1 = await stablecoin.balances(user1);
        assert.equal(balanceUser2.toString(), '200', "Transfer failed");
        assert.equal(balanceUser1.toString(), '300', "Transfer failed");
    });

    it("should burn tokens", async () => {
        await stablecoin.mint(user1, 500, { from: owner });
        await stablecoin.burn(200, { from: user1 });
        const balance = await stablecoin.balances(user1);
        const totalSupply = await stablecoin.totalSupply();
        assert.equal(balance.toString(), '300', "Burning failed");
        assert.equal(totalSupply.toString(), '1300', "Total supply after burning is incorrect");
    });

    it("Should tell me current STB to USD exchange rate", async () => {
        const url_1 = 'https://www.google.com/finance/quote/USD-CHF';
        const url_2 = 'https://www.google.com/finance/quote/USD-EUR';

        let exchangeRate_1 = await fetchExchangeRate(url_1);
        let exchangeRate_2 = await fetchExchangeRate(url_2);

        let exchangeRate = (exchangeRate_1 + exchangeRate_2 + 1) /3;


        console.log(`Fetched STB to USD exchange rate: ${exchangeRate}`);
        assert.isNotNull(exchangeRate, "Exchange rate should not be null");
    });


    
    it("should record a transaction when transferring tokens", async () => {
        await stablecoin.mint(user1, 500, { from: owner });
        const receipt = await stablecoin.transfer(user2, 100, { from: user1 });
        const event = receipt.logs[0].args;
        console.log(`Sender: ${event.sender}`);
        assert.equal(event.sender, user1, "Sender address is incorrect");
        assert.equal(event.receiver, user2, "Receiver address is incorrect");
        assert.equal(event.amount.toString(), '100', "Amount is incorrect");
        assert(event.timestamp > 0, "Timestamp is incorrect");
    });


    it("should return the transaction history", async () => {
        await stablecoin.mint(user1, 500, { from: owner });
        await stablecoin.transfer(user2, 100, { from: user1 });
        const history = await stablecoin.getTransactionHistory();
    
        assert.equal(history.length, 1, "Transaction history length is incorrect");
        assert.equal(history[0].sender, user1, "Sender address is incorrect");
        assert.equal(history[0].receiver, user2, "Receiver address is incorrect");
        assert.equal(history[0].amount.toString(), '100', "Amount is incorrect");
    });
    

});
