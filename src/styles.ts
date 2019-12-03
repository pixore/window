import { ResizeBarTypes } from './types';

const defaultBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'auto',
};

const defaultWindowStyle: React.CSSProperties = {
  position: 'fixed',
  overflow: 'hidden',
};

const defaultResizeBarStyle: React.CSSProperties = {
  position: 'absolute',
};

interface Styles {
  [ResizeBarTypes.TOP]: React.CSSProperties;
  [ResizeBarTypes.BOTTOM]: React.CSSProperties;
  [ResizeBarTypes.LEFT]: React.CSSProperties;
  [ResizeBarTypes.RIGHT]: React.CSSProperties;
  [ResizeBarTypes.TOP_LEFT]: React.CSSProperties;
  [ResizeBarTypes.TOP_RIGHT]: React.CSSProperties;
  [ResizeBarTypes.BOTTOM_LEFT]: React.CSSProperties;
  [ResizeBarTypes.BOTTOM_RIGHT]: React.CSSProperties;
}
const barSize = 3;
const defaultResizeStylesByType: Styles = {
  [ResizeBarTypes.TOP]: {
    top: 0,
    left: 0,
    width: '100%',
    height: barSize,
  },
  [ResizeBarTypes.BOTTOM]: {
    bottom: 0,
    left: 0,
    width: '100%',
    height: barSize,
  },
  [ResizeBarTypes.LEFT]: {
    top: 0,
    left: 0,
    width: barSize,
    height: '100%',
  },
  [ResizeBarTypes.RIGHT]: {
    top: 0,
    right: 0,
    width: barSize,
    height: '100%',
  },
  [ResizeBarTypes.TOP_LEFT]: {
    top: 0,
    left: 0,
    width: barSize,
    height: barSize,
  },
  [ResizeBarTypes.TOP_RIGHT]: {
    top: 0,
    right: 0,
    width: barSize,
    height: barSize,
  },
  [ResizeBarTypes.BOTTOM_LEFT]: {
    bottom: 0,
    left: 0,
    width: barSize,
    height: barSize,
  },
  [ResizeBarTypes.BOTTOM_RIGHT]: {
    bottom: 0,
    right: 0,
    width: barSize,
    height: barSize,
  },
};

export {
  defaultBackdropStyle,
  defaultWindowStyle,
  defaultResizeBarStyle,
  defaultResizeStylesByType,
};
