import '@/shared/styles/globals.css';

import clsx from 'clsx';

import { inter } from '@/shared/styles/fonts';
import { ChildrenProps } from '@/shared/types/types';

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <html lang='cs'>
      <body
        className={clsx(
          'flex min-h-screen flex-col overflow-x-hidden bg-body-background',
          'text-gray-300 antialiased',
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
