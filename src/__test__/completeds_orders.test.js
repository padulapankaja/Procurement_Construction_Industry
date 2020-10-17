import React from 'react';
import { shallow } from 'enzyme';
import CompletdOrders from '../Components/Orders/approved.order'
import AdminController from '../Components/Controller/Admin.controller'

describe('All Compeletd  Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<CompletdOrders />).find('div.approved_orders_us').exists()).toBe(true)
    })
})


describe('#get_all_comleted_order() using Promises', () => {
    it('should load orders data', () => {
        return AdminController.get_all_orders()
            .then(data => {
                expect(data).toBeDefined()
                expect(data.data.data[0].current_state).toEqual('3')
            })
    })
})