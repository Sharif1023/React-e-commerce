import React from 'react';

const About = () => (
  <>
    <section className="container py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 text-center fw-bold" style={{ letterSpacing: '2px', color: '#2c3e50' }}>
        About Us
      </h2>
      <p className="lead text-center text-muted mb-5" style={{ fontSize: '1.25rem' }}>
        Welcome to <span style={{ color: '#007bff', fontWeight: '700' }}>Our Exclusive E-Commerce Store</span>, 
        where quality meets affordability.
      </p>
      <div className="bg-light p-4 rounded shadow-sm">
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#34495e' }}>
          At our store, we pride ourselves on curating a premium selection of products designed to meet your needs and exceed expectations.
          Our mission is to deliver a seamless, personalized shopping experience that empowers you to discover exceptional value without compromise.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#34495e' }}>
          With dedicated customer support, secure payment options, and fast shipping, we are committed to making your online shopping safe, enjoyable, and reliable.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#34495e' }}>
          Thank you for choosing us. We look forward to serving you and helping you find exactly what you're looking for.
        </p>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Our E-Commerce Store. All rights reserved.
      </p>
      <small>
        Designed with ❤️ by Sharnduuuuu
      </small>
    </footer>
  </>
);

export default About;
