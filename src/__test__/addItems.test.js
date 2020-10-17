import React from 'react';
import { shallow } from 'enzyme';
import AddItems from '../Components/Admin/Components/addItems.Admin'


describe('Add Items Component', () => {
    it('Should be render without throwing an error', () => {
        expect(shallow(<AddItems />).find('form.additems').exists()).toBe(true)
    })
})

it('Item Id Input', () => { expect(shallow(<AddItems />).find('#itemId').length).toEqual(1) });
it('Item Description Input', () => { expect(shallow(<AddItems />).find('#item_description').length).toEqual(1) });
it('Item Name Input', () => { expect(shallow(<AddItems />).find('#item_name').length).toEqual(1) });
it('Item Price Input', () => { expect(shallow(<AddItems />).find('#item_price').length).toEqual(1) });


describe('Item ID', () => {
    it('should respond to change event and change the state of the Add Item Component', () => {
        {
            const wrapper = shallow(<AddItems />);
            wrapper.find('#itemId').simulate('change',
                {
                    target:
                        { name: 'item_id', value: 'D123' }
                });
            expect(wrapper.state('item_id')).toEqual('D123');
        }
    })
})

describe('Item Name', () => {
    it('should respond to change event and change the state of the Add Item Component', () => {
        {
            const wrapper = shallow(<AddItems />);
            wrapper.find('#item_name').simulate('change',
                {
                    target:
                        { name: 'item_name', value: 'Cables' }
                });
            expect(wrapper.state('item_name')).toEqual('Cables');
        }
    })
})
describe('Item Price', () => {
    it('should respond to change event and change the state of the Add Item Component', () => {
        {
            const wrapper = shallow(<AddItems />);
            wrapper.find('#item_price').simulate('change',
                {
                    target:
                        { name: 'price', value: '2500' }
                });
            expect(wrapper.state('price')).toEqual('2500');
        }
    })
})
describe('Item Description', () => {
    it('should respond to change event and change the state of the Add Item Component', () => {
        {
            const wrapper = shallow(<AddItems />);
            wrapper.find('#item_description').simulate('change',
                {
                    target:
                        { name: 'description', value: 'lorem ipsum lorem ipsum' }
                });
            expect(wrapper.state('description')).toEqual('lorem ipsum lorem ipsum');
        }
    })
})

