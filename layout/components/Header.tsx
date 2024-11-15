import clsx from 'clsx';

import { ChildrenProps } from '@/shared/types/types';

interface HeaderProps extends ChildrenProps {
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        'transition-primary fixed inset-0 flex bg-gray-600',
        className
      )}
    >
      <div className='container flex items-center justify-between'>
        {children}
      </div>
    </header>
  );
};

export default Header;
