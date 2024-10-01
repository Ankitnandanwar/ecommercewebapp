import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])



  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/*---------------------Product Data---------------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/*-------------------Product Images-------------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) =>(
                <img onClick={()=>setImage(item)} key={index} src={item} alt='product_image' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img src={image} alt="prod_img" className='w-full h-auto'/>
          </div>
        </div>

        {/*-------------------Product info---------------------- */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-5'>
              <img src={assets.star_icon} alt="star_icon" className='w-3'/>
              <img src={assets.star_icon} alt="star_icon" className='w-3'/>
              <img src={assets.star_icon} alt="star_icon" className='w-3'/>
              <img src={assets.star_icon} alt="star_icon" className='w-3'/>
              <img src={assets.star_dull_icon} alt="star_dull_icon" className='w-3'/>
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {
                  productData.sizes.map((item, index)=> (
                    <button onClick={()=>setSize(item)} key={index} className={`border bg-gray-200 py-2 px-4 rounded ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                  ))
                }
              </div>
            </div>
            
            <button onClick={()=>addToCart(productData._id, size)} className='uppercase bg-black px-8 py-3 text-sm active:bg-gray-700 text-white'>Add to cart</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Cash on delivery available on this product</p>
                <p>Easy return and exchange policy in 7 days</p>
            </div>
        </div>
      </div>

      {/*-----------------------Description & Review Section------------------------*/}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Our e-commerce platform brings you a seamless shopping experience, offering a wide range of products from electronics to fashion. Browse through hundreds of categories, compare prices, and enjoy fast shipping. With a user-friendly interface, secure payment options, and 24/7 customer support, shopping has never been easier.</p>
          <p>Discover premium organic and eco-friendly products curated just for you. From sustainable fashion to zero-waste home essentials, our e-commerce</p>
        </div>
      </div>

      {/* -----------------Display related Product--------------------------------- */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product