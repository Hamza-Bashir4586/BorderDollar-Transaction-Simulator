# BorderDollar-Transaction-Simulator
The Border Dollar Transaction Simulator, Is a project I made when speaking with startup, BorderDollar simply as a test project to show them, it has no real aviliation with them, it is a project that aims to simulate cross border payments using Web3 technologies, Stable coin, and the Blockchain, to allow users to do transactions in a decentralized and accessible environment without having to worry about the volatility of normal crypto currencies

3 main goals of the Project

1: To allow users to make cross border transactions easily without worrying about their currency inflating or deflating in value while terms of the transactions were met, utilizing stable coin in order to minimize volatility, while creating a user friendly way to understand how much money is being sent over and by what means?

2: To allow users to view live currency rates and compare them in order to understand how market conditions are, as well as to see which currencies they should liquidate their assets in and send over 

3: To provide an accessible way to view reliable transaction history on the blockchain with timestamps that define the transactions by the second, while allowing me to gain experience and create a platform to test Web3 features 

-----------------------------------------------------------------------
The Transaction simulator allows admin users to create their own local network and make transactions through their users, assets are held in either $USDT (Tethercoin) which is a stablecoin that is pegged to the US Dollar, or the assets are held in $STB (A custom stablecoin made by me that is pegged to the average price between USD, EUR, and the CHF) 
---------------------------------------------------------------------

Technologies: 


I have built out the back end using Solidity, building 2 ERC-20 smart contracts (one for $STB and one for $UDST clone )

both with basic Mint, Burn, Transfer, and info Functions, 
the contracts are being hosted on a local ETH Blockchain Network (Ganache), with plans to host them on a non-local test network once fully built out

I have unit tests built in Node.JS testing all basic smart contract functions and event emitters. 

I am pulling real-time currency info using google finance and extracting the pricing elements, its high quality currency data that is updated every 3 Mins, and I'm able to pull it for free whenever I would like, this is tested in my test scripts



Outside of the Backend, I have fully designed my front end in Figma, and have Built out a prototype on how the app will function and look, 

I have a video explainer attached to this message as well as a link to the prototype for you to mess with it if you would like. 
—---------------------------------------------------------

Video Explainer: 

[border dollar project  1.mp4
](https://drive.google.com/file/d/1wWHpYu9fL-0jNZf74H3hsN2DcuAlYe8X/view?usp=sharing)

Figma Prototype Link: 

https://www.figma.com/proto/QPJhqMeUwiqhms1ELuaqHx/Border-Dollar-project-test-submission?page-id=0%3A1&node-id=92-105&node-type=CANVAS&viewport=404%2C407%2C0.09&t=9TQ2QwGEPsXFpR42-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=68%3A144

—---------------------------------------------------------

I have the truffle config files and the unit tests here, needs a running ganache cli interface in order for the contracts to funcction
