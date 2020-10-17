import React from 'react';
import { shallow } from 'enzyme';
import Supliers from '../Components/Admin/Components/Suplier.Admin'

describe('Create Supliers Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<Supliers />).find('form.supliers').exists()).toBe(true)
    })
})


it('Supliers  Input', () => { expect(shallow(<Supliers />).find('#s_name').length).toEqual(1) });
it('Email Address Input', () => { expect(shallow(<Supliers />).find('#s_email').length).toEqual(1) });
it('Contact No Input', () => { expect(shallow(<Supliers />).find('#c_number').length).toEqual(1) });
it('Address Input', () => { expect(shallow(<Supliers />).find('#s_address').length).toEqual(1) });




describe('Supplier Name ', () => {
    it('should respond to change event and change the state of the Suppliers  Component', () => {
        {
            const wrapper = shallow(<Supliers />);
            wrapper.find('#s_name').simulate('change',
                {
                    target:
                        { name: 'name', value: 'Padula Pankaja Guruge' }
                });
            expect(wrapper.state('name')).toEqual('Padula Pankaja Guruge');
        }
    })
})
describe('Suppliers Email Address ', () => {
    it('should respond to change event and change the state of the Suppliers  Component', () => {
        {
            const wrapper = shallow(<Supliers />);
            wrapper.find('#s_email').simulate('change',
                {
                    target:
                        { name: 'email', value: 'pad@gmail.com' }
                });
            expect(wrapper.state('email')).toEqual('pad@gmail.com');
        }
    })
})
describe('Adddress  No', () => {
    it('should respond to change event and change the state of the Suppliers  Component', () => {
        {
            const wrapper = shallow(<Supliers />);
            wrapper.find('#s_address').simulate('change',
                {
                    target:
                        { name: 'address', value: 'Lorem Ipsum Address' }
                });
            expect(wrapper.state('address')).toEqual('Lorem Ipsum Address');
        }
    })
})
describe('Contact  No', () => {
    it('should respond to change event and change the state of the Suppliers  Component', () => {
        {
            const wrapper = shallow(<Supliers />);
            wrapper.find('#c_number').simulate('change',
                {
                    target:
                        { name: 'contactNumber', value: '0714569058' }
                });
            expect(wrapper.state('contactNumber')).toEqual('0714569058');
        }
    })
})

