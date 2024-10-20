export const AurumAbi = 
    [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "merchant",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "payMerchant",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "chronicle_BTC_USD",
            "outputs": [
                {
                    "internalType": "contract IChronicle",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "chronicle_ETH_USD",
            "outputs": [
                {
                    "internalType": "contract IChronicle",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "chronicle_PEPE_USD",
            "outputs": [
                {
                    "internalType": "contract IChronicle",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "chronicle_POL_USD",
            "outputs": [
                {
                    "internalType": "contract IChronicle",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "chronicle_USDC_USD",
            "outputs": [
                {
                    "internalType": "contract IChronicle",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getFeeds",
            "outputs": [
                {
                    "internalType": "uint256[5]",
                    "name": "val",
                    "type": "uint256[5]"
                },
                {
                    "internalType": "uint256[5]",
                    "name": "age",
                    "type": "uint256[5]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "selfKisser",
            "outputs": [
                {
                    "internalType": "contract ISelfKisser",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ] as const;
