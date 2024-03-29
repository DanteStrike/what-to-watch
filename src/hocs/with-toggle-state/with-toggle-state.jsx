import React from "react";
import {updateObject} from "../../utils/object/object";

const withToggleState = (
    stateName,
    stateInitValue,
    stateToggleName
) => (WrappedComponent) => {
  class WithToggleState extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [stateName]: stateInitValue
      };

      this._toggleState = this._toggleState.bind(this);
    }

    _toggleState() {
      this.setState((prevState) => updateObject(prevState, {[stateName]: !prevState[stateName]}));
    }

    render() {
      const hocProps = {
        [stateName]: this.state[stateName],
        [stateToggleName]: this._toggleState
      };

      return (
        <WrappedComponent
          {...this.props}
          {...hocProps}
        />
      );
    }
  }

  WithToggleState.propTypes = {};

  return WithToggleState;
};

export default withToggleState;
