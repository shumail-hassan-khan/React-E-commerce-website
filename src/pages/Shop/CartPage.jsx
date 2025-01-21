import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import delImgUrl from "../../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = (item) => item.price * item.quantity;

  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + calculateTotalPrice(item),
    0
  );

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!country) formErrors.country = "Please select your country.";
    if (!state) formErrors.state = "Please select your state.";
    if (!address.trim()) formErrors.address = "Please enter your complete address.";
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      navigate("/checkout");
    }
  };

  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop-single">
                            <img src={`${item.img}`} alt="" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop-single">{item.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            className="cart-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            value={item.quantity}
                            readOnly
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">${calculateTotalPrice(item)}</td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl} alt="Delete" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-bottom">
              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Add Your Address</h3>
                      <form onSubmit={handleProceedToCheckout}>
                        <div className="outline-select">
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="">Select Your Country</option>
                            <option value="Pakistan">Pakistan</option>
                          </select>
                          {errors.country && (
                            <p className="error-text">{errors.country}</p>
                          )}
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <div className="outline-select shipping-select">
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">Select Your State</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Peshawar">Peshawar</option>
                          </select>
                          {errors.state && (
                            <p className="error-text">{errors.state}</p>
                          )}
                          <span className="select-icon">
                            <i className="icofont-rounded-down"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="address"
                          placeholder="Complete Address (Street, House No., etc.)"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="cart-page-input-text"
                        />
                        {errors.address && (
                          <p className="error-text">{errors.address}</p>
                        )}
                      </form>
                    </div>
                  </div>

                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">${cartSubtotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">Shipping and Handling</span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">${cartSubtotal.toFixed(2)}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <form className="cart-checkout" action="/">
                <input type="submit" value="Update Cart" />
                <div>
                  <CheckoutPage />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
