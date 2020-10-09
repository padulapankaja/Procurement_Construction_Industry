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
    faIgloo
} from "@fortawesome/free-solid-svg-icons";

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_toggle: false,
        };
    }

    signoutuser = () => {

        const role = this.props.auth.user.role;
        const isadmin = (role && (role == 3 || role == 1 || role == 2 || role == 0)) ? true : false
        this.props.SignOut && this.props.SignOut();
        this.props.history.push(isadmin ? "/" : "/");
    };

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
                                    {role_name}
                                    {/* {role && role.length > 1 && 
                                    role[0].toUpperCase() + role.substring(1)}  */}
                                </h6>
                                <span className="small text-light ">
                                    {this.props.auth.user.email}
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
                            <li className={`listitem ${active == 'orders' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'orders' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faPlusSquare} className="mx-3 sidebar-icon"></FontAwesomeIcon>Orders
                                </h6>
                            </li>
                        </Link>
                        <Link to="/admin/items">
                            <li className={`listitem ${active == 'items' && 'active_category'}`}>
                                <h6 className={`categorylink px-2 ${active == 'items' && 'active_category'}`}>
                                    <FontAwesomeIcon icon={faPlusSquare} className="mx-3 sidebar-icon"></FontAwesomeIcon>Items
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

const mapStateToProps = (state) => ({
    auth: state.auth || {},
});

const mapDispatchToProps = {
    SignOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminSidebar));
