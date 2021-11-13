import * as React from 'react';
import { render } from 'react-dom';
import {
  ControlledWindow,
  DragArea,
  useWindow,
  WindowState,
  Vector,
} from '../../src';

const Size = () => {
  const { windowState } = useWindow();
  return <span>{JSON.stringify(windowState)}</span>;
};

const initialState: WindowState = {
  top: 100,
  left: 100,
  height: 300,
  width: 300,
};

const App: React.FC = () => {
  const [state, setState] = React.useState<WindowState>(initialState);

  const onMove = (diff: Vector) => {
    setState((state) => ({
      ...state,
      top: state.top - diff.y,
      left: state.left - diff.x,
    }));
  };

  const onResize = (diff: WindowState) => {
    setState((state) => ({
      height: state.height - diff.height,
      width: state.width - diff.width,
      top: state.top - diff.top,
      left: state.left - diff.left,
    }));
  };

  return (
    <div>
      <ControlledWindow state={state} onResize={onResize} onMove={onMove}>
        <Size />
        <DragArea className="dragarea" />
      </ControlledWindow>
    </div>
  );
};

render(<App />, document.getElementById('root'));
