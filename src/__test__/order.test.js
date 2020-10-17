import React from 'react';
import { shallow } from 'enzyme';
import Order from '../Components/Admin/Components/Order.Admin'

describe('Order Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<Order />).find('form.ordersearch').exists()).toBe(true)
    })
})


it('Supliers  Input', () => { expect(shallow(<Order />).find('#s_name').length).toEqual(1) });
it('Email Address Input', () => { expect(shallow(<Order />).find('#s_site_manager').length).toEqual(1) });



