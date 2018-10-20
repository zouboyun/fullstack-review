import React from 'react';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
    <div>
      <h4>Add more repos!</h4>
      <Input fluid action={{ icon: "search", onClick: this.search.bind(this)}} value={this.state.term} onChange={this.onChange.bind(this)} placeholder='Search github handler...' />
    </div>) 
  }
}

export default Search;