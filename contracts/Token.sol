pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/payment/PullPayment.sol";
import '@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol';

contract MyToken is Initializable, GSNRecipient, ERC20, ERC20Mintable, Ownable, ERC20Detailed {

  // accept all requests
  function acceptRelayedCall(
    address,
    address,
    bytes calldata,
    uint256,
    uint256,
    uint256,
    uint256,
    bytes calldata,
    uint256
    ) external view returns (uint256, bytes memory) {
    return _approveRelayedCall();
  }

  function setRelayHubAddress() public {
    if(getHubAddr() == address(0)) {
      _upgradeRelayHub(0xD216153c06E857cD7f72665E0aF1d7D82172F494);
    }
  }

  function getRecipientBalance() public view returns (uint) {
    return IRelayHub(getHubAddr()).balanceOf(address(this));
  }

    constructor(uint256 _initialAmount) public {
        ERC20Detailed.initialize("FEG", "FEG", 0);
        _mint(msg.sender, 1);
    }

    function mint(uint256 value) public {
        _mint(msg.sender, value);
    }
        
    function mintTo(address to, uint256 value) public {
        _mint(to, value);
    }

    function transfer(address to, uint256 value) public returns(bool) {
        return super.transfer(to, value);
    }

    function transferFrom(address from, address to, uint256 value) public returns(bool) {
        return super.transferFrom(from, to, value);
    }

}


