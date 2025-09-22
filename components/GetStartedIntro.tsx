"use client";

interface GetStartedIntroProps {
  onNext: () => void;
}

export default function GetStartedIntro({ onNext }: GetStartedIntroProps) {
  return (
    <div className="text-center mt-5">
      <h1>
        <span className="text-pink">Thanks</span> for checking us out!
      </h1>
      <p className="fs-5 my-3">
        Let&apos;s get to know you & see if we can be of help.
      </p>
      <button className="btn fs-5 btn-lg px-4 rounded-5" onClick={onNext}>
        Let's go!
      </button>
    </div>
  );
}
