import clsx from 'clsx';
import { IoMdMenu } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';

interface MenuButtonProps {
  isMobileNavOpen: boolean;
  className: string;
  onClick: () => void;
}

const MenuButton = ({
  isMobileNavOpen,
  className,
  onClick,
}: MenuButtonProps) => {
  const Icon = isMobileNavOpen ? IoMdClose : IoMdMenu;

  return (
    <div className={clsx('transition-primary h-full', className)}>
      <button onClick={onClick} className='h-full'>
        <Icon className='h-full w-full' />
      </button>
    </div>
  );
};

export default MenuButton;
