import * as React from 'react';
import { useWindow } from './Window';

const DragArea: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  const { onDrag } = useWindow();
  return <div {...props} onMouseDown={onDrag} />;
};

export default DragArea;
