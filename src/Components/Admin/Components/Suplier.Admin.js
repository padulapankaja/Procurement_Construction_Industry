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
            suppliers_arry: res.data.data
        })
        await this.setState({
            loading: false,
        });
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
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Suppliers Managment
                                    {role== 3 ?<span className="badge badge-success mx-2  " style={{ cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add Supplier</span>:''}
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addSuplierState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">Name *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John"
                                                    value={name}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label py-2 mt-2">Email *</h6>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="johndoe@gmail.com"
                                                    value={email}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label py-2 mt-2">Address *</h6>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="156/4 , Example Road , Colombo"
                                                    //value={email}
                                                    className="form-control"
                                                    onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2 ">Contact Number *</h6>
                                                <input
                                                    type="number"
                                                    name="contactNumber"
                                                    placeholder="07XXXXXXXX"
                                                    value={contactNumber}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                                <h6 className="form-label py-2 mt-2">Password  *</h6>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Automaticaly Generate and Email"
                                                    className="form-control" disabled></input>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" onClick={() => this.clear()} className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" >
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"   >
                                                        Add Supplier
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <button onClick={() => this.getAllManagers()}>Vee</button> */}
                            </div>
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        All Suppliers
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Contact No</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.suppliers_arry && this.state.suppliers_arry.map(item => this.display_all_supliers(item))}
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
                <td> {data_arry.name}</td>
                <td> {data_arry.email}</td>
                <td> {data_arry.address} </td>
                <td> {data_arry.phoneNo}</td>

            </tr>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(SupliersAdmin));
