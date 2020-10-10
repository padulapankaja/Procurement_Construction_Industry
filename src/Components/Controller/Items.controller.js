import axios from "axios";
import Config from "./Config.controller";

//insert an item
export const insertItem = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/items/create` , data)
            .then( result => {
                if(result.status == 200){
                    resolve({...result.data , status : 200})
               }else{
                resolve({ status : result.status })
               }
            })
            .catch( err => {
                reject(err);
            })
    })
}

//get all items
export const get_all_items = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/items/get_all`)
            .then( result => {
               if(result.status == 200){
                    resolve(result)
               }else{
                   
                resolve([])
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}
//get all suppliers
export const get_all_suppliers = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/suppliers/get`)
            .then( result => {
               if(result.status == 200){
                    resolve(result)
               }else{
                   
                resolve({status : result.status})
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}

//delete an item
export const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
      return axios
        .delete(`${Config.host}${Config.port}/api/items/delete/${id}`)
        .then((result) => {
          resolve({ code: 200, message: result.data.message });
        })
        .catch((err) => {
          reject({ code: 0, error: err });
        });
    });
  };