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
            address: '',
            site_code: '',
            site_manager: '',
            loading: true,
            site_managers_arry: [],
        };
        this.get_all_site_managers()
        this.get_all_sites()


    }
    formValueChange = (e) => {
        console.log(e.target.value);
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
        if (this.state.site_manager == "" | this.state.site_manager == null) {
            return Config.setErrorToast("Someting went wrong")
        }
        var data = {
            address: this.state.address,
            site_code: this.state.site_code,
            site_manager: this.state.site_manager,
        }
        ADMIN.add_site(data).then(result => {
            console.log(result);
            Config.setToast("Successfully Registed")
            this.props.history.push("/admin/sites");
        }).catch(err => {
            console.log(err);
            Config.setErrorToast("Someting went wrong")
            this.props.history.push("/admin/sites");
        })

    }
    clear = () => {
        this.setState({
            address: '',
            site_code: '',
        })
    }
    get_all_site_managers = async () => {
        const res = await ADMIN.get_all_site_managers()
        console.log(res);
        await this.setState({
            site_managers_arry: res.data.data,
        })
        await this.renderOptions()
        await this.setState({
            loading: false,

        });
    }

    get_all_sites = () => {
        ADMIN.get_all_sites().then(result => {
            this.setState({
                all_sites: result.data.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
    renderOptions() {

        return this.state.site_managers_arry.filter(user => user.site_code == "").map((dt, i) => {
            return (<option className="form-control" value={dt._id}> {dt.username}</option>)
        });
    }

    render() {
        const { address, site_code, site_manager } = this.state
        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"sitemanagers"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <Loader show={this.state.loading} />
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Site  Managment
                                <span className="badge badge-success mx-2  " style={{ cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add Site</span>
                                </h5>
                            </div>
                            <div className="col-12" style={{ display: this.state.addManagerState == true ? 'block' : 'none' }}>
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">Address *</h6>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Gall - Main Street"
                                                    value={address}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                                <h6 className="form-label py-2 mt-2">Site Code *</h6>
                                                <input
                                                    type="text"
                                                    name="site_code"
                                                    placeholder="GL152"
                                                    value={site_code}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label py-2">Site Manager *</h6>
                                                <select
                                                    name="site_manager"
                                                    value={site_manager}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required>
                                                    <option className="form-control" value=""> Select Site Manager</option>
                                                    {this.renderOptions()}
                                                </select>
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
                                                    <th scope="col">Site Code</th>
                                                    <th scope="col">Site Addreess</th>
                                                    <th scope="col">Site Manager</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.all_sites && this.state.all_sites.map(item => this.display_all_site_managers(item))}
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
        console.log(this.state.all_sites);
        return (
            <tr key={data_arry._id}>
                <td> {data_arry.site_code}</td>
                <td> {data_arry.address}</td>
                <td> {data_arry.site_manager.username}</td>
            </tr>
        );
    }
}
export default withRouter(Sites);