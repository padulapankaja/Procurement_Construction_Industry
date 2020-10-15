import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import {get_all_items , deleteItem } from '../../Controller/Items.controller'
import moment from 'moment'
class ItemsAdmin extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            supplierList:[],
            itemsList:[],
            supplier:{},
            item_id: '',
            description:'',
            item_name:'',
            price:'',
        
        };
    }

    async componentDidMount() {
        this.load_items_data();
        
    }

    load_items_data = async () => {
        get_all_items().then( results => {
            this.setState({
                isLoaded: true,
                itemsList: results.data.data,
            });
            console.log("Items data",results.data.data);
        }
        ).catch( err=> {
            console.log(err);
        })
    }


    render() {
        const {itemsList} = this.state

        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"items"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                    Items Management
                                </h6>
                            </div>
                  
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                 
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><h6 className="header">Item ID</h6></th>
                                                    <th scope="col"><h6 className="header">Item Name</h6></th>
                                                    <th scope="col"><h6 className="header">Description</h6></th>
                                                    <th scope="col"><h6 className="header">Price</h6></th>
                                                    <th scope="col"><h6 className="header">Actions</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {itemsList.map((item) => this.renderAllItems(item))}
                                            {!this.state.isLoaded &&
                                            <td colSpan={6}><h6 className="text-dark normal text-center py-2">Loading...</h6></td>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderAllItems = (item) => {
        return (
            <tr key={item._id}>
                <td><h6 className="text-dark normal">{item.item_id}</h6></td>
                <td><h6 className="text-dark normal">{item.item_name}</h6></td>
                <td><h6 className="text-dark normal">{item.description}</h6></td>
                <td><h6 className="text-dark normal">{`LKR ${item.price}.00`}</h6></td>
                
            
            
            <td>
                <span onClick={() => this.deleteItem(item)} className="badge badge-danger  click font-weight-bold ml-2">Remove</span>
            </td>
            </tr>
        );
    };


    deleteItem = item => {
        const id = item._id;
        deleteItem(id).then( result => {
            if(result.status == 200 ){
                Config.setToast("Item Deleted Successfully");
                this.load_items_data();
                
            }else{
                Config.setToast(result.message);
            }
        })
        .catch( error => {
            console.log(error);
            Config.setErrorToast('Something Wrong Happend!');
        })

    }
  
  








}
export default ItemsAdmin;