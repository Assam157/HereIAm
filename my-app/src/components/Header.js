import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useItemContext } from '../context/ItemContext';

const Header = () => {
  const { itemsInCart, totalPrice } = useItemContext();

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1 className='ecom'>
          <p>BroSeeds</p>
        </h1>
      </div>
      <div className='navbar-items'>
        <h3 style={{ color: "green" }}>
          Total Price: {totalPrice} Rs
        </h3>
        <div className='cart-num'>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          <div className='cart-items'>
            {itemsInCart}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
 