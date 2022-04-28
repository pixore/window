import * as React from 'react';
import { State, Vector, WindowBaseProps } from '../types';
import { getBoundedState, noop } from '../utils';
import ControlledWindow from '../components/ControlledWindow';

interface Props extends WindowBaseProps {
  initialState: State;
  minState?: Partial<State>;
  maxState?: Partial<State>;
  onWindowChange?: (state: State) => void;
  children: React.ReactNode;
}

const defaultMinState: State = {
  top: -Infinity,
  left: -Infinity,
  width: 50,
  height: 50,
};

const defaultMaxState: State = {
  top: Infinity,
  left: Infinity,
  width: Infinity,
  height: Infinity,
};

const Window = (props: Props) => {
  const {
    onRequestedClose = noop,
    onWindowChange = noop,
    isResizeable = true,
    children,
    withBackdrop = false,
    initialState,
    className = '',
    closeInEscape = true,
  } = props;
  const minState = Object.assign(defaultMinState, props.minState);
  const maxState = Object.assign(defaultMaxState, props.maxState);
  const [state, setState] = React.useState(initialState || minState);

  const onResize = (diff: State) => {
    setState((state) => getBoundedState(minState, maxState, state, diff));
  };

  const handleOnDiff = (diff: Vector) => {
    setState((state) => {
      return getBoundedState(minState, maxState, state, {
        top: diff.y,
        left: diff.x,
        width: 0,
        height: 0,
      });
    });
  };

  React.useEffect(() => {
    onWindowChange(state);
  }, [state]);

  return (
    <ControlledWindow
      className={className}
      onMove={handleOnDiff}
      onResize={onResize}
      state={state}
      closeInEscape={closeInEscape}
      onRequestedClose={onRequestedClose}
      withBackdrop={withBackdrop}
      isResizeable={isResizeable}
    >
      {children}
    </ControlledWindow>
  );
};

export { useWindow } from './ControlledWindow';
export default Window;
