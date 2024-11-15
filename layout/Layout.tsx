'use client';

import clsx from 'clsx';

import { ChildrenProps } from '@/shared/types/types';

import Footer from './components/Footer';
import Header from './components/Header';
import MenuButton from './components/MenuButton';
import useLayoutManager from './hooks/useLayoutManager';

const Layout = ({ children }: ChildrenProps) => {
  const {
    isMobileView,
    isShrunkView,
    isMobileNavOpen,
    toggleMobileNav,
    markerRef,
  } = useLayoutManager();

  return (
    <>
      <span ref={markerRef} className='h-0 w-0' aria-hidden='true' />
      <Header className={clsx(isShrunkView ? 'h-10' : 'h-16')}>
        <span>Logo</span>
        {isMobileView && (
          <MenuButton
            onClick={toggleMobileNav}
            isMobileNavOpen={isMobileNavOpen}
            className={clsx(isShrunkView ? 'py-1' : 'py-2')}
          />
        )}
      </Header>
      <main className='mb-8 mt-24 flex-grow'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
