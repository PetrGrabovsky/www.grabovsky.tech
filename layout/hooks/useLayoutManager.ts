import { useEffect, useReducer } from 'react';

const MOBILE_BREAKPOINT = 768;

type Action = { type: 'SET_IS_MOBILE_VIEW'; payload: boolean };

interface State {
  isMobileView: boolean;
}

const initialState: State = {
  isMobileView: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_IS_MOBILE_VIEW':
      return { ...state, isMobileView: action.payload };
    default:
      return state;
  }
};

const useLayoutManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMobileView } = state;

  // Detekce mobilního zobrazení
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);

    const handleMediaChange = () => {
      dispatch({ type: 'SET_IS_MOBILE_VIEW', payload: !mediaQuery.matches });
    };

    handleMediaChange();

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return { ...state };
};

export default useLayoutManager;
