import * as React from 'react';

export interface ClassNames {
  window: string;
  backdrop: string;
  resizeBarTop: string;
  resizeBarBottom: string;
  resizeBarLeft: string;
  resizeBarRight: string;
  resizeBarTopLeft: string;
  resizeBarTopRight: string;
  resizeBarBottomLeft: string;
  resizeBarBottomRight: string;
}

export interface OptionalClassNames {
  window?: string;
  backdrop?: string;
  resizeBarTop?: string;
  resizeBarBottom?: string;
  resizeBarLeft?: string;
  resizeBarRight?: string;
  resizeBarTopLeft?: string;
  resizeBarTopRight?: string;
  resizeBarBottomLeft?: string;
  resizeBarBottomRight?: string;
}

const defaultClassNames = {
  window: 'px-window',
  backdrop: 'px-backdrop',
  resizeBarTop: 'px-resizebar-top',
  resizeBarBottom: 'px-resizebar-bottom',
  resizeBarLeft: 'px-resizebar-left',
  resizeBarRight: 'px-resizebar-right',
  resizeBarTopLeft: 'px-resizebar-top-left',
  resizeBarTopRight: 'px-resizebar-top-right',
  resizeBarBottomLeft: 'px-resizebar-bottom-left',
  resizeBarBottomRight: 'px-resizebar-bottom-right',
};

const initialValue = {
  classNames: defaultClassNames,
  cornerSize: 40,
  splitRatio: 40,
};

export interface ConfigState {
  classNames: ClassNames;
}

interface PropTypes {
  classNames?: OptionalClassNames;
}

const ConfigContext = React.createContext<ConfigState>(initialValue);

const Provider: React.FC<PropTypes> = (props) => {
  const { children, classNames = {} } = props;

  const {
    window = defaultClassNames.window,
    backdrop = defaultClassNames.backdrop,
    resizeBarTop = defaultClassNames.resizeBarTop,
    resizeBarBottom = defaultClassNames.resizeBarBottom,
    resizeBarLeft = defaultClassNames.resizeBarLeft,
    resizeBarRight = defaultClassNames.resizeBarRight,
    resizeBarTopLeft = defaultClassNames.resizeBarTopLeft,
    resizeBarTopRight = defaultClassNames.resizeBarTopRight,
    resizeBarBottomLeft = defaultClassNames.resizeBarBottomLeft,
    resizeBarBottomRight = defaultClassNames.resizeBarBottomRight,
  } = classNames;

  const value = {
    classNames: {
      window,
      backdrop,
      resizeBarTop,
      resizeBarBottom,
      resizeBarLeft,
      resizeBarRight,
      resizeBarTopLeft,
      resizeBarTopRight,
      resizeBarBottomLeft,
      resizeBarBottomRight,
    },
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

const useConfig = () => React.useContext(ConfigContext);
const useClassNames = () => {
  const { classNames } = useConfig();

  return classNames;
};

export { ConfigContext };
export default {
  useConfig,
  useClassNames,
  Provider,
};
