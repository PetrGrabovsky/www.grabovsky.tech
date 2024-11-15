import { RefObject, useEffect, useReducer, useRef } from 'react';

const MOBILE_BREAKPOINT = 768;
const SHRUNK_SCROLL_THRESHOLD = 200;

type Action =
  | { type: 'SET_IS_MOBILE_VIEW'; payload: boolean }
  | { type: 'SET_IS_SHRUNK_VIEW'; payload: boolean }
  | { type: 'SET_IS_MOBILE_NAV_OPEN'; payload: boolean };

interface State {
  isMobileView: boolean;
  isShrunkView: boolean;
  isMobileNavOpen: boolean;
}

const initialState: State = {
  isMobileView: true,
  isShrunkView: false,
  isMobileNavOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_IS_MOBILE_VIEW':
      return { ...state, isMobileView: action.payload };
    case 'SET_IS_SHRUNK_VIEW':
      return { ...state, isShrunkView: action.payload };
    case 'SET_IS_MOBILE_NAV_OPEN':
      return { ...state, isMobileNavOpen: action.payload };
    default:
      return state;
  }
};

interface LayoutManagerReturn {
  isMobileView: boolean;
  isShrunkView: boolean;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  markerRef: RefObject<HTMLSpanElement>;
}

const useLayoutManager = (): LayoutManagerReturn => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMobileView, isShrunkView, isMobileNavOpen } = state;

  const markerRef = useRef<HTMLSpanElement | null>(null);

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
    ) {
      dispatch({ type: 'SET_IS_SHRUNK_VIEW', payload: false });
      return;
    }

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

  // Funkce pro přepínání mobilní navigace
  const toggleMobileNav = () => {
    dispatch({ type: 'SET_IS_MOBILE_NAV_OPEN', payload: !isMobileNavOpen });
  };

  return {
    isMobileView,
    isShrunkView,
    isMobileNavOpen,
    toggleMobileNav,
    markerRef,
  };
};

export default useLayoutManager;
