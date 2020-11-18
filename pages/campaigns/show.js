import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Form, Message, Grid, Icon } from 'semantic-ui-react';
import { Link, Router } from '../../routes';
import Campaign from '../../Ethereum/campaign';
import web3 from '../../Ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minDonation: summary[0],
      balance: summary[1],
      allAsks: summary[2],
      NoOfApprovers: summary[3],
      owner: summary[4]
    };
  }

  renderInformation() {
    const {
      minDonation,
      balance,
      allAsks,
      NoOfApprovers,
      owner
    } = this.props;

    const items = [
      {
        header: owner,
        meta: 'Address Of Creator',
        description: 'This is the address of the person who created this Campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minDonation,
        meta: 'Minimum Contribution (WEI)',
        description:
          'The minimum amount of WEI to be contributed in order to become an approver'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      },
      {
        header: NoOfApprovers,
        meta: 'Number of Approvers',
        description:
          'Number of people who have donated to this campaign'
      },
      {
        header: allAsks,
        meta: 'Number of Requests',
        description:
          'A request to spend some part of the funded amount for a specific use. Requests must be approved by approvers'
      },
    ];

    return <Card.Group items={items} />;
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
          <h3>Campaign Details</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderInformation()}
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Requests</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Segment color='black' secondary style={{ marginTop: '22px',marginBottom: '0px',marginLeft: '0px'}}>
          <pre class="tab"><b>            Status     Privacy & terms     Contact us                                                                     </b>          <Icon name='twitter' size='big'/>  <Icon name='facebook' size='big'/>   <Icon name='youtube play' size='big'/>  <Icon name='linkedin square' size='big'/></pre>
        </Segment>
        <Segment textAlign='center' tertiary style={{ marginTop: '0px',}}>
          © Copyright 2020 BlockFund Technologies, Inc. All rights reserved. Various trademarks held by their respective owners.
        </Segment>
      </div>

    );
  }
}

export default CampaignShow;
