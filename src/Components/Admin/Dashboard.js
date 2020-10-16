      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../Common/Sidebar'
import { Line as LineChart, Bar, Doughnut } from 'react-chartjs-2';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import img_sites from '../asserts/img/build.png'
import img_pending from '../asserts/img/pen.png'
import img_delivery from '../asserts/img/delivery.png'
import img_construction from '../asserts/img/construction.png'
import Config from '../Controller/Config.controller'
import AdminController from '../Controller/Admin.controller'
import { gettotal, render_state, current_state, state_color } from '../Controller/Util.controller'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            counts: null,
            loading: true,
            monthwise: null,
            orders: [],
        };


    }


    componentDidMount = async () => {

        await AdminController.get_all_stats().then(response => {
            console.log(response.data.data);
            this.setState({
                counts: response.data.data,
                loading: false
            })
            console.log(this.state.counts);
        })
        this.get_data_filteration()

    }

    get_data_filteration = () => {
        this.setState({
            loading: true
        })
        AdminController.get_all_stats_by_months().then(response => {
            console.log(response.data.data);
            this.setState({
                monthwise: response.data.data,
                loading: false
            })
            console.log(this.state.monthwise);
        })

        AdminController.get_all_orders()
            .then(result => {
                this.setState({
                    loading: false,
                    orders: result.data.data.filter(i => i.current_state != 0 && i.current_state != 5)
                })

                console.log("------------------");
                console.log(this.state.orders)
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false })
            })

    }

    render() {
        const { counts, orders, loading } = this.state
        return (

            <div className="bg-light wd-wrapper">
                <SideBar active={"dashboard"} />
                { this.state.loading == false ?
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
                                            <h3 className="text-dark bold-normal pr-2">{counts.user_count}</h3>
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
                                            <h3 className="text-dark bold-normal pr-2">{counts.supplier_count}</h3>
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
                                            <h3 className="text-dark bold-normal pr-2">{counts.pending_orders}</h3>
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
                                            <h3 className="text-dark bold-normal pr-2">{counts.completed_orders}</h3>
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
                                            <h3 className="text-dark bold-normal pr-2">{counts.site_count}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src={img_construction} className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="text-secondary bold-normal pr-2"> Items</h6>
                                            <h3 className="text-dark bold-normal pr-2">{counts.item_count}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7 px-0" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 mx-2">
                                        {/* <h6 className="text-muted bold-normal px-2 mb-0">  2020  </h6> */}
                                        <h5 className="text-dark bold-normal px-2 pt-1 pb-3 ">  Orders </h5>
                                        <LineChart data={{
                                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septhmber', 'October', 'November', 'December'],
                                            datasets: [
                                                {
                                                    label: "Revenue",
                                                    backgroundColor: 'rgba(26, 188, 156,0.5)',
                                                    borderColor: 'rgba(39, 174, 96,0.4)',
                                                    data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27]
                                                }
                                            ]
                                        }}
                                            options={options2} width={12} height={3} />
                                    </div>
                                </div>
                                {/* <div className="col-6 px-0" >
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2 mx-2">
                                    <div className="campaign ct-charts px-3">

                                        <h6 className="text-muted bold-normal  mt-2 mb-3">  Supplier Registration  </h6>
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
                                            options={options1} width="600" height="220" />
                                    </div>
                                </div>
                            </div> */}
                                <div className="col-5 px-0" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 px-2">
                                        <div className="campaign ct-charts px-3">
                                            <h5 className="text-dark bold-normal px-2 pt-1 pb-3 ">  Orders Status</h5>
                                            <Doughnut data={{
                                                labels: [
                                                    'Pending',
                                                    'Completed',
                                                ],
                                                datasets: [
                                                    {
                                                        label: "Users",
                                                        backgroundColor: [
                                                            '#4FC3F7',
                                                            'rgba(184, 233, 148,1.0)',
                                                            'rgba(144, 164, 174,1.0)',

                                                        ],
                                                        hoverBackgroundColor: [
                                                            '#4FC3F7',
                                                            'rgba(184, 233, 148,1.0)',
                                                            'rgba(144, 164, 174,1.0)',
                                                        ],
                                                        data: [counts.pending_orders, counts.completed_orders]
                                                    }
                                                ]
                                            }}
                                                width="600" height="220" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 px-0" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3 mx-2">
                                        {/* <h6 className="text-muted bold-normal px-2 mb-0">  2020  </h6> */}
                                        <h5 className="text-dark bold-normal px-2 pt-1 pb-3 ">  Recent Orders </h5>
                                        <div className="table-responsive px-2">
                                            <table className="table table-stripped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"><h6 className="header">Delivery Date</h6></th>
                                                        <th scope="col"><h6 className="header">No.Items</h6></th>
                                                        <th scope="col"><h6 className="header">Total</h6></th>
                                                        <th scope="col"><h6 className="header">Current State</h6></th>
                                                        <th scope="col"><h6 className="header">Actions</h6></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders && orders
                                                        .sort((a, b) => parseInt(a.current_state) - parseInt(b.current_state))
                                                        .map((item, i) => this.display(item, i)).splice(0,5)
                                                    }

                                                    {loading &&
                                                        <td colSpan={5}><h6 className="text-dark normal text-center py-2">Loading...</h6></td>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }

    display = (row, i) => {
        return (
            <tr key={row._id}>
                <td><h6 className="text-dark normal">{moment(row.date).format('LL')}</h6></td>
                <td><h6 className="text-dark normal">{("0" + (row.items.length)).slice(-2)}</h6></td>
                <td><h6 className="text-dark normal">{`LKR ${Config.numberWithCommas(gettotal(row.items))}.00`}</h6></td>
                <td><span className={`mr small rounded py-1 px-2 ${state_color(row.current_state)}`}>
                    {current_state(row.current_state)}
                </span>
                </td>
                <td>
                    <Link to={`/admin/orders/${row._id}`}>
                        <span className=" rounded py-1 px-2 bg-success text-white">
                            <FontAwesomeIcon icon={faEye} className="mr-1" /> Details
                    </span>
                    </Link>
                </td>
            </tr>
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