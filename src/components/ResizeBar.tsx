import * as React from 'react';
import { ResizeBarTypes, State, Vector } from '../types';
import Config from '../contexts/Config';
import useMouseDiff from '../hooks/useMouseDiff';
import { defaultResizeBarStyle, defaultResizeStylesByType } from '../styles';

interface Props {
  type: ResizeBarTypes;
  onResize: (diff: State) => void;
}

const ResizeBar = (props: Props) => {
  const { type, onResize } = props;
  const { onMouseDown } = useMouseDiff((diff: Vector) =>
    onResize(getDiff(type, diff)),
  );
  const classNames = Config.useClassNames();
  const style = {
    ...defaultResizeBarStyle,
    ...defaultResizeStylesByType[type],
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={style}
      className={classNames[`resizeBar${type}`]}
    />
  );
};

export default ResizeBar;

const getDiff = (type: ResizeBarTypes, diff: Vector): State => {
  if (type === ResizeBarTypes.BOTTOM) {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: diff.y,
    };
  }
  if (type === ResizeBarTypes.RIGHT) {
    return {
      left: 0,
      top: 0,
      width: diff.x,
      height: 0,
    };
  }

  if (type === ResizeBarTypes.TOP) {
    return {
      left: 0,
      top: diff.y,
      width: 0,
      height: -diff.y,
    };
  }

  if (type === ResizeBarTypes.LEFT) {
    return {
      left: diff.x,
      top: 0,
      width: -diff.x,
      height: 0,
    };
  }

  if (type === ResizeBarTypes.TOP_LEFT) {
    return {
      left: diff.x,
      top: diff.y,
      width: -diff.x,
      height: -diff.y,
    };
  }

  if (type === ResizeBarTypes.TOP_RIGHT) {
    return {
      left: 0,
      top: diff.y,
      width: diff.x,
      height: -diff.y,
    };
  }

  if (type === ResizeBarTypes.BOTTOM_LEFT) {
    return {
      left: diff.x,
      top: 0,
      width: -diff.x,
      height: diff.y,
    };
  }

  return {
    left: 0,
    top: 0,
    width: diff.x,
    height: diff.y,
  };
};
