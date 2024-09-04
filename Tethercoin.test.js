const Tethercoin = artifacts.require("Tethercoin");
const { assert } = require('chai');
const fetchExchangeRate = require('../fetchExchangeRate'); 




contract("Tethercoin", accounts => {
    let tethercoin;
    const [owner, user1, user2] = accounts;

    beforeEach(async () => {
        tethercoin = await Tethercoin.new(1000); // Initial supply of 1000
    });

    it("should mint new tokens", async () => {
        await tethercoin.mint(user1, 500, { from: owner });
        const balance = await tethercoin.balances(user1);
        const totalSupply = await tethercoin.totalSupply();
        assert.equal(balance.toString(), '500', "Minting failed");
        assert.equal(totalSupply.toString(), '1500', "Total supply after minting is incorrect");
    });

    it("should transfer tokens", async () => {
        await tethercoin.mint(user1, 500, { from: owner });
        await tethercoin.transfer(user2, 200, { from: user1 });
        const balanceUser2 = await tethercoin.balances(user2);
        const balanceUser1 = await tethercoin.balances(user1);
        assert.equal(balanceUser2.toString(), '200', "Transfer failed");
        assert.equal(balanceUser1.toString(), '300', "Transfer failed");
    });

    it("should burn tokens", async () => {
        await tethercoin.mint(user1, 500, { from: owner });
        await tethercoin.burn(200, { from: user1 });
        const balance = await tethercoin.balances(user1);
        const totalSupply = await tethercoin.totalSupply();
        assert.equal(balance.toString(), '300', "Burning failed");
        assert.equal(totalSupply.toString(), '1300', "Total supply after burning is incorrect");
    });


    it("Should tell me current Tether to USD exchange rate", async () => {
        const url = 'https://www.google.com/finance/quote/USDT-USD';
        const exchangeRate = await fetchExchangeRate(url);

        console.log(`Fetched Tether to USD exchange rate: ${exchangeRate}`);
        assert.isNotNull(exchangeRate, "Exchange rate should not be null");
    });



    it("should record a transaction when transferring tokens", async () => {
        await tethercoin.mint(user1, 500, { from: owner });
        const receipt = await tethercoin.transfer(user2, 100, { from: user1 });
        const event = receipt.logs[0].args;
        const tether_balance = await tethercoin.balances(user1);

        console.log(`Sender: ${event.sender}`);
        assert.equal(event.sender, user1, "Sender address is incorrect");
        assert.equal(event.receiver, user2, "Receiver address is incorrect");
        assert.equal(event.amount.toString(), '100', "Amount is incorrect");
        assert(event.timestamp > 0, "Timestamp is incorrect");
    });


    it("should return the transaction history", async () => {
        await tethercoin.mint(user1, 500, { from: owner });
        await tethercoin.transfer(user2, 100, { from: user1 });
        const history = await tethercoin.getTransactionHistory();
    
        assert.equal(history.length, 1, "Transaction history length is incorrect");
        assert.equal(history[0].sender, user1, "Sender address is incorrect");
        assert.equal(history[0].receiver, user2, "Receiver address is incorrect");
        assert.equal(history[0].amount.toString(), '100', "Amount is incorrect");
    });
    
});
