      /*  eslint-disable */
import React, { Component } from 'react';
import SideBar from '../../Common/Sidebar'
import Config from '../../Controller/Config.controller'
import {get_all_suppliers, insertItem , get_all_items , deleteItem } from '../../Controller/Items.controller'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenAlt, faEye, faEnvelope, faBan } from '@fortawesome/free-solid-svg-icons'
// import { config } from '@fortawesome/fontawesome-svg-core';

class AddItemsAdmin extends Component {
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
            supplierName:{},
        };
    }

    async componentDidMount() {
        this.load_data();
        this.load_items_data();
        
    }

    load_data = async () => {
        get_all_suppliers().then( results => {
            this.setState({supplierList: results.data.data});
            console.log("Supplier data",results.data.data);
        }
        ).catch( err=> {
            console.log(err);
        })
    }

    load_items_data = async () => {
        get_all_items().then( results => {
            this.setState({
                isLoaded: true,
                itemsList: results.data.data,
            });
            console.log("Items data",results);
        }
        ).catch( err=> {
            console.log(err);
        })
    }

    handleSelect = (event) => {
        if (event.target.value.length > 0) {
            let find = this.state.supplierList.find(e => e._id == event.target.value);
            this.setState({ supplier: { id: find._id, name: find.name } })
        } else {
            this.setState({ supplier: {} })
        }
    }


    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        var data = {
            item_id: this.state.item_id,
            item_name: this.state.item_name,
            description: this.state.description,
            price: this.state.price,
            // supplierName:this.state.supplier,
            password: Config.password,
        }
        insertItem(data).then( result => {
            if(result.status == 200 ){
                Config.setToast('Added Successfully!');
                this.load_items_data();
                this.clear();
                this.props.history.push("/admin/items")
                
            }else{
                Config.setErrorToast('Something Wrong Happend!');
            }
        })
        .catch( error => {
            console.log(error);
            Config.setErrorToast('Something Wrong Happend!');
        })
    
    }

    clear = () => {
        this.setState({
            item_name: '',
            item_id: '',
            description: '',
            price:'',
            password: Config.password,
        })
    }
    render() {
        const { item_id, description, item_name,price, supplier, supplierList , itemsList} = this.state

        return (
            <div className="bg-light wd-wrapper">
                <SideBar active={"Additems"} />

                <div className="wrapper-wx" >
                    <div className="container-fluid" >
                        <div className="row">
                        <div className="col-12">
                                <h6 className="text-dark bold-normal py-3 bg-white shadow-sm px-3 mt-3 rounded">
                                   Create New Items
                                </h6>
                            </div>
                            <div className="col-12" >
                                <div className="card border-0 shadow-sm rounded mt-2 bg-white pb-2">
                                    <form className=" py-2  px-3 additems"  onSubmit={(e) => this.onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <h6 className="form-label mb-2 mt-2">Item ID *</h6>
                                                <input
                                                    id="itemId"
                                                    type="text"
                                                    name="item_id"
                                                    placeholder="Enter Item ID"
                                                    value={item_id}
                                                    className="form-control" 
                                                    onChange={(e) => this.formValueChange(e)} required></input>

                                                <h6 className="form-label mb-2 mt-3">Description *</h6>
                                                <input
                                                    id="item_description"
                                                    type="text"
                                                    name="description"
                                                    placeholder="Enter Small Description"
                                                    value={description}
                                                    className="form-control" 
                                                    onChange={(e) => this.formValueChange(e)} required></input>

                                                    {/* <h6 className="form-label py-2">Supplier *</h6>
                                                        <select value={supplier.name} onChange={this.handleSelect}  className="form-control">
                                                        <option value="">Select a Supplier</option>
                                                    
                                                        {supplierList.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                        </select> */}
                                               
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="form-label mb-2 mt-2">Item Name *</h6>
                                                <input
                                                    id="item_name"
                                                    type="text"
                                                    name="item_name"
                                                    placeholder="Enter Item Name"
                                                    value={item_name}
                                                    className="form-control" 
                                                    onChange={(e) => this.formValueChange(e)} required></input>

                                                   <h6 className="form-label mb-2 mt-3">Price *</h6>
                                                <input
                                                   id="item_price"
                                                    type="text"
                                                    name="price"
                                                    placeholder="Enter Item Price"
                                                    value={price}
                                                    className="form-control" 
                                                    onChange={(e) => this.formValueChange(e)} required></input>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="d-flex">
                                                    <button type="submit" className="font-weight-bold px-2 btn btn-dark  btn-sm bold-normal"   >
                                                        Add New Item
                                                </button>
                                                    <button type="reset" onClick={() => this.clear()} className="font-weight-bold px-2 ml-2  btn btn-secondary  btn-sm bold-normal" >
                                                        Cancel
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* <button onClick={() => this.getAllManagers()}>Vee</button> */}
                            </div>
                            {/* ----------------------------------------------------------- */}
                        
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
                {/* <span className="badge badge-info rounded-0 bg-white text-success border border-secondary click font-weight-bold ">Edit</span> */}
                <span onClick={() => this.deleteItem(item)} className="badge badge-info rounded-0 bg-white text-danger border border-secondary click font-weight-bold ml-2">Delete</span>
            </td>
        </tr>
        );
    };

    renderSessions = () => {
        return [ 
        ...this.state.lectList.map( item => {
            return {
                label : `${item.name}`,
                value : item.name 
            }
        })]
    }


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
        // Config.setDeleteConfirmAlert('Delete' , 'Are you sure you want to delete this ? ' , 
        // () => this.deleted(item._id),
        // () => console.log('cancel'))
    }
  
    deleted = async (id) => {
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
    //   const res = await allocatlec_CONTROLLER.deleteStudent(id);
    //   if(res.status == 200){
    //     Config.setToast("Allocated Lecture Deleted Successfully");
    //       this.load_data();
    //   }else{
    //     Config.setToast(res.message);
    //   }
    }








}
export default AddItemsAdmin;