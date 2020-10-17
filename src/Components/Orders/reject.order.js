      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../Common/Sidebar'
import Config from '../Controller/Config.controller'
import ADMIN from '../Controller/Admin.controller'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'

class RejectedOrders extends Component {
    constructor() {
        super();
        this.state = {


        };
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    change_toggle = () => {
        if (this.state.addSuplierState) {
            this.setState({ addSuplierState: false })
        } else {
            this.setState({ addSuplierState: true })
        }
    }


    render() {

        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"orders"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Rejected  Orders
                                </h5>
                            </div>
                            <div className="col-12 pre_orders_us">
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
                            </div>
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        All Orders
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">No.Items</th>
                                                    <th scope="col">Site Location</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{moment(new Date("2020-10-06")).format('YYYY MMM DD')}</td>
                                                    <td>05</td>
                                                    <td>Galle - Main Street(GL05)</td>
                                                    <td>
                                                        <Link to="/admin/orders/1">
                                                        <button className="btn btn-success btn-sm px-2 mr-2">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button>
                                                        </Link>
                                                        {/* <a className="btn btn-info btn-sm px-2 mr-2" href={`mailto:samankumara@gmail.com`}  >
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </a> */}
                                                    </td>
                                                </tr>
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
}
export default RejectedOrders;