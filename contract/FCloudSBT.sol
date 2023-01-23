// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

struct Reporter {
    //Declaring different structure elements
    string name;
    string email;
}

contract FcloudSBT is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    mapping(address => Reporter) result;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("FCloud SBT", "FSBT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mintProfile(
        address _to,
        string memory _name,
        string memory _email
    ) public payable {
        safeMint(_to);
        Reporter memory reporter;
        reporter.name = _name;
        reporter.email = _email;
        result[_to] = reporter;
    }

    function getReporterInfo(address _from) public view returns (Reporter memory) {
        return result[_from];
    }

    function setReporterInfo(
        address _from,
        string memory _newName,
        string memory _newEmail
    ) public {
        Reporter memory reporter = result[_from];
        if (bytes(_newName).length != 0) {
            reporter.name = _newName;
        }
        if (bytes(_newEmail).length != 0) {
            reporter.email = _newEmail;
        }
        result[_from] = reporter;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
