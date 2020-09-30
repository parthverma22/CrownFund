pragma solidity ^ 0.4.17;

contract Campaigns {
    address[] public deployedCampaigns;

    function createCampaign(uint min) public {
        address newCampaign = new FundProgram(min, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getAllCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

 contract FundProgram {
     struct Ask {
         string explanation;
         uint amount;
         address receiver;
         bool done;
         uint NoOfYes;
         mapping(address => bool) saidYes;
     }

     address public owner;
     mapping(address => bool) public approvers;
     uint public minDonation;
     Ask[] public allAsks;
     uint NoOfApprovers;

     modifier ownerAccess() {
         require(msg.sender == owner);
         _;
     }

     function FundProgram(uint min, address creator) public  {
         owner = creator;
         minDonation = min;
     }

     function donate() public payable {
         require(msg.value > minDonation);
         approvers[msg.sender] = true;
         NoOfApprovers++;
     }

     function ToAsk(string explanation, uint amount, address receiver) public ownerAccess {
         Ask memory newAsk = Ask({
             explanation: explanation,
             amount: amount,
             receiver: receiver,
             done: false,
             NoOfYes: 0
         });
         allAsks.push(newAsk);
     }

     function  approveAsk(uint indx) public {
         Ask storage ask = allAsks[indx];

         require(approvers[msg.sender]);
         require(!ask.saidYes[msg.sender]);

         ask.saidYes[msg.sender] = true;
         ask.NoOfYes++;
     }

     function finalizeAsk(uint indx) public ownerAccess {
         Ask storage ask = allAsks[indx];

         require(ask.NoOfYes > (NoOfApprovers / 2));
         require(!ask.done);

         ask.receiver.transfer(ask.amount);
         ask.done = true;
     }
 }
