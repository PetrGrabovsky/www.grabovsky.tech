'use client';

import { ChildrenProps } from '@/shared/types/types';

import Footer from './components/Footer';
import Header from './components/Header';
import useLayoutManager from './hooks/useLayoutManager';

const Layout = ({ children }: ChildrenProps) => {
  const { isMobileView } = useLayoutManager();

  return (
    <>
      <Header>
        <span>Logo</span>
        {isMobileView && <span>Menu</span>}
      </Header>
      <main className='mb-8 mt-24 flex-grow'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
