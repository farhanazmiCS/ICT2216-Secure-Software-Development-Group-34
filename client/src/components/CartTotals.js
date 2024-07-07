import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const CartTotals = () => {
  const { total_items } = useCartContext();
  const { user } = useAppContext();

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            total items :<span>{total_items}</span>
          </h5>
        </article>
        {user ? (
          <Link to='/checkout' className='btn'>
            proceed to checkout
          </Link>
        ) : (
          <Link to='/login' className='btn'>
            login
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h5 {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
