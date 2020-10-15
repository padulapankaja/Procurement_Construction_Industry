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
            site_managers_arry: res.data.data.filter( i => i.role != 0)
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
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                    Users Managment
                                </h6>
                            </div>

                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                 
                                    <div className="table-responsive px-3">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6 className="header">Name</h6></th>
                                                    <th scope="col"><h6 className="header">Email</h6></th>
                                                    <th scope="col"><h6 className="header">Contact No</h6></th>
                                                    <th scope="col"><h6 className="header">Designation</h6></th>
                                                    <th scope="col"><h6 className="header">Access Level</h6></th>
                                                    {/* <th scope="col">Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.site_managers_arry && 
                                                this.state.site_managers_arry.map(item => this.display_all_site_managers(item))}

                                                { this.state.loading && 
                                                    <td colSpan={5}><h6 className="text-dark normal text-center py-2">Loading...</h6></td>
                                                }
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
                <td><h6 className="text-dark normal">{data_arry.username}</h6></td>
                <td><h6 className="text-dark normal">{data_arry.email}</h6></td>
                <td><h6 className="text-dark normal">{data_arry.contact_number}</h6></td>
                <td><h6 className="text-dark normal">{data_arry.designation}</h6></td>
                <td><span className={`bg-${data_arry.role == 1 ? 'success' : 'info'} px-2 text-white rounded small`} >
                    {data_arry.role == 1 ? 'Mobile' : 'Web'}</span> </td>
               
            </tr>
        );
    }

    
}
export default withRouter(SiteManagersAdmin);