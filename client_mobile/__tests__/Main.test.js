// import { shallow } from 'enzyme';
import { expect } from 'chai';
// import React from 'react-native';
// import ReactDOM from 'react-dom';
// import Main from '../app/containers/Main';
// import renderer from 'react-test-renderer';
// import sinon from 'sinon';

import Native, {TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import React from 'react';
import Main from '../app/containers/Main';
import renderer from 'react-test-renderer';
// import ReactAddons from 'react/addons';
// var { createRenderer } = React.addons.TestUtils;

describe('Main', () => {

  it('should test that the test suite is working', function () {
    var test = true;
    expect(test).to.equal(true);
  })

  it('is a stateful class component', () => {
    expect(React.Component.isPrototypeOf(Main)).to.equal(true);
  });

  it('should render one Main component', () => {
    const wrapper = renderer.create(Main);
    expect(wrapper.find(<TextInput />)).to.equal(true);
  });

  it('should render an `.container-fluid`', () => {
    const wrapper = renderer.create(Main);
    expect(wrapper).toContain(<MapView.Marker />);
  });


  it('should render an h1 element', function () {
    const wrapper = renderer.create(Main);
    expect(wrapper.find('h1').length).to.equal(1);
  })

  it('should render an h1 element', function () {
    const wrapper = renderer.create(Main);
    expect(wrapper.find('h4').at(0).text()).to.equal('Valence.');
  })

  it('should ...', function () {
    var example = true;
    expect(example).to.equal(example);
  })

  it('should render correctly', () => {
    const tree = renderer.create(
      Main
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});