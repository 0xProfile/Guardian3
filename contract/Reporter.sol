// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct Reporter {
    //Declaring different structure elements
    string name;
    string email;
    string org;
}

contract ReporterOperator {
    mapping(address => Reporter) reporterAccounts;
    Reporter[] public reporterAccountList;

    function add(
        address _address,
        string memory _name,
        string memory _email,
        string memory _org
    ) public {
        Reporter memory curr = Reporter(_name, _email, _org);
        reporterAccounts[_address] = curr;
        reporterAccountList.push(curr);
    }

    function getReporterInfoWithAddress(address _address) public view returns (Reporter memory) {
        return reporterAccounts[_address];
    }

    function getReporterAccounts() public view returns (Reporter[] memory) {
        return reporterAccountList;
    }
}
