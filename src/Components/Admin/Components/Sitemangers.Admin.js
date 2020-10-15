import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import Loader from '../Loading'
import { Modal } from 'react-bootstrap';
class SiteManagersAdmin extends Component {
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
            viewUser: '',
            showUserModal: false,
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


    get_all_site_managers = async () => {
        const res = await ADMIN.get_all_site_users_details()
        console.log(res);
        this.setState({
            site_managers_arry: res.data.data
        })
        await this.setState({
            loading: false,
        });
    }
    showViewUser(i) {
        var singleUser = this.state.site_managers_arry.filter(user => user._id == i);
        this.setState({
            showUserModal: true,
            viewUser: singleUser[0]
        })
    }

    render() {
        const { name, contactNumber, email, site_code, site_location, viewUser } = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"sitemanagers"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <Loader show={this.state.loading} />
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    User Managment
                                </h5>
                            </div>

                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        Users List
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Designation</th>
                                                    <th scope="col">Contact Number</th>
                                                    {/* <th scope="col">Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.site_managers_arry && this.state.site_managers_arry.map(item => this.display_all_site_managers(item))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* ---------------------------------------------------- */}
                            <Modal
                                size="md"
                                show={this.state.showUserModal}
                                centered
                                onHide={() => this.setState({ showUserModal: false })}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Manager Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><b>Name : </b> {viewUser.name}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><b>Contact Number  : </b> {viewUser.contact_number} </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><b>Email : </b>   {viewUser.email}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p><b>Site Location : </b>   {viewUser.site_location}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p><b>Site Code : </b>   {viewUser.site_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <center>
                                                <a className="btn btn-info btn-sm px-2 mr-2 mt-1" href={`mailto:${viewUser.email}`} >
                                                    <FontAwesomeIcon icon={faEnvelope} /> Send Email
                                                  </a>
                                            </center>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
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
                <td> {data_arry.designation} </td>
                <td> {data_arry.contact_number}</td>
                {/* { data_arry.site_code != "" ? <td> {data_arry.site_code} </td> :<td> <span className="badge badge-warning">Not Assign</span>  </td> } */}

                {/* <td>
                    <button className="btn btn-success btn-sm px-2 mr-2" onClick={() => this.showViewUser(data_arry._id)}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </td> */}
            </tr>
        );
    }
}
export default withRouter(SiteManagersAdmin);