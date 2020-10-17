import Config from './Config.controller'
import Axios from 'axios'
class Admin {
    constructor() {
        this.api = {

            register_site_manager: "/api/users/register",
            register_suppliers: "/api/suppliers/add",
            get_all_site_managers_api: "/api/users/sitemanagers",
            get_all_site_users_api: "/api/users/all",
            get_all_supliers_api: "/api/suppliers/get",
            get_all_orders: "/api/orders/get_all",
            get_single_order: "/api/orders/get_one/",
            add_site: "/api/sites/create",
            update_state: "/api/orders/update_state",
            all_sites: "/api/sites/get_all",
            all_stats: "/api/stats/all",
            by_month: "/api/stats/latest",
            get_order_by_site_id : "/api/orders/getbysite",
            get_single_site : "/api/sites/getone",
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

        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.post(`${Config.host}${Config.port}${this.api.register_suppliers}`, data);
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
    get_all_suppliers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_all_supliers_api}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_all_site_users_details = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_all_site_users_api}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_all_orders = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_all_orders}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_single_order = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_single_order}${id}`,);
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
    get_all_stats = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.all_stats}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_all_stats_by_months = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.by_month} `);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_order_by_site_id = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_order_by_site_id}/${id}`);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
    get_single_site = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.get(`${Config.host}${Config.port}${this.api.get_single_site}/${id}`);
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

    update_state = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Axios.patch(`${Config.host}${Config.port}${this.api.update_state}`, data);
                resolve({ code: 200, data: result.data });
            } catch (err) {
                reject({ code: 0, error: err });
            }
        })
    }
}

var obj = new Admin();
export default obj;
