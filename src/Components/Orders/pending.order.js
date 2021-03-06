      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../Common/Sidebar'
import Config from '../Controller/Config.controller'
import ADMIN from '../Controller/Admin.controller'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import {gettotal , render_state , current_state , state_color} from '../Controller/Util.controller'

class PendingOrders extends Component {
    constructor() {
        super();
        this.state = {
            orders : [],
            loading : true,
        };
    }

    componentDidMount(){
        ADMIN.get_all_orders()
        .then( result => {
            console.log(result.data.data);
            this.setState({ loading : false ,
                orders : result.data.data.filter(i => i.current_state != 0 && i.current_state != 5) })
        })

        .catch( err => {
            console.log(err);
            this.setState({loading : false})
        })
        
    }

    render() {
        const { orders , loading} = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"Pending"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                        <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                  Pending Orders {orders.length > 0 && 
                                  <span className="mx-1 badge badge-primary">{("0" + (orders.length)).slice(-2)}</span>}
                                </h6>
                            </div>
                            {/* <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">Supplier Name</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control" ></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">Site Manager Name</h6>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control" >
                                                </input>
                                            </div>
                                            <div className="col-md-4 mt-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <button type="reset" className=" btn btn-secondary   bold-normal" style={{ width: '100%' }} >
                                                            Reset
                                                </button>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button type="submit" className=" btn btn-dark   bold-normal" style={{ width: '100%' }}>
                                                            Search
                                                    </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> */}
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12 pending_orders_us">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
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
                                                        .sort((a,b) => parseInt(a.current_state) -  parseInt(b.current_state))
                                                        .map((item,i) => this.display(item,i))
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
            </div>
        );
    }

    display = (row,i) => {
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
                    <FontAwesomeIcon icon={faEye} className="mr-1"/> Details
                    </span>
                    </Link>
                 </td>
            </tr>
        );
    }


  
}
export default PendingOrders;