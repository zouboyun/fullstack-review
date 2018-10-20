import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

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
      console.log('GET DATA FROM DB>>>>>>>>>>', data);
      // set state
      self.setState({ repos: data });
    }).catch(error => {
      console.log('GET ERROR FROM DB>>>>>>>>>>', error);
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));