import React from 'react';
import { shallow } from 'enzyme';
import CreateUser from '../Components/Admin/Components/createUser.Admin'

describe('Create Users Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<CreateUser />).find('form.createUsers').exists()).toBe(true)
    })
})


it('Username  Input', () => { expect(shallow(<CreateUser />).find('#user_name').length).toEqual(1) });
it('Email Address Input', () => { expect(shallow(<CreateUser />).find('#user_email').length).toEqual(1) });
it('Contact No Input', () => { expect(shallow(<CreateUser />).find('#user_contact').length).toEqual(1) });



describe('Username ', () => {
    it('should respond to change event and change the state of the Create User  Component', () => {
        {
            const wrapper = shallow(<CreateUser />);
            wrapper.find('#user_name').simulate('change',
                {
                    target:
                        { name: 'name', value: 'Padula Pankaja Guruge' }
                });
            expect(wrapper.state('name')).toEqual('Padula Pankaja Guruge');
        }
    })
})
describe('Email Address ', () => {
    it('should respond to change event and change the state of the Create User  Component', () => {
        {
            const wrapper = shallow(<CreateUser />);
            wrapper.find('#user_email').simulate('change',
                {
                    target:
                        { name: 'email', value: 'pad@gmail.com' }
                });
            expect(wrapper.state('email')).toEqual('pad@gmail.com');
        }
    })
})
describe('Contact No', () => {
    it('should respond to change event and change the state of the Create User  Component', () => {
        {
            const wrapper = shallow(<CreateUser />);
            wrapper.find('#user_contact').simulate('change',
                {
                    target:
                        { name: 'contactNumber', value: '0714598265' }
                });
            expect(wrapper.state('contactNumber')).toEqual('0714598265');
        }
    })
})

