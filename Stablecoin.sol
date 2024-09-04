// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Defining State variable for contracts
contract Stablecoin{


    struct Transaction {
    address sender;
    address receiver;
    uint256 amount;
    uint256 timestamp;
}

Transaction[] public transactions;




    //Mapping to store balances of each address
    mapping(address => uint256) public balances;

    // Variable to store the total supply of the stablecoin
    uint256 public totalSupply;

    // Address of the contract owner
    address public owner;

    // Constructer to set the inital supply and owner 
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply;
        balances[owner] = _initialSupply;
    }

//-----------------------------------------------------------------

// MINTING Function

    // Event to be emitted on minting
    event Mint(address indexed to, uint256 amount);

    //Function to mint new stablecoins
    function mint(address _to, uint256 _amount) external{
        require(msg.sender == owner, "Only the owner can mint tokens");
        totalSupply += _amount;
        balances[_to] += _amount;
        emit Mint(_to, _amount);
    }

//-----------------------------------------------------------------

// TRANSFER Function

event TransactionRecorded(
    address indexed sender,
    address indexed receiver,
    uint256 amount,
    uint256 timestamp
);


event Transfer(address indexed from, address indexed to, uint256 amount);

// Function to transfer stablecoins
function transfer(address _to, uint256 _amount) external{
    require(balances[msg.sender] >= _amount, "Insufficient balance");
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;

    //record the transaction
    transactions.push(Transaction(msg.sender, _to, _amount, block.timestamp));


    // Emit the transaction event
    emit TransactionRecorded(msg.sender, _to, _amount, block.timestamp);
}

//------------------------------------------------------------------

// BURN Function 
event Burn(address indexed from, uint256 amount);

//Function to burn stablecoins
function burn(uint256 _amount) external{
    require(balances[msg.sender] >= _amount, "Insufficient balance");
    totalSupply -= _amount;
    balances[msg.sender] -= _amount;
    emit Burn(msg.sender, _amount);
}

//------------------------------------------------------------------


//transaciton retrieval function

function getTransactionHistory() public view returns (Transaction[] memory) {
    return transactions;
}


}


