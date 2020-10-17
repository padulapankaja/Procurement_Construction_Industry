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
            main_loading : true ,
            dates: [],
            no_of_orders: []
        };
    }
    componentDidMount = async () => {
        await AdminController.get_all_stats().then(response => {
            this.setState({
                counts: response.data.data,
                loading: false
            })
        })
        this.get_data_filteration()
    }
    get_data_filteration = () => {
        this.setState({
            loading: true
        })
        
        AdminController.get_all_orders()
            .then(result => {
                this.setState({
                    loading: false,
                    orders: result.data.data
                })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
        AdminController.get_recent_details().then(response => {
            var m_today = moment( new Date() ).format("YYYY-MM-DD");
            var today = new Date(m_today ); 
            var prev =  new Date(moment(m_today, "YYYY-MM-DD").subtract(7 ,'days').format("YYYY-MM-DD") );
            var orders = response.data.data;
            let dataset = [];

            for(var arr=[],dt= prev ; dt<= today; dt.setDate(dt.getDate()+1)){ 
            
                let c = new Date(dt);
                let numberoforders = 0;
                let find = orders.findIndex( item => item.date === moment(c).format('YYYY-MM-DD'))
                if(find >= 0 ){
                    numberoforders = orders[find].numberoforders;
                }
    
                dataset.push({
                   date : moment(c).format('MMM-DD'),
                   numberoforders : numberoforders   
                })
    
              }
            
            this.setState({
                loading: false,
                dates: dataset.map(function (val) {
                    return val.date;
                }),
                no_of_orders: dataset.map(function (val) {
                    return val.numberoforders;
                }),
            })
        }).catch(err => {
            this.setState({ loading: false })
        })

        this.setState({main_loading : false})
    }
    render() {
        const { counts, orders, loading ,main_loading} = this.state
        return (

            <div className="bg-light wd-wrapper">
                <SideBar active={"dashboard"} />
                
                    <div className="wrapper-wx" >
                        <div className="container-fluid" >
                            <div className="row mx-1">
                                <div className="col-12 px-0">
                                    <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                    System Overview
                                    </h6>
                                </div>
                                { main_loading && 
                                <div className="col-12 px-0">
                                    <h6 className="text-dark bold-normal py-2 bg-white shadow-sm px-3 mt-2 rounded text-center">
                                        Loading...
                                    </h6>
                                </div>
                                }
                                { !main_loading && 
                                <>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src="http://fashi.lucidex.tech/images/default/admin.Users.png" className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2">Users </h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.user_count)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src="http://fashi.lucidex.tech/images/default/admin.Managers.png" className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2">Suppliers </h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.supplier_count)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src={img_pending} className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2">Pending</h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.pending_orders)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src={img_delivery} className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2">Completed</h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.completed_orders)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-2`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src={img_sites} className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2">Sites</h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.site_count)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-2 col-md-3 col-sm-4 col-6 pl-0 pr-0`} >
                                    <div className={cardstyle}>
                                        <div className="pl-3 pr-0 my-auto">
                                            <img src={img_construction} className="sidebar-image"></img>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="mb-0 text-secondary bold-normal pr-2"> Items</h6>
                                            <h3 className="mb-0 text-dark bold-normal pr-2">{("0" + (counts.item_count)).slice(-2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 px-0 mb-2" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-0 mr-2 h-100">
                                     <h6 className="text-dark bold-normal px-3 py-1 ">Orders Count<span className="badge badge-primary ml-2">Last 7 Days</span></h6>
                                         <div className="px-3 pt-2 pb-0" >
                                        <LineChart data={{
                                            labels: this.state.dates,
                                            datasets: [
                                                {
                                                    label: "Revenue",
                                                    backgroundColor: '#3498db80',
                                                    borderColor: '#3498dbBF',
                                                    data: this.state.no_of_orders
                                                }
                                            ]
                                        }}
                                            options={options1} width={8} height={3.5} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 px-0 mb-2" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-0 px-2 ml-2 h-100">
                                        <div className="campaign ct-charts px-3">
                                        <h6 className="text-dark bold-normal py-1 ">Order Status </h6>
                                            <div className="p-0" >
                                            <Doughnut
                                                 options={{ legend: {position : 'bottom'}}}
                                                data={{
                                                labels: [
                                                    'Rejected',
                                                    'Placed',
                                                    'A.Approved',
                                                    'M.Approved',
                                                    'S.Approved',
                                                    'Delivered',
                                                ],
                                                datasets: [
                                                    {
                                                        label: "Orders",
                                                        backgroundColor: [
                                                            '#3498db',
                                                            '#3780b6',
                                                            '#3772a1',
                                                            '#356085',
                                                            '#314f6a',
                                                            '#2c3e50',

                                                        ],
                                                        data: this.countbytype(orders)
                                                    }
                                                ]
                                            }}
                                               height="6" width="7" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 px-0 mt-2" >
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pt-2 pb-3">
                                        {/* <h6 className="text-muted bold-normal px-2 mb-0">  2020  </h6> */}
                                        <h6 className="text-dark bold-normal px-3 py-1 ">  Recent Orders </h6>
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
                                                        .map((item, i) => this.display(item, i)).splice(0, 5)
                                                    }

                                                    {loading &&
                                                        <td colSpan={5}><h6 className="text-dark normal text-center py-2">Loading...</h6></td>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> 
                                </> }
                            </div>
                        </div>
                    </div>
                   
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

    countbytype = (orders = []) => {
        let data = [0,0,0,0,0,0]
        orders.forEach( row => {
            if(row.current_state <= 5 && row.current_state >= 0){
                data[row.current_state] = data[row.current_state] + 1
            }
        })
        console.log(data)
        return data;
    }
}
const cardstyle = "card border-0 shadow-sm rounded mt-2 bg-white py-2 d-flex flex-row"
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
            },
            ticks: {
                beginAtZero: true,
                precision: 0,
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