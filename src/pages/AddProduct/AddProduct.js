import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductForm from '../../components/product/productForm/ProductForm';
import {
  createProduct,
  selectIsLoading,
} from '../../redux/feature/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../../redux/feature/auth/authSlice';
import Loader from '../../components/Loader/Loader';

const initialState = {
  name: '',
  quantity: '',
  price: '',
  category: '',
};

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const isLoading = useSelector(selectIsLoading);

  const token = useSelector(selectToken);

  const { name, quantity, price, category } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + '-' + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', generateKSKU(category));
    formData.append('category', category);
    formData.append('quantity', Number(quantity));
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', productImage);

    console.log(...formData);

    dispatch(createProduct(formData));

    navigate('/dashboard');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
