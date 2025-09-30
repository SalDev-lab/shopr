import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [instructionsConfirmed, setInstructionsConfirmed] = useState(false)
    const [data, setData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipcode: "", country: "", phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        if (payment === "transfer" && !instructionsConfirmed) {
            toast.error("Please confirm that you have read and understood the instructions.")
            return
        }

        let orderItems = food_list.filter(item => cartItems[item._id] > 0)
                                  .map(item => ({ ...item, quantity: cartItems[item._id] }))

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }

        try {
            if (payment === "cod" || payment === "transfer") {
                const response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
                if (response.data.success) {
                    navigate("/myorders")
                    toast.success(response.data.message)
                    setCartItems({});
                } else toast.error("Something Went Wrong")
            }
        } catch {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("To place an order, sign in first")
            navigate('/cart')
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <h2 className='title'>Delivery Information</h2>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details total"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>

                <div className="payment">
                    <h2>Payment Method</h2>

                    <div onClick={() => setPayment("cod")} className={`payment-option ${payment==="cod" ? "active" : ""}`}>
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD (Cash on delivery)</p>
                    </div>

                    <div onClick={() => setPayment("transfer")} className={`payment-option ${payment==="transfer" ? "active" : ""}`}>
                        <img src={payment === "transfer" ? assets.checked : assets.un_checked} alt="" />
                        <p>Bank Transfer / Seller Info</p>
                    </div>

                    {payment === "transfer" && (
                        <div className="transfer-box">
                            <p><b>Bank Name:</b> Kuda</p>
                            <p><b>Account Number:</b> 702244475628</p>
                            <p><b>Account Name:</b> Golden Prin</p>
                            <p><b>Instructions:</b></p>
                            <ul>
                                <li>Use the same name you used to sign in or sign up as the beneficiary while transferring the money.</li>
                                <li>Ensure the exact amount is sent; partial payments may not be confirmed.</li>
                                <li>If you face any issues with payment confirmation, call 07033253247.</li>
                                <li>Double-check your account details before sending to avoid errors.</li>
                            </ul>
                            <div className="transfer-checkbox">
                                <input type="checkbox" checked={instructionsConfirmed} onChange={e => setInstructionsConfirmed(e.target.checked)} required />
                                <p>I have read and understood the instructions.</p>
                            </div>
                        </div>
                    )}
                </div>

                <button className='place-order-submit' type='submit'>
                    Place Order
                </button>
            </div>
        </form>
    )
}

export default PlaceOrder
