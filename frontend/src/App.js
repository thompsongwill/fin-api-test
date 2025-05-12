import { useState } from "react";
import axios from "axios";
import "./App.css"; // Link to the CSS file

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    currency: "NGN",
  });

  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentLink("");

    try {
      const res = await axios.post(
        "https://fin-api-test-1.onrender.com/api/initiate-payment",
        formData
      );
      setPaymentLink(res.data.paymentLink);
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Fincra Payment-test</h1>
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="text"
            name="name"
            required
            placeholder="Full Name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            required
            placeholder="Amount"
            className="form-input"
            value={formData.amount}
            onChange={handleChange}
          />
          <select
            name="currency"
            className="form-select"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {paymentLink && (
          <div className="payment-link">
            <a href={paymentLink} target="_blank" rel="noopener noreferrer">
              Click here to complete your payment
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
