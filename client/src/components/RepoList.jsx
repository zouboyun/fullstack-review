import React from 'react';
import Repo from './Repo.jsx';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h4> Repo List Component </h4>
      There are {this.props.repos.length} repos.
      <div>
        <Repo profile={this.props.repos[0]} />
      </div>
    </div>
    )
  }
};

export default RepoList;