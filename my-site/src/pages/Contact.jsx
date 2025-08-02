import React from 'react';

const Contact = () => (
  <section className="container py-5" style={{ maxWidth: '700px' }}>
    <h2 className="mb-4 text-center fw-bold" style={{ letterSpacing: '2px', color: '#2c3e50' }}>
      Contact Us
    </h2>

    <form className="row g-4 needs-validation" noValidate>
      <div className="col-md-6 form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
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

export default Contact;
