import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
    }

    componentDidMount() {
        this.setState({ profile: this.props.profile });
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell><Label ribbon>{this.state.profile.username}</Label></Table.Cell>
                <Table.Cell><a target="_blank" href={this.state.profile.repourl}>{this.state.profile.repourl}</a></Table.Cell>
                <Table.Cell>{this.state.profile.reposize}</Table.Cell>
                <Table.Cell>{this.state.profile.created}</Table.Cell>
                <Table.Cell>{this.state.profile.updated}</Table.Cell>
            </Table.Row>
        )
    }
};

export default Repo;