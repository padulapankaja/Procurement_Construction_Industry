      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import ADMIN from '../../Controller/Admin.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import Loader from '../Loading'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

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
        // console.log(e.target.value);
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
            // console.log(result);
            this.clear()
            this.get_all_sites()
            this.get_all_site_managers()
            this.renderOptions()
            Config.setToast("Successfully Added")

        }).catch(err => {
            // console.log(err);
            Config.setErrorToast("Someting went wrong")

        })

    }
    clear = () => {
        this.setState({
            address: '',
            site_code: '',
        })
    }
    get_all_site_managers = async () => {
        ADMIN.get_all_site_managers().then(response => {

            // console.log(response.data.data);
            this.setState({
                site_managers_arry: response.data.data,
            })
            // console.log(this.state.site_managers_arry);

        }).then(res => {
            this.renderOptions()
            // console.log(this.state.site_managers_arry);

        }).then(res => {

            this.setState({
                loading: false,

            });
        })

    }

    get_all_sites = () => {
        ADMIN.get_all_sites().then(result => {
            this.setState({
                all_sites: result.data.data
            })
        }).catch(err => {
            // console.log(err);
        })
    }

    renderOptions() {
        // console.log(this.state.site_managers_arry);
        return this.state.site_managers_arry.filter(user => user.site_code == "").map((dt, i) => {
            return (<option className="form-control" value={dt._id}> {dt.username}</option>)
        });
    }

    render() {
        const { address, site_code, site_manager } = this.state
        const role = this.props.auth.user.role;

        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"sites"} />
                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <Loader show={this.state.loading} />
                        <div className="row">
                        <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                   Site Management
                                </h6>
                            </div>
                            { role== 3 &&
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <form className=" py-2  px-3 " onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="form-label mb-2 mt-2">Address *</h6>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Site Address"
                                                    value={address}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                                <h6 className="form-label mb-2 mt-3">Site Code *</h6>
                                                <input
                                                    type="text"
                                                    name="site_code"
                                                    placeholder="Enter Side Code"
                                                    value={site_code}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mb-2 mt-2">Site Manager *</h6>
                                                <select
                                                    name="site_manager"
                                                    value={site_manager}
                                                    className="form-control" onChange={(e) => this.formValueChange(e)} required>
                                                    <option className="form-control" value=""> Select Site Manager</option>
                                                    {this.renderOptions()}

                                                </select>
                                                <br></br>
                                                <div className="d-flex mt-3">
                                                    <button type="submit" className="font-weight-bold px-2 btn btn-dark  btn-sm bold-normal"   >
                                                        Add Site
                                                </button>
                                                    <button type="reset" onClick={() => this.clear()} className="font-weight-bold px-2 ml-2  btn btn-secondary  btn-sm bold-normal" >
                                                        Cancel
                                                </button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>}
                            {/* ----------------------------------------------------------- */}
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6 className="header">ID</h6></th>
                                                    <th scope="col"><h6 className="header">Site Code</h6></th>
                                                    <th scope="col"><h6 className="header">Site Addreess</h6></th>
                                                    <th scope="col"><h6 className="header">Site Manager</h6></th>
                                                    <th scope="col"><h6 className="header">Actions</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.all_sites 
                                                && this.state.all_sites.map((item,i) => this.display_all_site_managers(item,i))}

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
    display_all_site_managers = (data_arry,i) => {
        // console.log(this.state.all_sites);
        return (
            <tr key={data_arry._id}>
                 <td><h6 className="text-dark normal">{("0" + (i+1)).slice(-2)}</h6></td>
                 <td><h6 className="text-dark normal">{data_arry.site_code}</h6></td>
                 <td><h6 className="text-dark normal">{data_arry.address}</h6></td>
                 <td><h6 className="text-dark normal">{data_arry.site_manager.username}</h6></td>
                 <td>
                 <Link to={`/admin/sites/${data_arry._id}`}>
                    <span className=" rounded py-1 px-2 bg-success text-white">
                    <FontAwesomeIcon icon={faEye} className="mr-1"/> Details
                    </span>
                    </Link>
                 </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(Sites));
