type Step1Fields = "fullName" | "email" | "age" | "phone_number";

type Step1Props = {
  data: { fullName: string; email: string; age: string; phone_number: string };
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
          Full Name *
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
        <label className="form-label fs-5" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="phone_number">
          Phone number
        </label>
        <input
          id="phone_number"
          type="text"
          className="form-control"
          value={data.phone_number}
          onChange={(e) => onChange("phone_number", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="age">
          Age
        </label>
        <input
          id="age"
          type="text"
          className="form-control"
          value={data.age}
          onChange={(e) => onChange("age", e.target.value)}
        />
      </div>
    </div>
  );
}
