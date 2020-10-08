import Config from './Config.controller'
import Axios from 'axios'

class Common {
    constructor() {
        this.api = {
            signin: "/api/users/signin",
        };
    }
    // sign in
    common_sign = (username, password) => {
        var requestData = {
            username: username,
            password: password
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.signin}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }




}

var obj = new Common();
export default obj;
