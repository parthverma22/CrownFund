import React , { Component } from 'react';
import { Card, Button, Input, Menu, Container, Segment, Icon} from 'semantic-ui-react';
import factory from '../Ethereum/factory';
import { Link } from '../routes';


class CampaignIndex extends Component {
  static async getInitialProps(){
    const campaigns = await factory.methods.getAllCampaigns().call();

    return { campaigns };

  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items = {items} />;
  }

  render() {
    return (



        <div>


            <Segment inverted>
              <Menu inverted secondary style={{ marginTop: '10px'}}>
                <Link route="/">
                  <a className="item" >
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

            <Container>
              <link rel='stylesheet' href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
              <h2>Open Campaigns</h2>


              <Link route="/campaigns/new">
                <a>
                  <Button floated="right" content="Create Campaign" icon="add circle" primary/>
                </a>
              </Link>
              {this.renderCampaigns()}
            </Container>
            <Segment color='black' secondary style={{ marginTop: '330px',marginBottom: '0px',marginLeft: '0px'}}>
              <pre class="tab"><b>            Status     Privacy & terms     Contact us                                                                     </b>          <Icon name='twitter' size='big'/>  <Icon name='facebook' size='big'/>   <Icon name='youtube play' size='big'/>  <Icon name='linkedin square' size='big'/></pre>
            </Segment>
            <Segment textAlign='center' tertiary style={{ marginTop: '0px',}}>
                        © Copyright 2020 BlockFund Technologies, Inc. All rights reserved. Various trademarks held by their respective owners.
            </Segment>

        </div>


    );
  }
}


export default CampaignIndex;
