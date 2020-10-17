import React from 'react';
import { shallow } from 'enzyme';
import RejectOrders from '../Components/Orders/reject.order'
import AdminController from '../Components/Controller/Admin.controller'
describe('All Reject Orders  Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<RejectOrders />).find('div.pre_orders_us').exists()).toBe(true)
    })
})


describe('#get_all_reject_order() using Promises', () => {
    it('should load reject data', () => {
        return AdminController.get_all_orders()
            .then(data => {
                expect(data).toBeDefined()
                expect(data.data.data[0].current_state).toEqual('3')
            })
    })
})