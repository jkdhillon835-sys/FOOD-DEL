import React, { useContext, useEffect, useCallback } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const successParam = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url = '' } = useContext(StoreContext); // Avoid undefined url
  const navigate = useNavigate();

  console.log('Verify component mounted');
  console.log('Query params:', { successParam, orderId });
  console.log('Backend URL:', url);

  const verifyPayment = useCallback(async () => {
    if (!url) {
      console.error('Backend URL is not set.');
      setTimeout(() => navigate('/'), 1000); 
      return;
    }
    try {
      const success = successParam === 'true';
      console.log('Verifying payment with:', { success, orderId });

      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      console.log('Response from backend:', response.data);

       setTimeout(() => {
        if (response.data?.success) {
          navigate('/myorders');
        } else {
          navigate('/');
        }
      }, 1000);


    } catch (error) {
      console.error('Verification failed:', error);
      setTimeout(() => navigate('/'), 1000); 
    }
  }, [successParam, orderId, url, navigate]);

  useEffect(() => {
    console.log('useEffect triggered with:', { successParam, orderId });
    if (successParam && orderId) {
      verifyPayment();
    } else {
      console.warn('Missing required query params, redirecting home');
      navigate('/');
    }
  }, [successParam, orderId, verifyPayment, navigate]);

  return (
    <div className="verify">
      <p>Verifying payment, please wait...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;



