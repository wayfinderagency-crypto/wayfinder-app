// "use client";

// import { useRef, useState } from "react";
// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha,
// } from "react-google-recaptcha-v3";

// function ContactForm() {
//   const { executeRecaptcha } = useGoogleReCaptcha();
//   const formRef = useRef<HTMLFormElement>(null);
//   const [status, setStatus] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!executeRecaptcha) {
//       setStatus("Recaptcha not loaded yet, please try again later.");
//       return;
//     }

//     if (!formRef.current) {
//       setStatus("The form could not be found.");
//       return;
//     }

//     const form = formRef.current;

//     // Pobieramy wartości pól
//     const nameInput = form.elements.namedItem(
//       "name"
//     ) as HTMLInputElement | null;
//     const emailInput = form.elements.namedItem(
//       "email"
//     ) as HTMLInputElement | null;
//     const phoneInput = form.elements.namedItem(
//       "phone"
//     ) as HTMLInputElement | null;
//     const messageInput = form.elements.namedItem(
//       "mess"
//     ) as HTMLTextAreaElement | null;

//     if (!nameInput || !emailInput || !messageInput) {
//       setStatus("Required fields are missing in the form.");
//       return;
//     }

//     const name = nameInput.value;
//     const email = emailInput.value;
//     const phone = phoneInput?.value;
//     const message = messageInput.value;

//     try {
//       setStatus("Checking recaptcha...");
//       const token = await executeRecaptcha("contact_form");

//       const resCaptcha = await fetch("/api/verify-captcha", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const dataCaptcha = await resCaptcha.json();

//       if (!dataCaptcha.success || dataCaptcha.score <= 0.5) {
//         setStatus("Suspicious activity, please try again..");
//         return;
//       }

//       setStatus("I am sending a message...");
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, phone, message }),
//       });

//       if (res.ok) {
//         setStatus("Message sent!");
//         form.reset();
//       } else {
//         setStatus("Error sending email.");
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus("A network or server error has occurred.");
//     }
//   };

//   return (
//     <>
//       <section className="text mt-5 pt-5">
//         <div className="container mt-5">
//           <h1 className="display-3 fw-bold text-center my-4">
//             Get in <span className="text-pink">Touch</span>
//           </h1>
//           <p className="fs-4 text-center w-75 mx-auto">
//             Have a quick question? Looking to partner or work together? Reach
//             out through the form and we'll get back to you in under 24 hours.
//           </p>
//           <div className="d-flex justify-content-center">
//             <p className="d-inline-block fs-6 fs-md-4 mx-2 mx-md-4">
//               <a href="">
//                 <i className="fa-brands fa-square-instagram text-pink icon-with-heart fs-3"></i>
//               </a>
//               Instagram
//             </p>
//           </div>
//         </div>
//       </section>
//       <section className="form p-3">
//         <div className="container bg-pink w-100 w-md-25 p-5 rounded-4 my-5 shadow">
//           <form ref={formRef} onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label fw-bold fs-5">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label fw-bold fs-5">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label fw-bold fs-5">
//                 Phone:
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phone"
//                 name="phone"
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="mess" className="form-label fw-bold fs-5">
//                 Message:
//               </label>
//               <textarea
//                 name="mess"
//                 id="mess"
//                 className="form-control"
//                 required
//               ></textarea>
//             </div>
//             <input
//               type="submit"
//               value="Send message"
//               className="btn fs-5 d-block px-3 py-2 rounded-5 mx-auto mt-5 btn-second"
//             />
//             {status && <p className="mt-3 text-center">{status}</p>}
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default function Contact() {
//   return (
//     <GoogleReCaptchaProvider
//       reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
//     >
//       <ContactForm />
//     </GoogleReCaptchaProvider>
//   );
// }
