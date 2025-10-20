type Step1Fields = "fullName" | "age" | "instagram" | "origin";

type Step1Props = {
  data: {
    fullName: string;
    age: string;
    instagram: string;
    origin: string;
  };
  onChange: (field: Step1Fields, value: string) => void;
};

export default function Step1({ data, onChange }: Step1Props) {
  return (
    <div className="step">
      <h2>
        <span className="text-pink">Model</span> Application
      </h2>
      <p className="fs-5 mn-3">OnlyFans Model Application Form</p>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="name">
          What&rsquo;s your name? *
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="age">
          How old are you?
        </label>
        <input
          id="age"
          type="text"
          className="form-control"
          value={data.age}
          onChange={(e) => onChange("age", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="origin">
          Origin
        </label>
        <input
          id="origin"
          type="text"
          className="form-control"
          value={data.origin}
          onChange={(e) => onChange("origin", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="ig">
          What&rsquo;s your Instagram handle?
        </label>
        <input
          id="ig"
          type="text"
          className="form-control"
          value={data.instagram}
          onChange={(e) => onChange("instagram", e.target.value)}
        />
        <p className="text-secondary">
          <span className="text-danger">Important</span>: Please provide your
          username. We don&rsquo;t use this account for OF, but only to verify
          that you&rsquo;re a real person
        </p>
      </div>
    </div>
  );
}
