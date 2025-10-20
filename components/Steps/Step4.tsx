export default function Step4({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="text-center text-black">
      <i className="fa-solid fa-paper-plane text-pink d-block mx-auto display-4 mb-3"></i>
      <h2 className="fw-bold">
        Form <span className="text-pink">submitted</span>!
      </h2>
      <p className="fs-5">
        Thank you for completing the form. We will contact you shortly.
      </p>
    </div>
  );
}
