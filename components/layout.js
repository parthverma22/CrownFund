import React from 'react';
import header from './header';

export default props => {
  return (
    <div>
      <header />
      { this.props.children }
    </div>
  );
};






state = {
  value: ''
};
onSubmit = async event => {
  event.preventDefault();

  const campaign = Campaign(this.props.address);

  try{
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.donate().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  } catch (err) {

  }




  <Grid>
    <Grid.Column width={10}>{this.renderInformation()}</Grid.Column>
    <Grid.Column width={6}>
      <Form onSubmit={this.onSubmit} address={this.props.address}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value})}
            label="ETHER"
            labelPosition="right"/>
        </Form.Field>
        <Button primary>
          Contribute!
        </Button>
      </Form>
    </Grid.Column>
  </Grid>
