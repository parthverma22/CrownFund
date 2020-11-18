import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Form, Message, Icon } from 'semantic-ui-react';
import Campaign from '../../../Ethereum/campaign';
import web3 from '../../../Ethereum/web3';
import { Link, Router } from '../../../routes';


class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return {address};
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: ''})

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.ToAsk(description, web3.utils.toWei(value, 'ether'), recipient).send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <Segment inverted>
          <Menu inverted secondary style={{ marginTop: '10px'}}>
            <Link route="/">
              <a className="item">
                <h3>BlockFund</h3>
              </a>
            </Link>

            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Link route="/">
                <a className="item">
                  Campaigns
                </a>
              </Link>
              <Link route="/campaigns/new">
                <a className="item"><Icon name='plus square' size='large' /></a>
              </Link>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
          <Button animated style={{marginLeft: '20px'}}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
            </Button>
          </a>
        </Link>
        <Container>
          <h2>Create a Request</h2>
          <link rel='stylesheet' href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label><h4>Description</h4></label>
              <Input
                value={this.state.description}
                onChange={event => this.setState({ description: event.target.value})}
              />
            </Form.Field>

            <Form.Field>
              <label><h4>Value in Ether</h4></label>
              <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value})}
              />
            </Form.Field>

            <Form.Field>
              <label><h4>Recipient</h4></label>
              <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value})}
              />
            </Form.Field>

            <Message error header="Oops! Looks like something is broken!" content={this.state.errorMessage } />
            <Button primary loading ={this.state.loading}>Create!</Button>
          </Form>
        </Container>
        <Segment color='black' secondary style={{ marginTop: '200px',marginBottom: '0px',marginLeft: '0px'}}>
          <pre class="tab"><b>            Status     Privacy & terms     Contact us                                                                     </b>          <Icon name='twitter' size='big'/>  <Icon name='facebook' size='big'/>   <Icon name='youtube play' size='big'/>  <Icon name='linkedin square' size='big'/></pre>
        </Segment>
        <Segment textAlign='center' tertiary style={{ marginTop: '0px',}}>
          © Copyright 2020 BlockFund Technologies, Inc. All rights reserved. Various trademarks held by their respective owners.
        </Segment>
      </div>
    );
  }
}

export default RequestNew;
