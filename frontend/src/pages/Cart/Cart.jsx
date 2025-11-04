import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // New promo code states
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Fake promo code
  const PROMO_CODE = "TOMATO10";
  const DISCOUNT_RATE = 0.1; // 10% discount

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal - discount + deliveryFee;

  // Handle promo apply
  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === PROMO_CODE) {
      setDiscount(subtotal * DISCOUNT_RATE);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      alert("Invalid promo code");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2> Cart Totals </h2>
          <div>
            <div className="cart-total-details">
              <p> Subtotal </p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            {promoApplied && (
              <>
                <div className="cart-total-details" style={{color: 'green'}}>
                  <p>Discount ({PROMO_CODE})</p>
                  <p>- ${discount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee </p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b> Total </b>
              <b> ${total.toFixed(2)} </b>
            </div>
          </div>

          <button onClick={() => navigate('/order')}> PROCEED TO CHECKOUT </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p> If you have promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <form onSubmit={handlePromoSubmit} style={{display: 'flex', gap: '0.5rem'}}>
                <input
                  type="text"
                  placeholder='promo code'
                  value={promo}
                  onChange={e => setPromo(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
