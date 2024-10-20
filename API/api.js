// import
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// POST endpoint to create a new fiat account
// Request body should contain the following parameters:
// - customerId: The unique ID of the customer
// - accountNumber: The customer's account number
// - recipientFullAddress: The full address of the recipient
// - recipientAddressCountry: The country of the recipient's address
app.post('/newFiatAccount', (req, res) => {
    const { customerId, accountNumber, recipientFullAddress, recipientAddressCountry } = req.body;

    const response = axios.post('https://actions-registry.dialectapi.to/all', 
        {
            customerId,
            type : "SEPA",
            fiatAccountFields : {
                accountNumber,
                recipientFullAddress,
                recipientAddressCountry
            }
        }
    )

    if (response.status !== 200) {
        res.status(400).send('Error creating new fiat account');
    }
    
    res.send(response.data);
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});