import * as React from 'react';
import Portal from '@reach/portal';
import ResizeBar from './ResizeBar';
import { ResizeBarTypes, State, Vector } from '../types';
import { getNewState } from '../utils';
import Config from '../contexts/Config';
import { defaultBackdropStyle, defaultWindowStyle } from '../styles';
import useMouseDiff from '../hooks/useMouseDiff';

interface PropTypes {
  isOpen?: boolean;
  isResizeable?: boolean;
  withBackdrop?: boolean;
  initialState: State;
  minimalState?: State;
}

interface ContextState {
  onDrag: (event: React.MouseEvent) => void;
}

const Context = React.createContext<ContextState>({
  onDrag: () => {
    console.error('DragArea used outside a Window');
  },
});

const Window: React.FC<PropTypes> = (props) => {
  const {
    isOpen = true,
    isResizeable = true,
    children,
    withBackdrop = false,
    minimalState = defaultMinialState,
    initialState = minimalState,
  } = props;

  const minimalStateRef = React.useRef(minimalState);
  const [state, setState] = React.useState(initialState);
  const classNames = Config.useClassNames();
  const style = {
    ...defaultWindowStyle,
    ...state,
  };

  const onResize = (diff: State) => {
    setState((state) => getNewState(minimalStateRef.current, state, diff));
  };

  const { onMouseDown } = useMouseDiff((diff: Vector) => {
    setState((state) =>
      getNewState(minimalStateRef.current, state, {
        top: diff.y,
        left: diff.x,
        width: 0,
        height: 0,
      }),
    );
  });

  const onDrag = (event: React.MouseEvent) => {
    onMouseDown(event);
  };

  const contextValue = {
    onDrag,
  };

  return (
    <Portal>
      {isOpen && (
        <>
          {withBackdrop && (
            <div className={classNames.backdrop} style={defaultBackdropStyle} />
          )}
          <Context.Provider value={contextValue}>
            <div className={classNames.window} style={style}>
              {isResizeable && (
                <>
                  <ResizeBar onResize={onResize} type={ResizeBarTypes.TOP} />
                  <ResizeBar onResize={onResize} type={ResizeBarTypes.BOTTOM} />
                  <ResizeBar onResize={onResize} type={ResizeBarTypes.LEFT} />
                  <ResizeBar onResize={onResize} type={ResizeBarTypes.RIGHT} />
                  <ResizeBar
                    onResize={onResize}
                    type={ResizeBarTypes.TOP_LEFT}
                  />
                  <ResizeBar
                    onResize={onResize}
                    type={ResizeBarTypes.TOP_RIGHT}
                  />
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
              {children}
            </div>
          </Context.Provider>
        </>
      )}
    </Portal>
  );
};

const useWindow = () => React.useContext(Context);
export { useWindow };
export default Window;

const defaultMinialState: State = {
  top: 0,
  left: 0,
  width: 50,
  height: 50,
};
