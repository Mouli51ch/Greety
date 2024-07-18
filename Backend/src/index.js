require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');

constrequire('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Infura provider
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

// Wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABI
const abi = [
    "function greet() public view returns (string memory)",
    "function setGreet(string memory newGreet) public",
    "function getGreetingHistory() public view returns (string[] memory)"
];

// Contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to get the greeting
app.get('/greet', async (req, res) => {
    try {
        const greet = await contract.greet();
        res.json({ greet });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to set a new greeting
app.post('/greet', async (req, res) => {
    const { newGreet } = req.body;
    if (!newGreet) {
        return res.status(400).send('newGreet is required');
    }
    try {
        const tx = await contract.setGreet(newGreet);
        await tx.wait();
        res.json({ message: 'Greeting updated successfully', txHash: tx.hash });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to get the greeting history
app.get('/history', async (req, res) => {
    try {
        const history = await contract.getGreetingHistory();
        res.json({ history });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
 app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Infura provider
const provider = new ethers.providers.InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID);

// Wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABI
const abi = [
    "function greet() public view returns (string memory)",
    "function setGreet(string memory newGreet) public",
    "function getGreetingHistory() public view returns (string[] memory)"
];

// Contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to get the greeting
app.get('/greet', async (req, res) => {
    try {
        const greet = await contract.greet();
        res.json({ greet });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to set a new greeting
app.post('/greet', async (req, res) => {
    const { newGreet } = req.body;
    if (!newGreet) {
        return res.status(400).send('newGreet is required');
    }
    try {
        const tx = await contract.setGreet(newGreet);
        await tx.wait();
        res.json({ message: 'Greeting updated successfully', txHash: tx.hash });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to get the greeting history
app.get('/history', async (req, res) => {
    try {
        const history = await contract.getGreetingHistory();
        res.json({ history });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
