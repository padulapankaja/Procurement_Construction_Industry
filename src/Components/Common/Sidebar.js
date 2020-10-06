/*  eslint-disable */
import React from "react";
// import { SignOut } from "../actions/authActions";
import "../asserts/sidebar.css";
import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_toggle: false,
        };
    }

    signoutuser = () => {
        alert('Log Out')
        // const role = this.props.auth.user.type;
        // const isadmin = (role && role == "admin") ? true : false
        // this.props.SignOut && this.props.SignOut();
        // this.props.history.push(isadmin ? "/admin" : "/manager");
    };

    render() {
        const { side_bar_toggle } = this.state;
        // const { active } = 'dashboard';
        const { active } = this.props;
        // const role = this.props.auth.user.type;
        // const isadmin = (role && role == "admin") ? true : false
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
                                    Admin
                                        {/* {role && role.length > 1 && 
                                    role[0].toUpperCase() + role.substring(1)}  */}
                                </h6>
                                <span className="small text-light ">
                                    padula@gmail.com
                                    {/* {this.props.auth.user.email} */}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar">
                        <li className="listitem" className={`listitem ${active == 'dashboard' && 'active_category'}`}>
                            <Link to="/admin/dashboard">
                                <h6 className={`categorylink px-2 ${active == 'dashboard' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mx-3 sidebar-icon"></FontAwesomeIcon>Dashboard
                                </h6></Link>
                        </li>

                        <li className="listitem" className={`listitem ${active == 'sitemanagers' && 'active_category'}`}>
                            <Link to="/admin/sitemanagers">
                                <h6 className="categorylink px-2">
                                    <FontAwesomeIcon icon={faUser} className="mx-3 sidebar-icon"></FontAwesomeIcon>Site Managers
                                </h6></Link>
                        </li>
                        <Link to="/admin/suppliers">
                            <li className={`listitem ${active == 'suppliers' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'suppliers' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faTags} className="mx-3 sidebar-icon"></FontAwesomeIcon>Suppliers
                                </h6>
                            </li>
                        </Link>
                        <Link to="/admin/orders">
                            <li className={`listitem ${active == 'add_products' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'add_products' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faPlusSquare} className="mx-3 sidebar-icon"></FontAwesomeIcon>Orders
                                </h6>
                            </li>
                        </Link>
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
export default (AdminSidebar);
