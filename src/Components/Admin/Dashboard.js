import React, { Component } from 'react';

import SideBar from '../Common/Sidebar'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Line as LineChart, Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'


import img_sites from '../asserts/img/build.png'
import img_pending from '../asserts/img/pending.png'
import img_delivery from '../asserts/img/delivery.png'
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
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row mx-1">
                            <div className="col-12 px-0">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    {this.setGreeting()}
                                </h5>
                            </div>

                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src="http://fashi.lucidex.tech/images/default/admin.Users.png" className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2">Users </h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 20).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src="http://fashi.lucidex.tech/images/default/admin.Managers.png" className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2">Suppliers </h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 10).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src={img_pending} className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2"> Pending Orders</h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 500).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src={img_delivery} className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2"> Completed Orders</h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 500).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src={img_sites} className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2"> Sites</h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 500).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                <div className={cardstyle}>
                                    <div className="pl-3 pr-0 my-auto">
                                        <img src="http://fashi.lucidex.tech/images/default/admin.Users.png" className="sidebar-image"></img>
                                    </div>
                                    <div className="my-auto">
                                        <h6 className="text-secondary bold-normal pr-2"> Sites</h6>
                                        <h3 className="text-dark bold-normal pr-2">{("0" + 500).slice(-2)}</h3>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 px-0" >
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2">
                                    <h6 className="text-muted bold-normal px-2 mb-0">
                                        2020
                            </h6>
                                    <h5 className="text-dark bold-normal px-2 pt-1 pb-3 ">
                                        All Orders

                            </h5>
                                    <LineChart data={{
                                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                        datasets: [
                                            {
                                                label: "Revenue",
                                                backgroundColor: 'rgba(26, 188, 156,0.5)',
                                                borderColor: 'rgba(39, 174, 96,0.4)',
                                                data: [28, 48, 40, 19, 86, 27, 90]
                                            }
                                        ]
                                    }}
                                        options={options2}
                                        width={12} height={3} />
                                </div>
                            </div>
                            <div className="col-6 px-0" >
                                <div className="campaign ct-charts px-3">
                                    <h6 className="mt-2 mb-3">Supplier Registration</h6>
                                    <Bar data={{
                                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                        datasets: [
                                            {
                                                label: "Users",
                                                backgroundColor: 'rgba(220, 231, 117,0.5)',
                                                borderColor: 'rgba(220, 231, 117,1.0)',
                                                borderWidth: 1,
                                                hoverBackgroundColor: 'rgba(220, 231, 117,0.4)',
                                                hoverBorderColor: 'rgba(220, 231, 117,1)',
                                                data: [65, 59, 80, 81, 56, 55, 40]
                                            }
                                        ]
                                    }}
                                        options={options1}
                                        width="600" height="220" />
                                </div>
                            </div>
                            <div className="col-6 px-0" >
                                <div className="campaign ct-charts px-3">
                                    <h6 className="mt-2 mb-3">Orders Status </h6>
                                    <Doughnut data={{
                                        labels: [
                                            'Red',
                                            'Green',
                                            'Yellow'
                                        ],
                                        datasets: [
                                            {
                                                label: "Users",
                                                backgroundColor: [
                                                    '#4FC3F7',
                                                    'rgba(161, 136, 127,1.0)',
                                                    'rgba(144, 164, 174,1.0)',
                                                    'rgba(121, 134, 203,1.0)',
                                                    'rgba(255, 138, 101,1.0)',
                                                ],
                                                hoverBackgroundColor: [
                                                    '#4FC3F7',
                                                    'rgba(161, 136, 127,1.0)',
                                                    'rgba(144, 164, 174,1.0)',
                                                    'rgba(121, 134, 203,1.0)',
                                                    'rgba(255, 138, 101,1.0)',
                                                ],
                                                data: [300, 50, 100]
                                            }
                                        ]
                                    }}
                                        width="600" height="220" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    getStyle = (item) => {
        return {
            backgroundColor: item.deleteRequest ? "#ffa1a150" : "#FFFFFF",
        };
    };
    setGreeting = () => {
        let h = new Date().getHours()
        if (h >= 5 && h <= 11) {
            return "Good Morning! "
        } else if (h >= 12 && h <= 17) {
            return "Good Afternoon! "
        } else if (h >= 18 && h <= 20) {
            return "Good Evening! "
        } else {
            return "Good Night! "
        }
    }
}
const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"
const options1 = {
    scaleShowGridLines: false,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 0,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}
const defaultcounts = [{ name: "Users", value: 0 },
{ name: "Managers", value: 0 },
{ name: "Products", value: 0 },
{ name: "Categories", value: 0 },
{ name: "Orders", value: 0 },
{ name: "Offers", value: 0 },]

const options2 = {
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }

}
const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(Dashboard));