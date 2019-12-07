import * as React from 'react';
import { render } from 'react-dom';
import { Window, DragArea, useWindow } from '../../src';

const Size = () => {
  const { state } = useWindow();
  return <span>{JSON.stringify(state)}</span>;
};

const App: React.FC = () => {
  const height = 300;
  const width = 300;

  const [maxSize, setMaxSize] = React.useState();
  React.useEffect(() => {
    const updateMaxSize = () => {
      setMaxSize({
        top: window.innerHeight,
        left: window.innerWidth,
      });
    };

    window.addEventListener('resize', updateMaxSize);
    updateMaxSize();
    return () => window.removeEventListener('resize', updateMaxSize);
  }, []);

  return (
    <div>
      <Window
        initialState={{
          top: 100,
          left: 100,
          width,
          height,
        }}
        maxState={maxSize}
      >
        <Size />
        <DragArea className="dragarea" />
      </Window>
    </div>
  );
};

render(<App />, document.getElementById('root'));
