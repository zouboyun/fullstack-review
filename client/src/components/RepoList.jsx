import React from 'react';
import Repo from './Repo.jsx';
import { Table } from 'semantic-ui-react';
import { runInThisContext } from 'vm';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRepos() {
    return (this.props.repos.map((profile, index) => {
      return <Repo profile={profile} key={index.toString()}/>
    }))
  }

  render() {
      return (
        <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>Top 25 Git Repositories Based on Size</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Username</Table.Cell>
              <Table.Cell>Repo URL</Table.Cell> 
              <Table.Cell>Repo Size</Table.Cell>
              <Table.Cell>Repo Created At</Table.Cell>
              <Table.Cell>Repo Updated At</Table.Cell>
            </Table.Row>
            {this.renderRepos()}
          </Table.Body>
        </Table>
      </div>
      )
    }
};

export default RepoList;