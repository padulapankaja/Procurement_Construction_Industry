import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import {get_all_items , deleteItem } from '../../Controller/Items.controller'

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
                                <h5 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                    Items Managment
                                {/* <span className="badge badge-success mx-2  " style={{ cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Item</span> */}
                                </h5>
                            </div>
                  
                            <div className="col-12">
                                <div className="card border-0 shadow-sm rounded mt-3 bg-white pb-2">
                                    <h5 className="text-dark bold-normal py-2 bg-white px-2">
                                        Items List
                                </h5>
                                    <div className="table-responsive px-2">
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Item ID</th>
                                                    <th scope="col">Item Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {itemsList.map((item) => this.renderAllItems(item))}
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
            <td>{item.item_id}</td>
            <td>{item.item_name}</td>
            <td>{item.description}</td>
            <td>{item.price}.00</td>
            <td>
                <span onClick={() => this.deleteItem(item)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span>
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