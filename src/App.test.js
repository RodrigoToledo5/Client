/* eslint-disable jest/valid-expect */
import { configure, shallow } from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "../src/App"
const { expect } = require("chai")


configure({adapter: new Adapter()});

describe('App', () => {
  let wrapper = shallow(<App/>)
    it("should be a function", () => {
      expect(App).to.be.a("function")
    })
    it("should render a route", () => {
      expect(wrapper.find('route'));
    }) 
})