import React from 'react';
import { mount, shallow } from 'enzyme';
import Wrapper from './Wrapper';

describe('<Wrapper />', () => {
  test('renders with correct className with mount', () => {
    const wrapper = mount(<Wrapper>Children here</Wrapper>);
    console.log(wrapper.debug());
    expect(wrapper.find('div').hasClass('wrapper')).toBeTruthy();
  });
  test('renders with correct className with shallow', () => {
    const wrapper = shallow(<Wrapper>Children here</Wrapper>);
    console.log(wrapper.debug());
    expect(wrapper.hasClass('wrapper')).toBeTruthy();
  });
})
