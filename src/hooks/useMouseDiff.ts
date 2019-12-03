import { Vector } from '../types';

type OnDiff = (diff: Vector) => void;

const useMouseDiff = (onDiff: OnDiff) => {
  const onMouseDown = (event: React.MouseEvent) => {
    let { clientX: lastX, clientY: lastY } = event;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      onDiff({
        x: lastX - clientX,
        y: lastY - clientY,
      });

      lastX = clientX;
      lastY = clientY;
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown };
};
export default useMouseDiff;
