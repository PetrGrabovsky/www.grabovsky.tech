import { RefObject, useEffect, useReducer, useRef } from 'react';

const MOBILE_BREAKPOINT = 768;
const SHRUNK_SCROLL_THRESHOLD = 200;

type Action =
  | { type: 'SET_IS_MOBILE_VIEW'; payload: boolean }
  | { type: 'SET_IS_SHRUNK_VIEW'; payload: boolean };

interface State {
  isMobileView: boolean;
  isShrunk: boolean;
}

const initialState: State = {
  isMobileView: true,
  isShrunk: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_IS_MOBILE_VIEW':
      return { ...state, isMobileView: action.payload };
    case 'SET_IS_SHRUNK_VIEW':
      return { ...state, isShrunk: action.payload };
    default:
      return state;
  }
};

interface LayoutManagerReturn {
  isMobileView: boolean;
  isShrunk: boolean;
  markerRef: RefObject<HTMLDivElement>;
}

const useLayoutManager = (): LayoutManagerReturn => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMobileView, isShrunk } = state;

  const markerRef = useRef<HTMLDivElement | null>(null);

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

  // Sledování isShrunk
  useEffect(() => {
    if (
      !markerRef.current ||
      !isMobileView ||
      !('IntersectionObserver' in window)
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch({
          type: 'SET_IS_SHRUNK_VIEW',
          payload: !entry.isIntersecting,
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `${SHRUNK_SCROLL_THRESHOLD}px 0px 0px 0px`,
      }
    );

    observer.observe(markerRef.current);

    return () => observer.disconnect();
  }, [isMobileView]);

  return { isMobileView, isShrunk, markerRef };
};

export default useLayoutManager;
