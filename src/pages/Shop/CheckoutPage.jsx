import React, { useState } from "react";
import "../../components/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import emailjs from "emailjs-com";

const CheckoutPage = () => {
  const [show, setShow] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOrderConfirm = () => {
    const formErrors = {};

    // Validate cardholder name
    if (!cardName.trim()) {
      formErrors.cardName = "Cardholder name is required.";
    }

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      formErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Validate expiry date (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      formErrors.expiry = "Expiry date must be in MM/YY format.";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Month is 0-based
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

      // Check if the entered date is in the past
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        formErrors.expiry = "Card has expired. Please use a valid card.";
      }
    }

    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      formErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Generate random order number
      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      // Prepare email data
      const templateParams = {
        cardName,
        orderNumber,
      };

      // Send email using EmailJS
      emailjs
        .send(
          "service_7hir95s", // Replace with your EmailJS service ID
          "template_7v6gcrg", // Replace with your EmailJS template ID
          templateParams,
          "9LJWhpgG0a0jfafjz" // Replace with your EmailJS public key (user ID)
        )
        .then(
          (result) => {
            console.log("Email sent successfully!", result.text);
            alert("Order placed successfully! A confirmation email has been sent.");
          },
          (error) => {
            console.error("Failed to send email.", error.text);
            alert("Failed to place the order. Please try again.");
          }
        );

      setShow(false); // Close the modal
    }
  };

  

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow} className="py-2">
        Proceed to Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment Method</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="mt-4 mx-4">
                <div className="text-center">
                  <h5>Credit Card</h5>
                </div>
                <div className="form mt-3">
                  {/* Cardholder Name */}
                  <div className="inputbox">
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="form-control"
                      required
                    />
                    <span>Cardholder Name</span>
                    {errors.cardName && <p className="error-text">{errors.cardName}</p>}
                  </div>

                  {/* Card Number */}
                  <div className="inputbox">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="form-control"
                      required
                    />
                    <span>Card Number</span>
                    {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="d-flex flex-row">
                    <div className="inputbox">
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="form-control"
                        required
                      />
                      <span>Expiration Date (MM/YY)</span>
                      {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                    </div>
                    <div className="inputbox">
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="form-control"
                        required
                      />
                      <span>CVV</span>
                      {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="px-5 pay">
                    <button
                      className="btn btn-success btn-block"
                      onClick={handleOrderConfirm}
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Disclaimer */}
              <p className="mt-3 px-4 p-Disclaimer">
                <em>Payment Disclaimer:</em> In no event shall payment or partial payment by the owner for any material or service.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
