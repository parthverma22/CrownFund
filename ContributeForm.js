import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Form, Message, Icon, Label } from 'semantic-ui-react';
import Campaign from '../Ethereum/campaign';
import web3 from '../Ethereum/web3';
import { Router } from '../routes';




class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.donate().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }

    this.setState({ loading: false, value: ''});
  };


  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value})}
            label="ETHER"
            labelPosition="right"/>
        </Form.Field>

        <Message error header="Oops! Looks like something is not right!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
