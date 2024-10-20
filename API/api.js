// import
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();
const port = 3001;

const baseUrl = 'https://api-sandbox.gatefi.com'

let secretKey = process.env.SECRET_KEY; // secret key, used for generating signature
let apiKey = process.env.API_KEY // api key, used for authentication

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(express.json());

// Method To Generate Signature 
function generateSignature(method, path) {
    const data = method.toUpperCase() + path;
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(data);
    return hmac.digest('hex');
}


// POST endpoint to create a new customer
// Request body should contain the following parameters:
// - email: The email address of the customer
// - phoneNumber: The phone number of the customer
app.post('/newCustomer', async (req, res) => {
    console.log(req.body);
    const { email, phoneNumber } = req.body;

    let method = '/v1/external/customers';

    const signature = generateSignature('POST', method);

    const response = await axios.post(
        `${baseUrl}${method}`,
        {
           email,
           phoneNumber,
           type : "INDIVIDUAL"
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey, 
                'signature': signature
            }
        }
    );

    res.json({response: response.data});
});
// returns [customerId,createdAt]

// _______________________________________________________

// POST endpoint to create a new fiat account
// Request body should contain the following parameters:
// - customerId: The unique ID of the customer
// - accountNumber: The customer's account number
// - recipientFullAddress: The full address of the recipient
// - recipientAddressCountry: The country of the recipient's address
app.post('/newFiatAccount', async (req, res) => {
    const { customerId, accountNumber, recipientFullAddress, recipientAddressCountry } = req.body;

    let method = '/v1/external/fiatAccounts';

    const signature = generateSignature('POST', method);

    const response = await axios.post(
        `${baseUrl}${method}`,
        {
            customerId,
            type : "SEPA",
            fiatAccountFields : {
                accountNumber,
                recipientFullAddress,
                recipientAddressCountry
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey, 
                'signature': signature
            }
        }
    );

    if (response.status !== 200) {
        res.status(400).send('Error creating new fiat account');
    }

    res.json({response: response.data});
});
// returns [fiatAccountId,createdAt,bankName]



// POST endpoint to create a new deposit
// Request body should contain the following parameters:
// - customerId: The unique ID of the customer
// - accountNumber: The customer's account number
// - recipientFullAddress: The full address of the recipient
// - recipientAddressCountry: The country of the recipient's address
app.post('/newDeposit', async (req, res) => {
    const { customerId, chain, fromAmount, fromCurrency, toCurrency, fiatAccountId, amount } = req.body;

    let method = '/v1/external/quotes';

    const signature1 = generateSignature('POST', method);

    const response1 = await axios.post(
        `${baseUrl}${method}`,
        {
            chain,
            fromAmount,
            fromCurrency,
            paymentMethodType : "PIX",
            toCurrency
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey, 
                'signature': signature1
            }
        }
    );

    let method2 = '/v1/external/offramp';

    const signature2 = generateSignature('POST', method2);

    const response2 = await axios.post(
        `${baseUrl}${method}`,
        {
            customerId,
            quoteId : response1.data.quoteId,
            fromCurrency,
            toCurrency,
            amount,
            toCurrency,
            fiatAccountId,
            chain
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'api-key': signature2, 
                'signature': signature1
            }
        }
    );

    return response2.data;

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});