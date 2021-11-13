import Window, { useWindow } from './components/Window';
import DragArea from './components/DragArea';
import Config from './contexts/Config';
import { getBoundedState } from './utils';
import { State, Vector } from './types';
import ControlledWindow from './components/ControlledWindow';

type WindowState = State;

export {
  Window,
  Config,
  DragArea,
  useWindow,
  WindowState,
  ControlledWindow,
  getBoundedState,
  Vector,
};
export default Window;
