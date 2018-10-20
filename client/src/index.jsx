import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { Container, Dimmer, Loader, Segment, Menu } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    let self = this;
    // jquery ajax request to the server
    $.ajax({
      type: "POST",
      url: '/repos',
      data: { term },
    }).then(data => {
      self.get();
    });
  }
  componentDidMount() {
    this.get();
  }

  get() {
    let self = this;
    $.ajax({
      type: "GET",
      url: '/repos',
      'Content-Type': "application/json"
    }).then(data => {
      self.setState({ repos: data });
    }).catch(error => {
      console.log('GET ERROR FROM DB>>>>>>>>>>', error);
    });
  }

  render () {
    if (this.state.repos.length === 0) {
      return (
        <div>
          <Menu fixed='top' inverted>
            <Menu.Item as='h1' header>
              Github Fetcher
            </Menu.Item>
          </Menu>
          <Container style={{ marginTop: '7em' }}>
            <Search onSearch={this.search.bind(this)} />
            <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
          </Container>
        </div>
      )
    } else {
      return (
        <div>
          <Menu fixed='top' inverted>
            <Menu.Item as='h1' header>
              Github Fetcher
            </Menu.Item>
          </Menu>
          <Container style={{ marginTop: '7em' }}>
            <Search onSearch={this.search.bind(this)} />
            <RepoList repos={this.state.repos}/>
          </Container>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));