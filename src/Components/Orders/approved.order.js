import React, { Component } from 'react';
import SideBar from '../Common/Sidebar'
import Config from '../Controller/Config.controller'
import ADMIN from '../Controller/Admin.controller'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'

class CompletedOrders extends Component {
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
            this.setState({ loading : false ,
                orders : result.data.data.filter(i => i.current_state == 0 || i.current_state == 5) })
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
                <SideBar active={"Completed"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                        <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                  Completed Orders {orders.length > 0 && 
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
                            <div className="col-12">
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
                 <td><h6 className="text-dark normal">{`LKR ${Config.numberWithCommas(this.gettotal(row.items))}.00`}</h6></td>
                 <td><span className={` small rounded py-1 px-2 ${this.state_color(row.current_state)}`}>
                        {this.current_state(row.current_state)}
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

    gettotal = (items = []) => {
        return items.reduce( (acc,current) => {
          if(current.item && current.item.price && current.quantity){
              return acc + (current.item.price * current.quantity)
          }else{
            return acc
          }
        },0)
      }

    render_state = (status) => {
        switch(parseInt(status.state)){
            case 0 : return  <span className="mr-1 small rounded bg-danger px-2 text-white ">{status.comment}</span>
            case 1 : return  <span className="mr-1 small rounded bg-info px-2 text-white ">{status.comment}</span>
            case 2 : return  <span className="mr-1 small rounded state2 px-2 text-white">{status.comment}</span> 
            case 3 : return  <span className="mr-1 small rounded state3 px-2 text-white">{status.comment}</span> 
            case 4 : return  <span className="mr-1 small rounded state4 px-2 text-white">{status.comment}</span>
            case 5 : return  <span className="mr-1 small rounded bg-success px-2 text-white">{status.comment}</span>
          }
    }

    current_state = (status) => {
        switch(parseInt(status)){
            case 0 : return 'Rejected' 
            case 1 : return 'Order Placed' 
            case 2 : return  'Accountant Approved'
            case 3 : return  'Management Approved'
            case 4 : return  'Supplier Approved'
            case 5 : return  'Delivered'
          }
    }

    state_color = (status) => {
        switch(parseInt(status)){
            case 0 : return "xx00"  
            case 1 : return "xx01" 
            case 2 : return "xx02"  
            case 3 : return "xx03"  
            case 4 : return "xx04"  
            case 5 : return "xx05"  
          }
    }
  
}
export default CompletedOrders;