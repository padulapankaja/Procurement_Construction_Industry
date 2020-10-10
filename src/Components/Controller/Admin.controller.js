import Config from './Config.controller'
import Axios from 'axios'
class Admin {
    constructor() {
        this.api = {

            register_site_manager: "/api/users/signup",
            register_suppliers: "/api/users/signup",
            get_all_site_managers_api: "/api/users/sitemanagers",
        };
    }
    // sign in
    register_site_manager = (data) => {
        var requestData = {
            data
        }
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.post(`${Config.host}${Config.port}${this.api.register_site_manager}`, requestData);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    register_suppliers = (data) => {
        var requestData = {
            data
        }
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.post(`${Config.host}${Config.port}${this.api.register_suppliers}`, requestData);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_all_site_managers = () => {
     
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_all_site_managers_api}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
}

var obj = new Admin();
export default obj;
