// import
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();
const port = 3002;

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


// _______________________________________________________  

// POST endpoint to create a new deposit
// Request body should contain the following parameters:
// - customerId: The unique ID of the customer
// - accountNumber: The customer's account number
// - recipientFullAddress: The full address of the recipient
// - recipientAddressCountry: The country of the recipient's address
app.post('/newDeposit', async (req, res) => {
    const { customerId, chain,fromAmount, fromCurrency, toCurrency, fiatAccountId, amount } = req.body;

    let method = '/v1/external/quotes';

    const signature1 = generateSignature('POST', method);
    console.log(signature1);
    const response1 = await axios.post(
        `${baseUrl}${method}`,
        {
            chain,
            
            fromCurrency,
            paymentMethodType : "SEPA",
            toCurrency,
            fromAmount,
            amount
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

    console.log('quoteId', response1.data.quoteId);

    const response2 = await axios.post(
        `${baseUrl}${method2}`,
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
                'api-key': apiKey, 
                'signature': signature2
            }
        }
    );

    return res.json({response: response2.data});


});
// returns [depositAddress]


// _______________________________________________________


// POST endpoint to create a KYC Metadata Request
// Request body should contain the following parameters:
// - firstName: The first name of the customer
// - lastName: The last name of the customer
// - nationality: The nationality of the customer
// - dateOfBirth: The date of birth of the customer
// - countryOfResidence: The country where the customer resides
// POST endpoint to create a KYC Metadata Request
app.post('/newKYCMetadata', async (req, res) => {
    const { customerId, firstName, lastName, nationality, dateOfBirth, countryOfResidence } = req.body;

    // Verify that required fields are present
    if (!customerId || !firstName || !lastName || !nationality || !dateOfBirth || !countryOfResidence) {
        return res.status(400).json({ error: 'Missing required KYC fields' });
    }

    let method = `/v1/external/customers/${customerId}/kyc`;

    console.log('method', method);

    try {
        const signature = generateSignature('POST', method);

        const response = await axios.post(
            `${baseUrl}${method}`,
            {
                kycSubmission: {
                    firstName,
                    lastName,
                    nationality,
                    dateOfBirth,
                    countryOfResidence
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

        if (response.status === 200) {
            // Successfully created KYC metadata
            res.json({ response: response.data });
        } else {
            // Handle non-200 responses
            res.status(response.status).json({ error: response.data });
        }
    } catch (error) {
        // Capture and log the error for debugging
        console.error('Error creating KYC Metadata:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal server error, please try again later.' });
    }
});

// returns [fiatAccountId,createdAt,bankName]

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});