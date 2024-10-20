// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

import "https://github.com/LayerZero-Labs/solidity-examples/blob/main/contracts/lzApp/NonblockingLzApp.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*
    LayerZero - Polygon zkEVM Cardona
      lzChainId: 40247 lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
      contract: 0x0433637c1D307A294D12B0D0BB4a5ED012b69482
    LayerZero - Arbitrum Sepolia
      lzChainId: 40231 lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
      contract: 0xCd126A91bD035c3B81d8349A0148b2cECAa230ff
*/

contract CrossChainToken is NonblockingLzApp, ERC20 {
    uint16 destChainId;
    
    constructor(address _lzEndpoint, uint16 _destChainId) NonblockingLzApp(_lzEndpoint) ERC20("Cross Chain Token", "CCT") Ownable(msg.sender) {
        destChainId = _destChainId;
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
       (address toAddress, uint amount) = abi.decode(_payload, (address,uint));
       _mint(toAddress, amount);
    }

    function bridge(uint _amount) public payable {
        _burn(msg.sender, _amount);
        bytes memory payload = abi.encode(msg.sender, _amount);
        _lzSend(destChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }

    function trustAddress(address _otherContract) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
    }
}