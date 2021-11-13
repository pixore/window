export enum ResizeBarTypes {
  TOP = 'Top',
  BOTTOM = 'Bottom',
  LEFT = 'Left',
  RIGHT = 'Right',
  TOP_LEFT = 'TopLeft',
  TOP_RIGHT = 'TopRight',
  BOTTOM_LEFT = 'BottomLeft',
  BOTTOM_RIGHT = 'BottomRight',
}

export interface State {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface WindowBaseProps {
  className?: string;
  isResizeable?: boolean;
  withBackdrop?: boolean;
  closeInEscape?: boolean;
  onRequestedClose?: () => void;
}
