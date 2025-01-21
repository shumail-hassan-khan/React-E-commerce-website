import React, { useState } from "react";
import emailjs from "emailjs-com";

const subTitle = "Sell Your Product";
const title = (
  <h2 className="title">
    Fill the Form to <b>Sell</b> Your <span className="yellow-color">Items</span>
  </h2>
);
const desc = "Provide details about your product and we will get back to you.";
const regTitle = "Sell Your Product";
const btnText = "Submit";

const Register = () => {
  const [category, setCategory] = useState("");
  const [priceMessage, setPriceMessage] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "furniture") {
      setPriceMessage(
        "This item should sell around 5000 PKR to 10000 PKR. We will let you know after our team visits to check your item."
      );
    } else if (selectedCategory === "clothes") {
      setPriceMessage(
        "This item should sell around 0 PKR to 2500 PKR. We will let you know after our team visits to check your item."
      );
    } else if (selectedCategory === "other") {
      setPriceMessage(
        "Our team will visit and let you know the price after assessing your item."
      );
    } else {
      setPriceMessage("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const imageUrl = form.image.files[0]; // Get the imageUrl from the image input

    // Make sure an image is uploaded
    if (!imageUrl) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("number", form.number.value);
    formData.append("category", form.category.value);
    formData.append("description", form.description.value);
    formData.append("image", imageUrl);  // Append the image file

    // Now, use send() to send the form data to EmailJS
    emailjs
      .sendForm(
        "service_7hir95s",  // Replace with your EmailJS service ID
        "template_vipt4e8",  // Replace with your EmailJS template ID
        form,                // The form element that contains the data
        "9LJWhpgG0a0jfafjz"  // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          alert("Form submitted successfully!");
          form.reset();
          setCategory("");
          setPriceMessage("");
        },
        (error) => {
          alert("Error sending email: " + error.text);
        }
      );
  };



  return (
    <section className="register-section padding-tb pb-0">
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
          <div className="col">
            <div className="section-header">
              <span className="subtitle">{subTitle}</span>
              {title}
              <p>{desc}</p>
            </div>
          </div>
          <div className="col">
            <div className="section-wrapper">
              <h4>{regTitle}</h4>
              <form className="register-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="reg-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="reg-input"
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone"
                  className="reg-input"
                  required
                />
                <select
                  name="category"
                  className="reg-input"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothes">Clothes</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="file"
                  name="image"
                  className="reg-input"
                  accept="image/*"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Describe your item (max 500 characters)"
                  className="reg-input"
                  maxLength="500"
                  required
                ></textarea>
                {priceMessage && (
                  <p className="price-message">{priceMessage}</p>
                )}
                <button type="submit" className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
