import React from 'react';
import { shallow } from 'enzyme';
import AllUsers from '../Components/Admin/Components/Sitemangers.Admin'
import AdminController from '../Components/Controller/Admin.controller'

describe('All Users  Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<AllUsers />).find('div.iser_i').exists()).toBe(true)
    })
})


describe('#get_all_users() using Promises', () => {
    it('should load user data', () => {
        return AdminController.get_all_site_users_details()
            .then(data => {
                expect(data).toBeDefined()
                expect(data.data.data[0].designation).toEqual('Site Manager')
            })
    })
})

