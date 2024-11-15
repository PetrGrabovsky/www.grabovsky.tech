import { ChildrenProps } from '@/shared/types/types';

import Footer from './components/Footer';
import Header from './components/Header';

const Layout = ({ children }: ChildrenProps) => {
  return (
    <>
      <Header />
      <main className='mb-8 mt-24 flex-grow'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
