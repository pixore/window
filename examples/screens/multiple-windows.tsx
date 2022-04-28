import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Window, DragArea, useWindow, WindowState } from '../../src';

interface Props {
  index: number;
}

const WindowContent: React.FC<Props> = () => {
  const { requestedClose } = useWindow();
  return <button onClick={requestedClose}>close</button>;
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomState = (): WindowState => {
  const height = getRandomNumber(30, window.innerHeight / 2);
  const width = getRandomNumber(30, window.innerWidth / 2);

  return {
    height,
    width,
    top: getRandomNumber(0, window.innerHeight - height),
    left: getRandomNumber(0, window.innerWidth - width),
  };
};

const App: React.FC = () => {
  const [windows, setWindows] = React.useState<WindowState[]>([]);
  const [closedWindows, setCloseWindows] = React.useState<number[]>([]);

  const onRequestedClose = (index: number) => {
    setCloseWindows((arr) => arr.concat(index));
  };

  React.useEffect(() => {
    setWindows([
      getRandomState(),
      getRandomState(),
      getRandomState(),
      getRandomState(),
      getRandomState(),
    ]);
  }, []);

  const onReopen = (index: number) => {
    setCloseWindows((arr) => arr.filter((window) => window !== index));
  };

  const onAdd = () => {
    setWindows((arr) => arr.concat(getRandomState()));
  };

  return (
    <div>
      <button onClick={onAdd}>add</button>
      <ul>
        {closedWindows.map((index) => {
          return (
            <li key={index}>
              <button onClick={() => onReopen(index)}>
                reopen window {index}
              </button>
            </li>
          );
        })}
      </ul>
      {windows.map((state, index) => {
        if (closedWindows.includes(index)) {
          return null;
        }

        return (
          <Window
            key={index}
            onRequestedClose={() => onRequestedClose(index)}
            initialState={state}
          >
            <WindowContent index={index} />
            <DragArea className="dragarea" />
          </Window>
        );
      })}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
