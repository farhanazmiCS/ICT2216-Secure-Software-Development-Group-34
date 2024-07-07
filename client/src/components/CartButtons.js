import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePetsContext } from '../context/pets_context';
import { useCartContext } from '../context/cart_context';
import { useAppContext } from '../context/appContext';

const CartButtons = () => {
  const { closeSidebar } = usePetsContext();
  const { total_items, clearCart } = useCartContext();
  const { user, logoutUser } = useAppContext(); // Use user to determine if user is logged in or not

  return (
    <Wrapper className='cart-btn-wrapper'>
      {user ? ( // If user is logged in then provide a welcome user feedback
        <>
          <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
            Cart
            <span className='cart-container'>
              <FaShoppingCart />
              <span className='cart-value'>{total_items}</span>
            </span>
          </Link>
          <Link
            to='/'
            className='auth-btn'
            onClick={() => {
              clearCart();
              localStorage.removeItem('user');
              logoutUser();
            }}
          >
            {user.role === 'admin' ? 'Welcome, Admin' : `Welcome, ${user.name || user.nickname}`} <FaUserMinus />
          </Link>
        </>
      ) : (
        // Otherwise bring them to the login page
        <Link type='button' className='auth-btn' to='/login'>
          Login <FaUserPlus />
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cart-btn-wrapper {
    display: flex;
    align-items: center;
  }
  .cart-btn {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;

export default CartButtons;
