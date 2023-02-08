import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import ProductList from '../../components/product/productList/ProductList';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import {
  selectIsLoggedIn,
  selectToken,
} from '../../redux/feature/auth/authSlice';
import { getProducts } from '../../redux/feature/product/productSlice';

const Dashboard = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const { products, isError, isLoading, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    console.log(isLoggedIn);

    if (isLoggedIn) {
      dispatch(getProducts());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError, isLoggedIn, token]);
  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
