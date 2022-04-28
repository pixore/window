import * as React from 'react';
import { useWindow } from './Window';

type Props = React.HTMLProps<HTMLDivElement>;

const DragArea = (props: Props) => {
  const { onDrag } = useWindow();
  return <div {...props} onMouseDown={onDrag} />;
};

export default DragArea;
