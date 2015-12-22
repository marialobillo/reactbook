import React from 'react/addons';
import { ListGroup, ListGroupItem, 
         Grid, Row, Input, Well } from 'react-bootstrap';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchQuery: '' };
    this.changeSearchQuery = this.changeSearchQuery.bind(this);
    this.filteredChannels  = this.filteredChannels.bind(this);
  }

  changeSearchQuery(newSearchQuery) {
    this.setState({ searchQuery: newSearchQuery });
  }

  filteredChannels() {
    let { channels }    = this.props,
        { searchQuery } = this.state;

    return channels.filter(channel => {
      return channel.indexOf(searchQuery) === 0;
    });
  }

  render() {  
    let { searchQuery } = this.state,
        channels = this.filteredChannels();

    return (
      <Grid fluid={true}>
        <Row>
          <ChannelSearchInput searchQuery={searchQuery} 
                              onSearchQueryChanged={this.changeSearchQuery} />
          {channels.length === 0 ? 
            <NoValidChannels searchQuery={searchQuery} /> :
            <Channels channels={channels} />
          }
        </Row>
      </Grid>
    );
  }  
}

class ChannelSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
  } 

  handleSearchQueryChange(ev) {
    let { onSearchQueryChanged } = this.props;
    onSearchQueryChanged(ev.target.value)
  }

  render() {    
    let { searchQuery } = this.props;

    return (
      <Input type="text" 
         placeholder="Search channels…" 
         bsSize="large"
         value={searchQuery}
         onChange={this.handleSearchQueryChange} />
    );
  }
}

class Channels extends React.Component {
  render() {
    let { channels } = this.props;

    return (
      <ListGroup>
        {channels.map(channel =>
          <ListGroupItem key={channel} href={`#${channel}`}>
            #{channel}
          </ListGroupItem>
        )}
      </ListGroup>
    );    
  }
}

class NoValidChannels extends React.Component {
  render() {
    let { searchQuery } = this.props;

    return (<Well>There are no channels matching 
                  your query <strong>"{searchQuery}"</strong>.
            </Well>);
  }
}

ChannelSearch.defaultProps = {
  channels: [
    "reactjs",
    "general",
    "random",
    "flux",
    "relay",
    "immutablejs",
    "flow",
    "webpack",
    "babel"
  ]
};

export default ChannelSearch;
