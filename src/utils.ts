import { State } from './types';

const getNumberBetween = (min: number, max: number, value: number): number => {
  return Math.min(max, Math.max(min, value));
};

const getBoundedState = (
  minState: State,
  maxState: State,
  state: State,
  diff: State,
): State => {
  const newTop = state.top - diff.top;
  const newLeft = state.left - diff.left;
  const newWidth = state.width - diff.width;
  const newHeight = state.height - diff.height;

  if (newTop === 0 && newLeft === 0 && newWidth === 0 && newHeight === 0) {
    return state;
  }

  const newState = {
    top: getNumberBetween(minState.top, maxState.top - newHeight, newTop),
    left: getNumberBetween(minState.left, maxState.left - newWidth, newLeft),
    width: getNumberBetween(minState.width, maxState.width, newWidth),
    height: getNumberBetween(minState.height, maxState.height, newHeight),
  };
  return newState;
};

const noop = () => undefined;

export { getBoundedState, noop };
