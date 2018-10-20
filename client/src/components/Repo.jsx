import React from 'react';

class Repo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <div>{JSON.stringify(this.props.profile)}</div>
        </div>
        )
    }
};

export default Repo;