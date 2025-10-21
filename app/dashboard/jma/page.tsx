"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function Page() {
  useEffect(() => {
    // If you want to initialize Typed.js or other JS, do it here
  }, []);

  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="#">
              <img
                alt="logo"
                src="https://res.cloudinary.com/dqs4lto99/image/upload/v1670144421/portfolio/mylogo_xf7bgr.png"
                className="brand-logo"
              />
            </a>
          </h1>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Trainings and Certificates
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#work">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#blog">
                  Other Skills
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#resume">
                  Resume
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      {/* ======= Hero Section ======= */}
      <div
        id="hero"
        className="hero route bg-image"
        style={{
          backgroundImage: "url('tavuh/images/pic-vg.jpeg')",
          backgroundSize: "cover",
        }}
      >
        <div className="overlay-itro"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container text-center text-light">
              <p className="display-6 color-d">Hello, world!</p>
              <h1 className="hero-title mb-4">
                I am Joseph Marie M. Alcoy
              </h1>
              <p className="hero-subtitle">
                <span className="typed" data-typed-items="Third Year Student"></span>
              </p>
              <p className="pt-3">
                <a className="btn btn-primary px-4" href="#about" role="button">
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <main id="main">
        {/* ======= About Section ======= */}
        <section id="about" className="about-mf sect-pt4 route">
          <div className="container">
            {/* ...your full About section code goes here unchanged... */}
          </div>
        </section>

        {/* ======= Services Section ======= */}
        <section id="services" className="services-mf pt-5 route">
          <div className="container">
            {/* ...all your service cards... */}
          </div>
        </section>

        {/* ======= Portfolio Section ======= */}
        <section id="work" className="portfolio-mf sect-pt4 route mb-5">
          <div className="container">
            {/* ...your portfolio projects... */}
          </div>
        </section>

        {/* ======= Other Skills ======= */}
        <section id="blog" className="blog-mf sect-pt4 route">
          <div className="container">
            {/* ...other skills content... */}
          </div>
        </section>

        {/* ======= Resume Section ======= */}
        <section id="resume" className="my-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4 mb-4">
                <div className="card resume-card">
                  <img
                    src="tavuh/images/resume.png"
                    className="resume-img"
                    alt="My Resume preview"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">My Resume</h5>
                    <p>
                      <small>
                        Preview of my latest resume. Click below to view or
                        download.
                      </small>
                    </p>
                    <a
                      href="tavuh/images/resume-f.pdf"
                      target="_blank"
                      className="btn btn-outline-primary me-2"
                    >
                      <i className="bi bi-eye"></i> View Resume
                    </a>
                    <a
                      href="tavuh/images/resume-f.pdf"
                      download="My_Resume"
                      className="btn btn-primary"
                    >
                      <i className="bi bi-file-earmark-arrow-down"></i> Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= Contact Section ======= */}
        <section
          id="contact"
          className="paralax-mf footer-paralax bg-image sect-mt4 route"
          style={{
            backgroundImage: "url('assets/img/overlay-bg.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="overlay-mf"></div>
          <div className="container">
            {/* ...contact form + socials... */}
          </div>
        </section>
      </main>

      {/* ======= Footer ======= */}
      <footer>
        <div className="container text-center">
          <p className="copyright">
            © Copyright Alden Derf. All Rights Reserved
          </p>
        </div>
      </footer>

      {/* ======= Scripts ======= */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      <Script src="assets/vendor/purecounter/purecounter_vanilla.js" />
      <Script src="assets/vendor/glightbox/js/glightbox.min.js" />
      <Script src="assets/vendor/swiper/swiper-bundle.min.js" />
      <Script src="assets/vendor/typed.js/typed.umd.js" />
      <Script src="assets/vendor/php-email-form/validate.js" />
      <Script src="assets/js/main.js" />
    </>
  );
}
