import {useUrl, useCart} from '@shopify/hydrogen';
import {Drawer, useDrawer} from './Drawer.client';

import {CartDetails} from './CartDetails.client';

import Logo from './Logo';
import Hamburger from './navigation/Hamburger';
import DesktopNav from './navigation/DesktopNav';

import {Input, IconSearch} from '~/components';

import {useState} from 'react';

export default function Header() {
  const {pathname} = useUrl();
  const {isOpen, openDrawer, closeDrawer} = useDrawer();

  const [navigate, setNavigate] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 44) {
      setNavigate(true);
    } else {
      setNavigate(false);
    }
  };
  if (typeof window !== `undefined`) {
    window.addEventListener('scroll', changeBackground);
  }

  const isHome = pathname === '/';
  return (
    <header className={`wholeHeader ${isHome ? 'imHome' : 'imNotHome'}`}>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDetails onClose={closeDrawer} />
      </Drawer>
      <div role="banner" className={`always-flex justify topHeader`}>
        <div className="flex-vertical promo-banner">
          <span>
            Direct Web Sales Available for US Residents in the lower 48 States
          </span>
        </div>
        <button onClick={openDrawer} className="cartIcon flex-vertical">
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
      <div
        className={
          navigate
            ? 'lowerHeader justify always-flex active'
            : 'lowerHeader justify always-flex'
        }
      >
        <Logo />
        <Hamburger />
        <DesktopNav />
        <div className="flex-vertical">
          <form action={`/search`} className="obrienSearch">
            <Input
              className={
                isHome
                  ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                  : 'focus:border-primary/20'
              }
              type="search"
              variant="minisearch"
              placeholder="Search"
              name="q"
            />
            <button type="submit" className="iconSearch">
              <IconSearch />
            </button>
          </form>
        </div>
      </div>
      <span className="secondTrigger">secondTrigger</span>
    </header>
  );
}

function IconBag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="iconBag"
    >
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </svg>
  );
}
function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div className={`tbd flex-vertical`}>
      <span>{totalQuantity}</span>
    </div>
  );
}
