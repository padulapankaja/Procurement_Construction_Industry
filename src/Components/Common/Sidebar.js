/*  eslint-disable */
import React from "react";
import "../asserts/sidebar.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { SignOut } from "../Redux/Action/authAction";

import {
    faUser,
    faEnvelopeSquare,
    faBars,
    faTags,
    faBarcode,
    faClipboardCheck,
    faGift,
    faPlusSquare,
    faTachometerAlt,
    faComment,
    faHome,
    faUserSecret,
    faUsers,
    faSuitcase,
    faSignOutAlt,
    faIgloo,
    faTimes,
    faSitemap,
    faPlus,
    faSort,
    faHourglassHalf,
    faCheck,
    faUserPlus,
    faTruck,
    faThList
} from "@fortawesome/free-solid-svg-icons";

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_toggle: false,
            addSuplierState: false,
        };
    }

    signoutuser = () => {

        const role = this.props.auth.user.role;
        const isadmin = (role && (role == 3 || role == 1 || role == 2 || role == 0)) ? true : false
        this.props.SignOut && this.props.SignOut();
        this.props.history.push(isadmin ? "/" : "/");
    };

    change_toggle = () => {
        if (this.state.addSuplierState) {
            this.setState({ addSuplierState: false })
        } else {
            this.setState({ addSuplierState: true })
        }
    }

    render() {
        const { side_bar_toggle } = this.state;
        // const { active } = 'dashboard';
        const { active } = this.props;
        const role = this.props.auth.user.role;
        var role_name = "";
        if (role == 1)
            role_name = "Site Manager"
        else if (role == 2)
            role_name = "Accountant"
        else if (role == 3)
            role_name = "Management"
        else if (role == 0)
            role_name = "supplier"
        console.log("Users role", role);


        return (
            <>
                <nav className="navbar navbar-dark bg-dark py-0 shadow-sm  fixed-top">
                    <span className="navbar-brand mb-0 h6 text-light ml-2">Dashboard
                         <FontAwesomeIcon onClick={() => this.setState({ side_bar_toggle: !this.state.side_bar_toggle })} icon={faBars} className="ml-4 click show-icon"></FontAwesomeIcon> </span>
                </nav>
                <div className={`sidebar_wrap sidebar-top ${side_bar_toggle ? 'sidebar_active' : ''}`}>
                    <div className="sidebar-header pb-4 pt-2">
                        <div className="d-flex px-4">
                            <img src="https://www.iconfinder.com/data/icons/user-pictures/100/male3-512.png" className="rounded-circle sidebar-image my-auto"></img>
                            <div className="my-auto">
                                <h6 style={{ lineHeight: '12px', fontWeight: 600 }}
                                    className={`text-white mb-0 mt-1`}>
                                    {role_name}
                                </h6>
                                <span className="small text-light ">
                                    {this.props.auth.user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar">
                        {role == 2 || role == 3 &&
                            <li className="listitem" className={`listitem ${active == 'dashboard' && 'active_category'}`}>
                                <Link to="/admin/dashboard">
                                    <h6 className={`categorylink px-2 ${active == 'dashboard' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faTachometerAlt} className="mx-3 sidebar-icon"></FontAwesomeIcon>Dashboard
                             </h6></Link>
                            </li>

                        }
                        <Link to="/admin/pending">
                            <li className={`listitem ${active == 'createUser' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'createUser' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faHourglassHalf} className="mx-3 sidebar-icon"></FontAwesomeIcon>Pending Orders
                                </h6>
                            </li>
                        </Link>
                        <Link to="/admin/completed">
                            <li className={`listitem ${active == 'createUser' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'createUser' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faCheck} className="mx-3 sidebar-icon"></FontAwesomeIcon>Completed Orders
                                </h6>
                            </li>
                        </Link>
                        {role == 2 || role == 3 &&
                            <li className="listitem" className={`listitem ${active == 'userManagement' && 'active_category'}`}>
                                <Link to="/admin/sitemanagers">
                                    <h6 className="categorylink px-2">
                                        <FontAwesomeIcon icon={faUser} className="mx-3 sidebar-icon"></FontAwesomeIcon>User Management
                                </h6></Link>
                            </li>
                        }
                        {role == 3 &&
                            <Link to="/admin/createUser">
                                <li className={`listitem ${active == 'createUser' && 'active_category'}`}>
                                    <h6 className={`categorylink px-2 ${active == 'createUser' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faUserPlus} className="mx-3 sidebar-icon"></FontAwesomeIcon>Create User
                                </h6>
                                </li>
                            </Link>
                        }
                        {role == 2 || role == 3 &&
                            <Link to="/admin/suppliers">
                                <li className={`listitem ${active == 'suppliers' && 'active_category'}`}>
                                    <h6 className={`categorylink px-2 ${active == 'suppliers' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faTruck} className="mx-3 sidebar-icon"></FontAwesomeIcon>Suppliers
                                </h6>
                                </li>
                            </Link>
                        }
                        {role == 2 || role == 3 &&
                            <Link to="/admin/sites">
                                <li className={`listitem ${active == 'sites' && 'active_category'}`}>
                                    <h6 className={`categorylink px-2 ${active == 'suppliers' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faSuitcase} className="mx-3 sidebar-icon"></FontAwesomeIcon>Sites
                                </h6>
                                </li>
                            </Link>
                        }
                        {role == 2 || role == 3 &&
                            <Link to="/admin/items">
                                <li className={`listitem ${active == 'items' && 'active_category'}`}>
                                    <h6 className={`categorylink px-2 ${active == 'items' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faThList} className="mx-3 sidebar-icon"></FontAwesomeIcon>Items List
                                </h6>
                                </li>
                            </Link>
                        }
                        {role == 2 || role == 3 &&
                            <Link to="/admin/AddItem">
                                <li className={`listitem ${active == 'Additems' && 'active_category'}`}>
                                    <h6 className={`categorylink px-2 ${active == 'Additems' && 'active_category'}`}>
                                        <FontAwesomeIcon icon={faBarcode} className="mx-3 sidebar-icon"></FontAwesomeIcon>Add Items
                                </h6>
                                </li>
                            </Link>
                        }
                        <li onClick={() => this.signoutuser()} className={`listitem click`}>
                            <h6 className={`categorylink px-2 `}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="mx-3 sidebar-icon"></FontAwesomeIcon>Logout
                             </h6>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

const mapDispatchToProps = {
    SignOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminSidebar));
