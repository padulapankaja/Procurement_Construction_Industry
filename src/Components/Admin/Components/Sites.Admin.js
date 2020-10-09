import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import Loader from '../Loading'

class Sites extends Component {
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
            site_managers_arry: [],
            loading: true,
        };
        this.get_all_site_managers()

        
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    change_toggle = () => {
        if (this.state.addManagerState) {
            this.setState({ addManagerState: false })
        } else {
            this.setState({ addManagerState: true })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault()
        var data = {
            username: this.state.name,
            contact_number: this.state.contactNumber,
            email: this.state.email,
            password: Config.password,
            site_code: this.state.site_code,
            site_location: this.state.site_location,
            role: 1
        }
        console.log(data);
        // alert(JSON.stringify(data))
        const result = await ADMIN.register_site_manager(data)
        await console.log(result);
        if (result.code == 200) {
            Config.setToast("Successfully Registed")
            this.props.history.push("/admin/sitemanagers");
        } else {
            Config.setErrorToast("Someting went wrong")
            this.props.history.push("/admin/sitemanagers");
        }
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
        const res = await ADMIN.get_all_site_managers()
        console.log(res);
        this.setState({
            site_managers_arry: res.data.data
        })
      await  this.setState({
            loading: false,
        });
    }
    render() {
        const { name, contactNumber, email, site_code, site_location } = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"sitemanagers"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                    <Loader show={this.state.loading} />
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Site Managers Managment
                                <span className="badge badge-success mx-2  " style={{ cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add Site</span>
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
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
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2 ">Site Location *</h6>
                                                <input
                                                    type="text"
                                                    name="site_location"
                                                    placeholder="Galle - Main Street"
                                                    value={site_location}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2 ">Site Code *</h6>
                                                <input
                                                    type="text"
                                                    name="site_code"
                                                    placeholder="GL0156"
                                                    value={site_code}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" onClick={() => this.clear()} className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" >
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"   >
                                                        Add Site
                                                </button>
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
                                        All Sites 
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Join Date</th>
                                                    <th scope="col">Site Code</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.site_managers_arry && this.state.site_managers_arry.map(item => this.display_all_site_managers(item))}
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
    display_all_site_managers = data_arry => {
        return (
            <tr key={data_arry._id}>
                <td> {data_arry.username}</td>
                <td> {data_arry.email}</td>
                <td> {data_arry.contact_number}</td>
                <td> {data_arry.site_code}</td>
                <td>
                    <button className="btn btn-success btn-sm px-2 mr-2">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <a className="btn btn-info btn-sm px-2 mr-2" href={`mailto:${data_arry.email}`}  >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </td>
            </tr>
        );
    }
}
export default withRouter(Sites);