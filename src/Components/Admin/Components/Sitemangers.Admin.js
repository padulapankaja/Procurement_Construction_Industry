import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope , faBan} from '@fortawesome/free-solid-svg-icons'

class SiteManagersAdmin extends Component {
    constructor() {
        super();
        this.state = {
            addManagerState: false,
            name: '',
            contactNumber: '',
            email: '',
            password: Config.password,



        };
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
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            password: Config.password,
        }
        console.log(data);
        alert(JSON.stringify(data))
        // const result = await ADMIN.register_site_manager(data)
        // console.log(result);
    }

    clear = () => {
        this.setState({
            name: '',
            contactNumber: '',
            email: '',
            password: Config.password,
        })
    }
    render() {
        const { name, contactNumber, email } = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"sitemanagers"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Site Managers Managment
                                <span className="badge badge-success mx-2  " style={{ cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add Manager</span>
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
                                                    name="contactNumber"
                                                    placeholder="Galle - Main Street"
                                                    value={contactNumber}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                            </div>
                                            <div className="col-md-6">
                                            <h6 className="form-label py-2 ">Site Code *</h6>
                                                <input
                                                    type="text"
                                                    name="contactNumber"
                                                    placeholder="GL0156"
                                                    value={contactNumber}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>

                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="reset" onClick={() => this.clear()} className="px-2 btn btn-secondary  btn-sm bold-normal ml-auto" >
                                                        Cancel
                                                </button>
                                                    <button type="submit" className="px-2 btn btn-dark  btn-sm bold-normal ml-2"   >
                                                        Add Manager
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
                                        All Site Managers
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Join Date</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >

                                                    <td><b>Saman Kumar</b></td>
                                                    <td>samankumara@gmail.com</td>
                                                    <td>{moment(new Date("2020-05-06")).format('YYYY MMM DD')}</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm px-2 mr-2">
                                                            <FontAwesomeIcon icon={faBan} />
                                                        </button>
                                                        <a className="btn btn-info btn-sm px-2 mr-2" href={`mailto:samankumara@gmail.com`}  >
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </a>
                                                    </td>
                                                </tr>
                                                {/* {managers.map(item => this.displayAllManagers(item))} */}
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
export default SiteManagersAdmin;