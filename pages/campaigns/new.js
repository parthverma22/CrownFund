import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Form, Message, Icon } from 'semantic-ui-react';
import factory from '../../Ethereum/factory';
import web3 from '../../Ethereum/web3';
import { Link, Router } from '../../routes';

class CampaignNew extends Component{
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ loading: false});
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
          <link rel='stylesheet' href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>

          <Container>
            <h3>Create a Campaign</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                 label="WEI"
                 placeholder='Enter the minimum amount of wei to be contributed!'
                 labelPosition="right"
                 value={this.state.minimumContribution}
                 onChange={event => this.setState({ minimumContribution: event.target.value })}
                 />
              </Form.Field>

              <Message error header="Oops! Something went wrong..." content={this.state.errorMessage} />
              <Button loading={this.state.loading} primary>Create!</Button>
            </Form>
          </Container>
          <Segment color='black' secondary style={{ marginTop: '390px',marginBottom: '0px',marginLeft: '0px'}}>
            <pre class="tab"><b>            Status     Privacy & terms     Contact us                                                                     </b>          <Icon name='twitter' size='big'/>  <Icon name='facebook' size='big'/>   <Icon name='youtube play' size='big'/>  <Icon name='linkedin square' size='big'/></pre>
          </Segment>
          <Segment textAlign='center' tertiary style={{ marginTop: '0px',}}>
            © Copyright 2020 BlockFund Technologies, Inc. All rights reserved. Various trademarks held by their respective owners.
          </Segment>
        </div>
    );
  }
}
export default CampaignNew;
