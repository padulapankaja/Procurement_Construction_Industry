import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class SupliersAdmin extends Component {
    constructor() {
        super();
        this.state = {
            loading : true ,
            addSuplierState: false,
            name: '',
            contactNumber: '',
            email: '',
            password: Config.password,
            address: '',
            suppliers_arry: [],

        };
        this.get_all_suppliers_func()
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    get_all_suppliers_func = async () => {
        const res = await ADMIN.get_all_suppliers()
        console.log(res);
        this.setState({
            suppliers_arry: res.data.data,
            loading : false
        })
       
    }
    change_toggle = () => {
        if (this.state.addSuplierState) {
            this.setState({ addSuplierState: false })
        } else {
            this.setState({ addSuplierState: true })
        }
    }
    onSubmit = async (e) => {
        e.preventDefault()
        var data = {
            name: this.state.name,
            phoneNo: this.state.contactNumber,
            email: this.state.email,
            password: Config.password,
            address: this.state.address
        }
        console.log(data);
        ADMIN.register_suppliers(data).then(response => {
            this.get_all_suppliers_func()
            Config.setToast("Successfully Registed")
            this.clear()

        }).catch(err => {
            Config.setErrorToast("Someting went wrong")
        })

    }

    clear = () => {
        this.setState({
            name: '',
            contactNumber: '',
            email: '',
            password: Config.password,
            address: ''
        })
    }
    render() {
        const { name, contactNumber, email } = this.state
        const role = this.props.auth.user.role;
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"suppliers"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                        <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                Supplier Management
                                </h6>
                            </div>
                            { role == 3 && <div className="col-12" >
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2">Name *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Supplier Name"
                                                    value={name}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label mt-3 mb-2">Email *</h6>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Supplier Email"
                                                    value={email}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label mt-3 mb-2">Address *</h6>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Supplier Address"
                                                    //value={email}
                                                    className="form-control"
                                                    onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mt-2 mb-2">Contact Number *</h6>
                                                <input
                                                    type="number"
                                                    name="contactNumber"
                                                    placeholder="Enter Contact No"
                                                    value={contactNumber}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                                <h6 className="form-label mt-3 mb-2">Password  *</h6>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Automaticaly Generate and Email"
                                                    className="form-control" disabled></input>
                                                <br></br>
                                                <div className="d-flex mt-3">
                                                   
                                                    <button type="submit" className="font-weight-bold px-2 btn btn-dark  btn-sm bold-normal"   >
                                                        Add Supplier
                                                </button>
                                                <button type="reset" onClick={() => this.clear()} className="font-weight-bold px-2 ml-2  btn btn-secondary  btn-sm bold-normal" >
                                                        Cancel
                                                </button>
                                            </div>
                                            </div>
                                           
                                        </div>
                                    </form>
                                </div>
                                {/* <button onClick={() => this.getAllManagers()}>Vee</button> */}
                            </div> }
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                 
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6 className="header">Name</h6></th>
                                                    <th scope="col"><h6 className="header">Email</h6></th>
                                                    <th scope="col"><h6 className="header">Address</h6></th>
                                                    <th scope="col"><h6 className="header">Contact No</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.suppliers_arry && this.state.suppliers_arry.map(item => this.display_all_supliers(item))}
                                                {this.state.loading &&
                                                    <td colSpan={4}><h6 className="text-dark normal text-center py-2">Loading...</h6></td>
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
    display_all_supliers = data_arry => {
        console.log(this.state.suppliers_arry);
        return (
            <tr key={data_arry._id}>
                <td> <h6 className="text-dark normal">{data_arry.name}</h6></td>
                <td> <h6 className="text-dark normal">{data_arry.email}</h6></td>
                <td> <h6 className="text-dark normal">{data_arry.address} </h6></td>
                <td> <h6 className="text-dark normal">{data_arry.phoneNo}</h6></td>

            </tr>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(SupliersAdmin));
