      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import '../../asserts/singeorder.css'
import {connect } from 'react-redux'
class SingleOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params.id,
            item : null ,
            supplier : null ,
            site : null ,
            comment : '' ,
            loading : true
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        let site_id = null;
        ADMIN.get_single_order(this.props.match.params.id)
        .then( result => {
            this.setState({ item : result.data.data.order , supplier  :  result.data.data.supplier })
            site_id = result.data.data.order.site
            return ADMIN.get_all_sites()
        })
        .then( result => {
            let current_site = result.data.data.find( site => site._id == site_id)
            if(current_site){
                this.setState({ site : current_site , loading : false })
            }
        })
        .catch( err => {
            console.log(err);
            this.setState({loading : false , item : null  })
        })
    }

    Submit = (data) => {
        this.setState({loading : true})
        ADMIN.update_state(data)
        .then( result => {
            this.getData();
            Config.setToast("Order Status Change Successfully")
        })
        .catch( err => {
            this.setState({loading : false})
            Config.setErrorToast("Order Status Change Failed")
        })
    }

    Approve = () => {
        const {auth} = this.props;
        const { id , comment} = this.state;
        const role = auth.user.role;
        let state = 1 
        let cm = ""

        if(role == 2){
            state = 2
            cm = 'Accountant Approved'
        }

        if(role == 3){
            state = 3
            cm = 'Management Approved'
        }

        if(role == 0){
            state = 4
            cm = 'Supplier Approved'
        }

        this.Submit({
            id : id ,
            state : {
                state : state,
                comment : cm ,
                date : new Date(),
                note : comment
            }
        })
    }

    Reject = () => {
        const {auth} = this.props;
        const role = auth.user.role;
        const { id , comment} = this.state;
        if(comment.length > 0 ){
        this.Submit({
            id : id ,
            state : {
                state : 0,
                comment : "Rejected" ,
                date : new Date(),
                note : comment ,
                by : role
            }
        })
        }else{
            Config.showAlert('Comment is required if you are rejecting an order !' ,'' )
        }
    }
   
    render() {
        const {auth} = this.props;
        const { item , loading , supplier , site , comment} = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"orders"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid pb-2" >
                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                    Order Details 
                                </h6>
                            </div>
                            { loading && <div className="col-12">
                                <h6 className="text-dark font-weight-bold py-2 bg-white shadow-sm px-3 mt-2 rounded small text-center">
                                    Loading...
                                </h6>
                            </div>}
                            
                            { !loading && item != null && 
                            <>
                            <div className="col-6">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <div className="card-header m-0 p-0 bg-white2" >
                                        <h6 className="text-dark bold-normal py-2 px-3 mb-0 form-label">
                                            Construction Site Details
                                        </h6>
                                    </div>
                                    <div className=" py-2  px-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Site Manager Name</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={site.site_manager && site.site_manager.username}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Site Contact No</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={site.site_manager && site.site_manager.contact_number}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label  mt-2 mb-2" >Site Location</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={site.address}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Site Code</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={site.site_code}
                                                    className="form-control-sm form-control"
                                                    readOnly>
                                                </input>
                                            </div>
                                           
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-6">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <div className="card-header m-0 p-0 bg-white2" >
                                        <h6 className="text-dark bold-normal py-2 px-3 mb-0 form-label">
                                            Supplier Details
                                            {/* {JSON.stringify(site)} */}
                                        </h6>
                                    </div>
                                    <div className=" py-2  px-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Supplier Name</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={supplier.name}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Supplier Contact No</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={supplier.phoneNo}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label  mt-2 mb-2" >Email Address</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={supplier.email}
                                                    className="form-control-sm form-control"
                                                    readOnly >
                                                </input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2" >Address</h6>
                                                <input style={{backgroundColor : '#fcfcfc'}}
                                                    type="text"
                                                    name="supliername"
                                                    value={supplier.address}
                                                    className="form-control-sm form-control"
                                                    readOnly>
                                                </input>
                                            </div>
                                           
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* ----------------------------------------------------------- */}
                            <div className="col-9 pb-3">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2 h-100">
                                    <div className="card-header m-0 p-0 bg-white2" >
                                        <h6 className="text-dark bold-normal py-2 px-3 mb-0 form-label">
                                           Order Item Details
                                        </h6>
                                    </div>
                                   
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6 className="normal mb-0 ">Item Name</h6></th>
                                                    <th scope="col"><h6 className="normal mb-0 ">Quantity</h6></th>
                                                    <th scope="col"><h6 className="normal mb-0 ">Price</h6></th>
                                                    <th scope="col"><h6 className="normal mb-0 ">Sub Total</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { item.items.map( row => (
                                                    <tr>
                                                        <td><h6 className="text-dark normal">{row.item.name}</h6></td>
                                                        <td><h6 className="text-dark normal">{row.quantity}</h6></td>
                                                        <td><h6 className="text-dark normal">{`LKR ${row.item.price}.00`}</h6></td>
                                                        <td><h6 className="text-dark normal">{`LKR ${Config.numberWithCommas(parseInt(row.item.price) * parseInt(row.quantity))}.00`}</h6></td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="bg-light" colSpan={2}></td>
                                                    <td className="bg-light"><h6 className="normal ">Total</h6></td>
                                                    <td  className="bg-light"><h6 className="normal text-left">{`LKR ${Config.numberWithCommas(this.gettotal(item.items))}.00`}</h6></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 pb-3">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2 h-100">
                                    <div className="card-header m-0 p-0 bg-white2" >
                                        <h6 className="text-dark bold-normal py-2 px-3 mb-0 form-label">
                                            Order Status Log
                                        </h6>
                                    </div>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <tbody>
                                                {  item.state.map( row => (
                                                    <tr>
                                                        <td>{this.render_state(row)} 
                                                        {row.note && row.note.length > 0 && 
                                                        <h6 className="text-muted bold-normal small text-left  py-2 mb-0 mt-1">{row.note && row.note.length > 0 && row.note}</h6>}
                                                        <h6 className="text-dark small text-left mb-0 mt-1">{moment(row.date).calendar()}</h6>
                                                        </td>
                                                       
                                                    </tr>
                                                ))}
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mb-2">
                                {/* ------------------------------------ */}
                                { auth.user.role == 2 && item.current_state == 1 &&  
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                   
                                    <div className="col-12 pb-2 mt-2" >
                                        <h6 className="text-dark bold-normal py-2 px-2 mb-0 normal ">
                                        Accountant approval need to procceed. Adding a comment is optional</h6>
                                        <textarea 
                                            rows={2}
                                            value={comment}
                                            onChange={(e) => this.setState({comment : e.target.value})}
                                            placeholder={'Add a note to check others'}
                                            className="form-control mx-2 w-75 mt-1">    
                                        </textarea>
                                        <div className="mx-2 mt-2" >
                                        <button 
                                            onClick={this.Approve}
                                            className="btn btn-sm btn-success mr-2">Approve</button>
                                        <button 
                                            onClick={this.Reject}
                                            className="btn btn-sm btn-danger">Reject</button>
                                        </div>

                                    </div>
                                </div>}
                                {/* ------------------------------------ */}
                                { auth.user.role == 3 && item.current_state == 2 &&  
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                   
                                    <div className="col-12 pb-2 mt-2" >
                                        <h6 className="text-dark bold-normal py-2 px-2 mb-0 normal ">
                                        Management approval need to procceed. Adding a comment is optional</h6>
                                        <textarea 
                                            rows={2}
                                            value={comment}
                                            onChange={(e) => this.setState({comment : e.target.value})}
                                            placeholder={'Add a note to check others'}
                                            className="form-control mx-2 w-75 mt-1">    
                                        </textarea>
                                        <div className="mx-2 mt-2" >
                                        <button 
                                            onClick={this.Approve}
                                            className="btn btn-sm btn-success mr-2">Approve</button>
                                        <button 
                                            onClick={this.Reject}
                                            className="btn btn-sm btn-danger">Reject</button>
                                        </div>

                                    </div>
                                </div>}
                                {/* ----------------------------------------------------- */}
                                { auth.user.role == 0 && item.current_state == 3 &&  
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                   
                                    <div className="col-12 pb-2 mt-2" >
                                        <h6 className="text-dark bold-normal py-2 px-2 mb-0 normal ">
                                        Supplier approval need to procceed. Adding a comment is optional</h6>
                                        <textarea 
                                            rows={2}
                                            value={comment}
                                            onChange={(e) => this.setState({comment : e.target.value})}
                                            placeholder={'Add a note to check others'}
                                            className="form-control mx-2 w-75 mt-1">    
                                        </textarea>
                                        <div className="mx-2 mt-2" >
                                        <button 
                                            onClick={this.Approve}
                                            className="btn btn-sm btn-success mr-2">Approve</button>
                                        <button 
                                            onClick={this.Reject}
                                            className="btn btn-sm btn-danger">Reject</button>
                                        </div>

                                    </div>
                                </div>}
                                {/* ----------------------------------------------------- */}
                            </div>
                            </>
                            }

                            { !loading && item == null && <div className="col-12">
                                <h6 className="text-dark font-weight-bold py-3 bg-white shadow-sm px-3 mt-2 rounded small text-center">
                                    No Item Found !
                                </h6>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render_state = (status) => {
        switch(parseInt(status.state)){
            case 0 : return  <span className="mr-1 small rounded bg-danger py-1 px-2 text-white ">{status.comment}</span>
            case 1 : return  <span className="mr-1 small rounded bg-info py-1 px-2 text-white ">{status.comment}</span>
            case 2 : return  <span className="mr-1 small rounded state2 py-1 px-2 text-white">{status.comment}</span> 
            case 3 : return  <span className="mr-1 small rounded state3 py-1 px-2 text-white">{status.comment}</span> 
            case 4 : return  <span className="mr-1 small rounded state4 py-1 px-2 text-white">{status.comment}</span>
            case 5 : return  <span className="mr-1 small rounded bg-success py-1 px-2 text-white">{status.comment}</span>
          }
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
}



const mapStateToProps = (state) => ({
    auth: state.auth || {},
});
export default  connect(mapStateToProps)(SingleOrder);