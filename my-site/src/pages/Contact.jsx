import React from 'react';

const Contact = () => (
  <div className="container py-5">
    <h2>Contact Us</h2>
    <form className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="col-12">
        <label className="form-label">Message</label>
        <textarea className="form-control" rows="4"></textarea>
      </div>
      <div className="col-12">
        <button className="btn btn-primary">Send</button>
      </div>
    </form>
  </div>
);

export default Contact;
