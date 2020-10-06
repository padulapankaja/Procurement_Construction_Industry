import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import '../../asserts/singeorder.css'

class SingleOrder extends Component {
    constructor() {
        super();
        this.state = {
            item_prices: [],
            item_remarks: []

        };
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                                    Order Details
                                </h5>
                            </div>
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <div className=" py-2  px-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2" >Site Manager Name</h6>
                                                <input
                                                    type="text"
                                                    name="supliername"
                                                    value={"Amoda Sasmith"}
                                                    className="form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-3">
                                                <h6 className="form-label py-2" >Site Location</h6>
                                                <input
                                                    type="text"
                                                    name="supliername"
                                                    value={"Galle - Main Street"}
                                                    className="form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-3">
                                                <h6 className="form-label py-2" >Site Code</h6>
                                                <input
                                                    type="text"
                                                    name="supliername"
                                                    value={"GL018"}
                                                    className="form-control"
                                                    readOnly>
                                                </input>
                                            </div>
                                            <div className="col-md-3">
                                                <h6 className="form-label py-2">Date</h6>
                                                <input
                                                    type="text"
                                                    name="date"
                                                    value={"2020-08-06"}
                                                    className="form-control"
                                                    readOnly
                                                >
                                                </input>
                                            </div>
                                            <div className="col-md-3">
                                                <h6 className="form-label py-2">Time</h6>
                                                <input
                                                    type="text"
                                                    name="date"
                                                    value={"12:30 P.M"}
                                                    className="form-control"
                                                    readOnly
                                                >
                                                </input>
                                            </div>
                                            <div className="col-md-3">
                                                <h6 className="form-label py-2" >No Of Items</h6>
                                                <input
                                                    type="number"
                                                    name="supliername"
                                                    value={"08"}
                                                    className="form-control"
                                                    readOnly>
                                                </input>
                                            </div>

                                            <div className="col-md-3">
                                                <h6 className="form-label py-2">State</h6>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={"Pending"}
                                                    className="form-control"
                                                    readOnly>

                                                </input>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <form className="py-2" onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                        <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                            Items Detail
                                </h5>
                                        <div className="table-responsive px-2">
                                            <table className="table table-stripped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Remark</th>
                                                        <th scope="col">Price (LKR)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data_arry.items.map(item => this.display_all_items(item))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 card border-0 shadow-sm rounded mt-3  pb-2 " style={{ backgroundColor: '#ecf0f1' }}>
                                        <div >
                                            <p className="mt-1 mb-0 pt-1 pb-0" style={{ float: 'right', fontSize: '20px' }}><b>Grand Total &nbsp;:&nbsp; LKR 52000&nbsp;.00</b></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3" style={{ float: 'right' }}>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <button type="reset" className=" btn btn-secondary   bold-normal" style={{ width: '100%' }} >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="col-md-6 mt-2 mb-3">
                                                <button type="submit" className=" btn btn-dark   bold-normal" style={{ width: '100%' }}>
                                                    Submit
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    display_all_items = data_arry => {
        return (
            <tr key={data_arry._id}>
                <td> <input
                    type="text"
                    name="state"
                    value={data_arry.item_name}
                    className="no_border_text form-control"
                    style={{ border: 'none', background: 'none' }}
                    readOnly >
                </input>
                </td>
                <td> <input
                    type="number"
                    name="state"
                    value={data_arry.item_qty}
                    className="no_border_text form-control "
                    style={{ border: 'none', background: 'none' }}
                    readOnly >
                </input>
                </td>
                <td>
                    <input
                        type="text"
                        name="state"
                        value={data_arry.item_remark}
                        className="form-control" >
                    </input>
                </td>
                <td>
                    <input
                        type="number"
                        name="state"
                        value={data_arry.item_price}
                        className="form-control" >
                    </input>
                </td>
            </tr>
        );
    }
}
const data_arry = {
    site_manager: "Amoda Sasmitha",
    site_location: "Galle - Main Street",
    site_code: "GL018",
    date: "2020-08-06",
    time: "12:30 P.M",
    no_of_items: "08",
    state: "Pending",
    items: [
        {
            _id: 1,
            item_name: "Cement",
            item_qty: "10",
            item_price: "12500",
            item_remark: "Lorem ipsum",
        },
        {
            _id: 2,
            item_name: "Sand(Q)",
            item_qty: "1",
            item_price: "8000",
            item_remark: "Lorem ipsum",
        },
        {
            _id: 3,
            item_name: "Rock(Q)",
            item_qty: "5",
            item_price: "250000",
            item_remark: "Lorem ipsum",
        },
    ]
}
export default SingleOrder;