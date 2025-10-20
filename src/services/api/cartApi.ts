/* eslint-disable */
import { instance } from '@/config/apiConfig';

export const fetchCartItems = async () => {
  const response = await instance.get('/cart');
  return response.data;
};

export const addToCart = async (productId: number): Promise<any> => {
    const response = await instance.post(`/cart/add`, null, {
      params: { productId },
    });
    return response.data;
  };
  
  export const removeFromCart = async (productId: number): Promise<any> => {
    const response = await instance.delete(`/cart/remove`, {
      params: { productId },
    });
    return response.data;
  };
  

export const clearCart = async () => {
  const response = await instance.delete('/cart/clear');
  return response.data;
};
