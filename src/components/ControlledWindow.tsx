import * as React from 'react';
import Portal from '@reach/portal';
import { noop } from '../utils';
import ResizeBar from './ResizeBar';
import Config from '../contexts/Config';
import useMouseDiff from '../hooks/useMouseDiff';
import { ResizeBarTypes, State, Vector, WindowBaseProps } from '../types';
import { defaultBackdropStyle, defaultWindowStyle } from '../styles';

interface PropTypes extends WindowBaseProps {
  state: State;
  onMove: (diff: Vector) => void;
  onResize: (diff: State) => void;
}

interface ContextState {
  onDrag: (event: React.MouseEvent) => void;
  windowState: State;
  requestedClose: () => void;
}

const Context = React.createContext<ContextState>({
  onDrag: () => {
    console.error('DragArea used outside a Window');
  },
  requestedClose: () => {
    console.error("This shouln't happen");
  },
  windowState: {
    top: -Infinity,
    left: -Infinity,
    width: 50,
    height: 50,
  },
});

const ControllerdWindow: React.FC<PropTypes> = (props) => {
  const {
    onRequestedClose = noop,
    onMove,
    onResize,
    isResizeable = true,
    children,
    withBackdrop = false,
    state,
    className = '',
    closeInEscape = true,
  } = props;
  const classNames = Config.useClassNames();
  const { onMouseDown } = useMouseDiff(onMove);

  const style = {
    ...defaultWindowStyle,
    ...state,
  };

  const onDrag = (event: React.MouseEvent) => {
    onMouseDown(event);
  };

  const contextValue = {
    onDrag,
    windowState: state,
    requestedClose: onRequestedClose,
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (closeInEscape && event.key === 'Escape') {
      event.stopPropagation();
      onRequestedClose();
    }
  };

  const onClickBackDrop = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRequestedClose();
  };

  return (
    <Portal>
      {withBackdrop && (
        <div
          onClick={onClickBackDrop}
          className={classNames.backdrop}
          style={defaultBackdropStyle}
        />
      )}
      <Context.Provider value={contextValue}>
        <div
          onKeyDown={onKeyDown}
          className={`${classNames.window} ${className}`}
          style={style}
        >
          {children}
          {isResizeable && (
            <>
              <ResizeBar onResize={onResize} type={ResizeBarTypes.TOP} />
              <ResizeBar onResize={onResize} type={ResizeBarTypes.BOTTOM} />
              <ResizeBar onResize={onResize} type={ResizeBarTypes.LEFT} />
              <ResizeBar onResize={onResize} type={ResizeBarTypes.RIGHT} />
              <ResizeBar onResize={onResize} type={ResizeBarTypes.TOP_LEFT} />
              <ResizeBar onResize={onResize} type={ResizeBarTypes.TOP_RIGHT} />
              <ResizeBar
                onResize={onResize}
                type={ResizeBarTypes.BOTTOM_LEFT}
              />
              <ResizeBar
                onResize={onResize}
                type={ResizeBarTypes.BOTTOM_RIGHT}
              />
            </>
          )}
        </div>
      </Context.Provider>
    </Portal>
  );
};

const useWindow = () => React.useContext(Context);

export { useWindow };
export default ControllerdWindow;
