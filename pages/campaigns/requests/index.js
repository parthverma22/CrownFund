import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Form, Message, Table, Icon } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Campaign from '../../../Ethereum/campaign';
import RequestFormRow from '../../../components/RequestFormRow';



class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const NoOFrequest = await campaign.methods.getRequestCount().call();
    const NoOfApprovers = await campaign.methods.NoOfApprovers().call();

    const requests = await Promise.all(
      Array(parseInt(NoOFrequest)).fill().map((element, index) => {
        return campaign.methods.allAsks(index).call()
      })

    );

    console.log(requests);

    return { address, requests, NoOFrequest, NoOfApprovers };
  }

  RowRender() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestFormRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        NoOfApprovers={this.props.NoOfApprovers}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body} = Table;

    return (
      <div>
        <Segment inverted>
          <Menu inverted secondary style={{ marginTop: '10px'}}>
            <Link route="/">
              <a className="item">
                BlockFund
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

        <Container>

          <link rel='stylesheet' href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
          <h2>Requests</h2>
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a><Button primary floated='right' style={{marginBottom: 10}}>Add Request!</Button></a>
          </Link>
          <Table color='blue'>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>{this.RowRender()}</Body>
          </Table>
          <div><b>Found {this.props.NoOFrequest} requests ! </b></div>
        </Container>
        <Segment color='black' secondary style={{ marginTop: '260px',marginBottom: '0px',marginLeft: '0px'}}>
          <pre class="tab"><b>            Status     Privacy & terms     Contact us                                                                     </b>          <Icon name='twitter' size='big'/>  <Icon name='facebook' size='big'/>   <Icon name='youtube play' size='big'/>  <Icon name='linkedin square' size='big'/></pre>
        </Segment>
        <Segment textAlign='center' tertiary style={{ marginTop: '0px',}}>
                    © Copyright 2020 BlockFund Technologies, Inc. All rights reserved. Various trademarks held by their respective owners.
        </Segment>
      </div>
    );
  }
}


export default RequestIndex;
