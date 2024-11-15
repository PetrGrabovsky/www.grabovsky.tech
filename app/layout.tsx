import '@/shared/styles/globals.css';

import { ChildrenProps } from '@/shared/types/types';

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <html lang='cs'>
      <body className='antialiased'>{children}</body>
    </html>
  );
};

export default RootLayout;
