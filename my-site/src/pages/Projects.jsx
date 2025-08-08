import React from 'react';

const Projects = () => (
  <section className="container py-5" style={{ maxWidth: '800px' }}>
    <h2 className="mb-4 text-center fw-bold" style={{ letterSpacing: '1px', color: '#2c3e50' }}>
      Our Ongoing Initiatives
    </h2>

    <p className="lead text-muted text-center mb-5">
      We're constantly evolving to provide a world-class shopping experience. Here’s a glimpse into some of our key projects:
    </p>

    <div className="bg-light p-4 rounded shadow-sm">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          🚀 <strong>Launching Exclusive Product Lines</strong><br />
          Introducing premium collections tailored for our valued customers.
        </li>
        <li className="list-group-item">
          🔒 <strong>Integrating Secure Online Payment Systems</strong><br />
          Implementing trusted platforms like SSLCommerz, bKash, Nagad, and more.
        </li>
        <li className="list-group-item">
          🚚 <strong>Enhancing Delivery Logistics</strong><br />
          Partnering with reliable couriers for faster, nationwide delivery.
        </li>
        <li className="list-group-item">
          📱 <strong>Developing Mobile Shopping App</strong><br />
          A seamless, on-the-go experience with exclusive app-only deals.
        </li>
        <li className="list-group-item">
          🌱 <strong>Eco-Friendly Packaging</strong><br />
          Reducing plastic waste by switching to biodegradable packaging.
        </li>
        <li className="list-group-item">
          🤝 <strong>Supporting Local Communities</strong><br />
          Collaborating with local artisans and small businesses to showcase their products.
        </li>
      </ul>
    </div>
  </section>
);

export default Projects;
