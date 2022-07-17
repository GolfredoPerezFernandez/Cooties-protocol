// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./royalties/contracts/impl/RoyaltiesV2Impl.sol";

import "./lib-part/contracts/LibPart.sol";
import "./royalties/contracts/LibRoyaltiesV2.sol";

contract Mint is ERC721 ,
    Ownable, RoyaltiesV2Impl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
  address public artist;


    constructor(string memory name,string memory symbol) ERC721(name, symbol) {
        
    artist = msg.sender;
    }


    struct Item {
        uint256 id;
        address creator;
        string uri;
        uint96 royalty;
    }

    mapping(uint256 => Item) public Items;

    function createItem(string memory uri,address payable _royaltiesRecipientAddress,uint96 _percentageBasisPoints)  public returns (uint256) {
      
        uint256 newItemId = _tokenIds.current();
        super._mint(_royaltiesRecipientAddress, newItemId);
        setRoyalties(newItemId,_royaltiesRecipientAddress, _percentageBasisPoints);
        Items[newItemId] = Item(newItemId, _royaltiesRecipientAddress, uri, _percentageBasisPoints);
          _tokenIds.increment();
        return newItemId;
    }
 function setRoyalties(uint _tokenId,address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
       LibPart.Part[] memory _royalties= new LibPart.Part[](1);
       _royalties[_tokenId].value=_percentageBasisPoints;
       _royalties[_tokenId].account=_royaltiesRecipientAddress;
       _saveRoyalties(_tokenId,_royalties);

    }

 function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
      
if(interfaceId==LibRoyaltiesV2._INTERFACE_ID_ROYALTIES){
    return true;
}
if(interfaceId==_INTERFACE_ID_ERC2981){
    return true;
}
return super.supportsInterface(interfaceId);
    }
    function getArtist()
        public
        view
        returns (address){
        return artist;
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return Items[tokenId].uri;
    }
}
