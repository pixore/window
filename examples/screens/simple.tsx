import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Window, DragArea, useWindow, WindowState } from '../../src';

const Size = () => {
  const { windowState } = useWindow();
  return <span>{JSON.stringify(windowState)}</span>;
};

const App: React.FC = () => {
  const height = 300;
  const width = 300;

  const [maxSize, setMaxSize] = React.useState<Partial<WindowState>>();
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

const root = createRoot(document.getElementById('root'));
root.render(<App />);
