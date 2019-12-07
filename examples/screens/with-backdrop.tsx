import * as React from 'react';
import { render } from 'react-dom';
import { Window, DragArea } from '../../src';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const onRequestClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {isOpen && (
        <Window
          onRequestedClose={onRequestClose}
          withBackdrop={true}
          initialState={{
            top: 100,
            left: 100,
            width: 300,
            height: 300,
          }}
        >
          <DragArea className="dragarea" />
        </Window>
      )}
    </div>
  );
};

render(<App />, document.getElementById('root'));
