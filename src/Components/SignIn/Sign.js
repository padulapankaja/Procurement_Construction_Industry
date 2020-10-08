import React, { Component } from 'react';

import '../asserts/signin/css/main.css'
import '../asserts/signin/css/util.css'
import img_1 from '../asserts/signin/img/img-01.png'
import { setCurrentUser } from "../Redux/Action/authAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CommonController from '../Controller/Common.controller'
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.username);
        console.log(this.state.password);

        const result = await CommonController.common_sign(this.state.username, this.state.password)
        console.log(result);
        if(result.code == 200){
            this.props.setCurrentUser(result.data.data);
            this.props.history.push("/admin/dashboard");
        }
      

    }
    clear = () => {
        this.setState({
            username: '',
            password: ''
        })
    }
    render() {
        const { username, password } = this.state
        return (
            <div className="container-fluid">
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt>
                                <img src={img_1} alt="IMG" />
                            </div>
                            <form className="login100-form validate-form" onSubmit={(e) => this.onSubmit(e)}>
                                <span className="login100-form-title">
                                    Member Login
                            </span>
                                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <input className="input100" type="text" name="username" value={username} placeholder="Enter Username" onChange={(e) => this.formValueChange(e)} required />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" name="password" value={password} placeholder="Enter Password" onChange={(e) => this.formValueChange(e)} required />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { setCurrentUser })(withRouter(SignIn));
