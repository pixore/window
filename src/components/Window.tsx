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
  minState?: Partial<State>;
  maxState?: Partial<State>;
}

interface ContextState {
  onDrag: (event: React.MouseEvent) => void;
  state: State;
}
const defaultMinState: State = {
  top: 0,
  left: 0,
  width: 50,
  height: 50,
};

const defaultMaxState: State = {
  top: Infinity,
  left: Infinity,
  width: Infinity,
  height: Infinity,
};

const Context = React.createContext<ContextState>({
  onDrag: () => {
    console.error('DragArea used outside a Window');
  },
  state: defaultMinState,
});

const Window: React.FC<PropTypes> = (props) => {
  const {
    isOpen = true,
    isResizeable = true,
    children,
    withBackdrop = false,
    initialState,
  } = props;

  const minState = Object.assign(defaultMinState, props.minState);
  const maxState = Object.assign(defaultMaxState, props.maxState);
  const [state, setState] = React.useState(initialState || minState);
  const classNames = Config.useClassNames();
  const style = {
    ...defaultWindowStyle,
    ...state,
  };

  const onResize = (diff: State) => {
    setState((state) => getNewState(minState, maxState, state, diff));
  };

  const handleOnDiff = (diff: Vector) => {
    setState((state) => {
      return getNewState(minState, maxState, state, {
        top: diff.y,
        left: diff.x,
        width: 0,
        height: 0,
      });
    });
  };

  const { onMouseDown } = useMouseDiff(handleOnDiff);

  const onDrag = (event: React.MouseEvent) => {
    onMouseDown(event);
  };

  const contextValue = {
    onDrag,
    state,
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
