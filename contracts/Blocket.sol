// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Blocket is ERC721, Ownable, Pausable {
    uint256 public nextTokenId;
    string private _baseTokenURI;

    event Minted(address indexed to, uint256 indexed tokenId);

    constructor() ERC721("Blocket", "BKT") {
        _baseTokenURI = "https://yourdomain.com/metadata/";
    }

    function mint(address to) external onlyOwner whenNotPaused {
        _safeMint(to, nextTokenId);
        emit Minted(to, nextTokenId);
        nextTokenId++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
