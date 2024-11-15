import { ChildrenProps } from '@/shared/types/types';

const Header = ({ children }: ChildrenProps) => {
  return (
    <header className='fixed inset-0 flex h-16 bg-gray-600'>
      <div className='container flex items-center justify-between'>
        {children}
      </div>
    </header>
  );
};

export default Header;
