import Config from './Config.controller'
import Axios from 'axios'
class Admin {
    constructor() {
        this.api = {

            register_site_manager: "/api/users/signup",
            register_suppliers: "/api/users/signup",
            get_all_site_managers_api: "/api/users/sitemanagers",
            add_site: "/api/sites/create",
            all_sites: "/api/sites/get_all",
        };
    }
    // sign in
    register_site_manager = (data) => {
        var requestData = {
            data
        }
        console.log(requestData);
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.register_site_manager}`, requestData)
                .then(result => {
                    if (result.code == 200) {
                        resolve({ code: 200, data: result.data })
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {

                    reject({ code: err.response.status, error: err })
                })
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
    get_all_sites = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.all_sites}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    add_site = (data) => {
        var requestData = {
            data
        }
        console.log(data);
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.post(`${Config.host}${Config.port}${this.api.add_site}`, requestData);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
}

var obj = new Admin();
export default obj;
