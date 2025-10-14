"use client";
import Stars from "./Stars";

export default function Footer() {
  return (
    <>
      <footer className="bg-pink">
        <div className="stars-container w-100 overflow-x-hidden"></div>
        <div className="container p-5">
          <img
            src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757947373/Logo-PNG_1_cy9caf.webp"
            alt="logo"
            className="d-block m-auto mt-3"
            style={{ width: "250px" }}
          />
          <div className="row justify-content-center align-items-center mt-4">
            <div className="col-auto">
              <a
                className="nav-link fs-5 fw-bold"
                aria-current="page"
                href="https://www.wayfinder-agency.com/how-we-work"
              >
                How we work
              </a>
            </div>
            <div className="col-auto">
              <div className="vr"></div>
            </div>
            <div className="col-auto">
              <a
                className="nav-link fs-5 fw-bold"
                href="https://www.wayfinder-agency.com/blog"
              >
                Blog
              </a>
            </div>
            <div className="col-auto">
              <div className="vr"></div>
            </div>
            <div className="col-auto">
              <a
                className="nav-link fs-5 fw-bold"
                href="https://www.wayfinder-agency.com/#faq"
              >
                FAQ
              </a>
            </div>
            <div className="col-auto">
              <div className="vr"></div>
            </div>
            <div className="col-auto">
              <a
                className="nav-link fs-5 fw-bold"
                href="https://www.wayfinder-agency.com/get-started"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="row justify-content-center w-100 mt-4">
            <div className="col-auto">
              <a href="https://www.instagram.com/wayfinder.management/">
                <i className="fa-brands fa-instagram fs-3 text-white"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-top border-white p-4">
          <p className="fs-4 m-0 text-center">
            Copyright © Wayfinder Agency 2025 - All Rights Reserved
          </p>
        </div>
      </footer>
      <Stars />
    </>
  );
}
