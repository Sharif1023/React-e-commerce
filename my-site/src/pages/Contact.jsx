import React, { useState } from 'react';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !message) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      e.target.reset();
    } catch (err) {
      setError(err.message);
      setSent(false);
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center fw-bold" style={{ letterSpacing: '2px', color: '#2c3e50' }}>
        Contact Us
      </h2>

      {sent && (
        <div className="alert alert-success text-center shadow-sm">
          ✅ Your message has been sent successfully!
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center shadow-sm">
          ⚠️ {error}
        </div>
      )}

      <form className="row g-4 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="col-md-6 form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            autoComplete="name"
          />
          <label htmlFor="name">Name</label>
          <div className="invalid-feedback">Please enter your name.</div>
        </div>

        <div className="col-md-6 form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            autoComplete="email"
          />
          <label htmlFor="email">Email address</label>
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>

        <div className="col-12 form-floating">
          <textarea
            className="form-control"
            placeholder="Write your message here"
            id="message"
            name="message"
            style={{ height: '120px' }}
            required
          ></textarea>
          <label htmlFor="message">Message</label>
          <div className="invalid-feedback">Please enter your message.</div>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary btn-lg px-5 shadow-sm">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;


