import Config from './Config.controller'
import Axios from 'axios'
class Admin {
    constructor() {
        this.api = {

            register_site_manager: "/api/register/sitemanager",
            register_suppliers: "/api/register/suppliers",
        };
    }
    // sign in
    register_site_manager = (data) => {
        var requestData = {
            data
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.register_site_manager}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
    register_suppliers = (data) => {
        var requestData = {
            data
        }
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.register_suppliers}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
}

var obj = new Admin();
export default obj;
