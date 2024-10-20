// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Aurum
 * @notice Travel anywhere in the world with crypto and only crypto!
 */
contract Aurum {

    // the address of the USDC address
    address private constant USDC_ADDRESS = 0x446E234151B1a78Bf03B058703022D3Dd9Dd710b;

    /** 
    * @notice The SelfKisser granting access to Chronicle oracles.
    * SelfKisser_1: 0xCce64A8127c051E784ba7D84af86B2e6F53d1a09
    */
    ISelfKisser public selfKisser = ISelfKisser(address(0xCce64A8127c051E784ba7D84af86B2e6F53d1a09));

    /**
    * @notice The Chronicle oracles to read from.
    */
    uint256 private constant NUM_PRICEFEED = 5;
    IChronicle public chronicle_USDC_USD = IChronicle(address(0x8b9dbE7098ED98C886a5B34Ca691141d033e8314));
    IChronicle public chronicle_ETH_USD = IChronicle(address(0x5D0474aF2da14B1748730931Af44d9b91473681b));
    IChronicle public chronicle_POL_USD = IChronicle(address(0xE87FAAC65b56fBbA50f5C69Cea4D1E7F5DD47301));
    IChronicle public chronicle_PEPE_USD = IChronicle(address(0xA230C7e2504d7417ac733b1Ac368A5D9b5Cdb066));
    IChronicle public chronicle_BTC_USD = IChronicle(address(0x75bE335415765aF13dFd8c823E213bdD55D29ceb));


    constructor() {
        // Note to add address(this) to chronicle oracle's whitelist.
        // This allows the contract to read from the chronicle oracle.
        selfKisser.selfKiss(address(chronicle_USDC_USD));
        selfKisser.selfKiss(address(chronicle_ETH_USD));
        selfKisser.selfKiss(address(chronicle_POL_USD));
        selfKisser.selfKiss(address(chronicle_PEPE_USD));
        selfKisser.selfKiss(address(chronicle_BTC_USD));
    }

    /** 
    * @notice Function to read the latest data from the Chronicle oracle.
    * @return val The current value returned by the oracle.
    * @return age The timestamp of the last update from the oracle.
    */
    function getFeeds() external view returns (uint256[NUM_PRICEFEED] memory val, uint256[NUM_PRICEFEED] memory age) {
        (uint256 val1, uint256 age1) = chronicle_USDC_USD.readWithAge();
        (uint256 val2, uint256 age2) = chronicle_ETH_USD.readWithAge();
        (uint256 val3, uint256 age3) = chronicle_POL_USD.readWithAge();
        (uint256 val4, uint256 age4) = chronicle_PEPE_USD.readWithAge();
        (uint256 val5, uint256 age5) = chronicle_BTC_USD.readWithAge();
        val = [val1, val2, val3, val4, val5];
        age = [age1, age2, age3, age4, age5];

    }

    // Function to pay a merchant with a specified ERC-20 token
    function payMerchant(
        address tokenAddress, // Address of the ERC-20 token contract
        address merchant,     // Merchant's address
        uint256 amount        // Amount of tokens to transfer
    ) external {
        // Get the ERC-20 token contract interface
        IERC20 token = IERC20(tokenAddress);

        // Transfer the specified amount from the sender to the merchant
        bool success = token.transferFrom(msg.sender, merchant, amount);
        
        // Ensure the transfer was successful
        require(success, "Token transfer failed");
    }


}

// Copied from [chronicle-std](https://github.com/chronicleprotocol/chronicle-std/blob/main/src/IChronicle.sol).
interface IChronicle {
    /** 
    * @notice Returns the oracle's current value.
    * @dev Reverts if no value set.
    * @return value The oracle's current value.
    */
    function read() external view returns (uint256 value);

    /** 
    * @notice Returns the oracle's current value and its age.
    * @dev Reverts if no value set.
    * @return value The oracle's current value using 18 decimals places.
    * @return age The value's age as a Unix Timestamp .
    * */
    function readWithAge() external view returns (uint256 value, uint256 age);
}

// Copied from [self-kisser](https://github.com/chronicleprotocol/self-kisser/blob/main/src/ISelfKisser.sol).
interface ISelfKisser {
    /// @notice Kisses caller on oracle `oracle`.
    function selfKiss(address oracle) external;
}