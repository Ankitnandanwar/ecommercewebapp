import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmt, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers:{token}})
          if(data.status){
            toast.success('Order Placed Successfully')
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmt() + delivery_fee,
      }

      switch (method) {

        // api call for COD
        case 'cod':
          const res = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: { token }
          })
          if (res.data.success) {
            setCartItems({});
            navigate('/orders')
          } else {
            toast.error(res.data.message)
          }
          break;

        case 'stripe':
          const resStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {
            headers: { token }
          })

          if (resStripe.data.success) {
            const { session_url } = resStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(resStripe.data.message)
          }

          break;


        case 'razorpay':
          const resRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
            headers: { token }
          })

          if(resRazorpay.data.success){
            initPay(resRazorpay.data.order)
          }

          break;

        default:
          break;
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------Left Side-------------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className='flex gap-3'>
          <input required type="text" placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
          <input required type="text" placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
        </div>
        <input required type="email" placeholder='Email address' name='email' value={formData.email} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
        <input required type="text" placeholder='Street' name='street' value={formData.street} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required type="text" placeholder='City' name='city' value={formData.city} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
          <input required type="text" placeholder='State' name='state' value={formData.state} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required type="number" placeholder='Zipcode' name='zipcode' value={formData.zipcode} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
          <input required type="text" placeholder='Country' name='country' value={formData.country} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
        </div>
        <input required type="number" placeholder='Phone' name='phone' value={formData.phone} onChange={handleChange} className='border border-gray-300 py-1.5 px-3.5 w-full' />
      </div>


      {/* ------------------Right Side-------------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />

          {/* ------------------Payment method selection-------------------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('razoppay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razoppay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='uppercase text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder