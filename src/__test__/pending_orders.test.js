import React from 'react';
import { shallow } from 'enzyme';
import PendingdOrders from '../Components/Orders/pending.order'
import AdminController from '../Components/Controller/Admin.controller'
describe('All Users  Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<PendingdOrders />).find('div.pending_orders_us').exists()).toBe(true)
    })
})


describe('#get_all_order() using Promises', () => {
    it('should load orders data', () => {
        return AdminController.get_all_orders()
            .then(data => {
                expect(data).toBeDefined()
                expect(data.data.data[0].current_state).toEqual('3')
            })
    })
})