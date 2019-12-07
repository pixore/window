import Window, { useWindow } from './components/Window';
import DragArea from './components/DragArea';
import Config from './contexts/Config';
import { State } from './types';

type WindowState = State;

export { Window, Config, DragArea, useWindow, WindowState };
export default Window;
