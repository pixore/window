import { State } from './types';

const getNewState = (minimalState: State, state: State, diff: State): State => {
  const newTop = state.top - diff.top;
  const newLeft = state.left - diff.left;
  const newWidth = state.width - diff.width;
  const newHeight = state.height - diff.height;

  const newState = {
    top: newTop >= minimalState.top ? newTop : minimalState.top,
    left: newLeft >= minimalState.left ? newLeft : minimalState.left,
    width: newWidth >= minimalState.width ? newWidth : minimalState.width,
    height: newHeight >= minimalState.height ? newHeight : minimalState.height,
  };
  return newState;
};

export { getNewState };
