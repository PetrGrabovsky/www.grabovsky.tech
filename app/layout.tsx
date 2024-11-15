import '@/shared/styles/globals.css';

import clsx from 'clsx';

import Layout from '@/layout/Layout';
import { inter } from '@/shared/styles/fonts';
import { ChildrenProps } from '@/shared/types/types';

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <html lang='cs'>
      <body
        className={clsx(
          'flex min-h-screen flex-col overflow-x-hidden bg-body-background',
          'text-base leading-relaxed tracking-wide text-gray-300 antialiased',
          'text-justify font-normal shadow-sm',
          inter.className
        )}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
