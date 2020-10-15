import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import Loader from '../Loading'
import Select from 'react-select';

const options = [
    { value: 'Site Manager', label: 'Site Manager' },
    { value: 'Accountant', label: 'Accountant ' },
    { value: 'Management(Admin)', label: 'Management(Admin)' },
];

class createUser extends Component {
    constructor() {
        super();
        this.state = {
            addManagerState: false,
            name: '',
            contactNumber: '',
            email: '',
            site_location: '',
            site_code: '',
            password: Config.password,
            all_users: [],
            loading: true,
            viewUser: '',
            showUserModal: false,
            selectedOption: null,
            designation: '',

        };
        this.get_all_site_managers()
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    change_toggle = () => {
        if (this.state.addManagerState) {
            this.setState({ addManagerState: false })
        } else {
            this.setState({ addManagerState: true })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault()
        var role_number = 0;
        if (this.state.selectedOption.value == "Site Manager")
            role_number = 1
        else if (this.state.selectedOption.value == "Accountant")
            role_number = 2
        else if (this.state.selectedOption.value == "Management(Admin)")
            role_number = 3



        console.log(this.state.selectedOption.value);
        console.log(role_number);


        var data = {
            username: this.state.name,
            contact_number: this.state.contactNumber,
            email: this.state.email,
            password: Config.password,
            designation: this.state.selectedOption.value,
            role: role_number
        }
        console.log(data);

        ADMIN.register_site_manager(data).then(result => {
            Config.setToast("Successfully Registed")
            this.get_all_site_managers()
            this.clear()
            this.setState({
                addManagerState: false
            })
            this.props.history.push("/admin/sitemanagers");
        }).catch(err => {
            console.log(err.code);
            Config.setErrorToast("Someting went wrong")
            this.props.history.push("/admin/sitemanagers");
        })

    }

    clear = () => {
        this.setState({
            name: '',
            contactNumber: '',
            email: '',
            site_code: '',
            site_location: '',
            password: Config.password,
        })
    }
    get_all_site_managers = async () => {
        const res = await ADMIN.get_all_site_users_details()
        console.log(res);
        this.setState({
            all_users: res.data.data
        })
        await this.setState({
            loading: false,
        });
    }
    showViewUser(i) {
        var singleUser = this.state.all_users.filter(user => user._id == i);
        this.setState({
            showUserModal: true,
            viewUser: singleUser[0]
        })
    }

    render() {
        const { name, contactNumber, email, site_code, site_location, viewUser, selectedOption } = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"createUser"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        {/* <Loader show={this.state.loading} /> */}
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    User Managment
                                <span className="badge badge-success mx-2  " >Create User</span>
                                </h5>
                            </div>
                            <div className="col-12" >
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h6 className="form-label py-2 mt-3">Name *</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John"
                                                    value={name}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">


                                                <h6 className="form-label py-2 mt-3">Email *</h6>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="johndoe@gmail.com"
                                                    value={email}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label py-2 mt-3">Contact Number *</h6>
                                                <input
                                                    type="number"
                                                    name="contactNumber"
                                                    placeholder="07XXXXXXXX"
                                                    value={contactNumber}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">

                                                <h6 className="form-label py-2 mt-3">Designation  *</h6>
                                                <Select name="designation"
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                />

                                                <h6 className="form-label py-2 mt-3">Password  *</h6>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Automaticaly Generate and Email"
                                                    className="form-control" disabled></input>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <h6 className="form-label py-2 ">Site Location *</h6> */}
                                                <input
                                                    type="text"
                                                    name="site_location"
                                                    placeholder="Galle - Main Street"
                                                    value={site_location}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} hidden></input>
                                            </div>
                                            <div className="col-md-6">
                                                {/* <h6 className="form-label py-2 ">Site Code *</h6> */}
                                                <input
                                                    type="text"
                                                    name="site_code"
                                                    placeholder="GL0156"
                                                    value={site_code}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} hidden></input>

                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" onClick={() => this.clear()} className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" >
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"   >
                                                        Add User
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
            </div>
        );
    }

}
export default withRouter(createUser);