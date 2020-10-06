import React, { Component } from 'react';

import SideBar from '../Common/Sidebar'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {

        };

    }
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"dashboard"} />
            </div>
        );
    }
}


export default Dashboard;