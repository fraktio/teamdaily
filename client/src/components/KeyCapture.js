import { Component } from 'react';

const KEY_CODES = {
  ctrl: 'Control',
};

const getKeys = combination => {
  const parts = combination.split('+');

  return parts.map(key => {
    const keyState = { down: false };
    keyState.key = KEY_CODES[key] || key;

    return keyState;
  });
};

export default class KeyCapture extends Component {
  state = {
    combination: [],
  };

  combinationTraversal(keyState) {
    if (keyState.key === event.key) {
      keyState.down = !keyState.down;
    }

    return keyState;
  }

  componentDidMount() {
    // Make sure we are in browser
    if (!window && !window.document) {
      return;
    }

    this.setState({ combination: getKeys(this.props.combination) });

    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown = event => {
    const { combination } = this.state;

    const newCombinationState = combination.map(this.combinationTraversal);

    const keysDown = newCombinationState.filter(keyState => keyState.down);
    const shouldFire = keysDown.length > 0 && keysDown.length === combination.length;

    this.setState({ combination: newCombinationState }, () => {
      if (shouldFire) {
        this.props.onFire();
      }
    });
  };

  onKeyUp = event => {
    const { combination } = this.state;

    // Reset key state always on key up
    const newCombinationState = combination.map(keyState => {
      return {
        ...keyState,
        down: false,
      };
    });

    this.setState({ combination: newCombinationState });
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  render() {
    return null;
  }
}
