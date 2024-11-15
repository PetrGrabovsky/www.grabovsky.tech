'use client';

import clsx from 'clsx';

import { ChildrenProps } from '@/shared/types/types';

import Footer from './components/Footer';
import Header from './components/Header';
import useLayoutManager from './hooks/useLayoutManager';

const Layout = ({ children }: ChildrenProps) => {
  const { isMobileView, isShrunk, markerRef } = useLayoutManager();

  return (
    <>
      <span ref={markerRef} className='h-0 w-0' aria-hidden='true' />
      <Header className={clsx(isShrunk ? 'h-10' : 'h-16')}>
        <span>Logo</span>
        {isMobileView && <span>Menu</span>}
      </Header>
      <main className='mb-8 mt-24 flex-grow'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
