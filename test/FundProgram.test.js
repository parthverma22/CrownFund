const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaigns = require('../Ethereum/build/Campaigns.json');
const compiledFundProgram = require('../Ethereum/build/FundProgram.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledCampaigns.interface))
    .deploy({ data: compiledCampaigns.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getAllCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledFundProgram.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a campaign and a FundProgram', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks person as the campaign owner', async () => {
    const owner = await campaign.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it('allows people to donate money and marks them as approver', async () => {
    await campaign.methods.donate().send({
      value: '200',
      from: accounts[1]
    });
    const isDonator = await campaign.methods.approvers(accounts[1]).call();
    assert(isDonator);
  });
  it('requires a minimum donation', async () => {
    try {
      await campaign.methods.donate().send({
        value: '5',
        from: accounts[1]
      });
      assert(false);
    } catch (err){
      assert(err);
    }
  });

  it('allows a owner to ask for money', async () => {
    await campaign.methods
    .ToAsk("Buy", '100', accounts[1])
    .send({
      from: accounts[0],
      gas: '1000000'
    });
    const chalja = await campaign.methods.allAsks(0).call();
    //assert.equal("Buy", chalja.description);
  });
});
