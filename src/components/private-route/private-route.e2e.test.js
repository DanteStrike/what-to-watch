import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";

import {PrivateRoute} from "./private-route";

Enzyme.configure({adapter: new Adapter()});

describe(`Component PrivateRoute should work correctly`, () => {
  it(`Should redirect and save referrer`, () => {
    const locationMock = {
      pathname: `/other`
    };
    const checkAuthMock = jest.fn();
    const MockComponent = () => <div/>;

    const component = mount(
        <Router>
          <PrivateRoute checkAuth={checkAuthMock} isAuth={false} component={MockComponent} location={locationMock}/>
        </Router>
    );

    expect(checkAuthMock).toHaveBeenCalledTimes(1);
    expect(component.find(`Redirect`)).toHaveLength(1);
    expect(component.find(`Redirect`).props().to).toEqual({
      pathname: `/login`,
      state: {
        referrer: `/other`,
      }
    });
  });

  it(`Should set referrer null correctly`, () => {
    const locationMock = {};
    const checkAuthMock = jest.fn();
    const MockComponent = () => <div/>;

    const component = mount(
        <Router>
          <PrivateRoute checkAuth={checkAuthMock} isAuth={false} component={MockComponent} location={locationMock}/>
        </Router>
    );

    expect(component.find(`Redirect`).props().to).toEqual({
      pathname: `/login`,
      state: {
        referrer: null,
      }
    });
  });
});
