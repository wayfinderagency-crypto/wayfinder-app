type Step1Props = {
  data: { fullName: string; email: string; age: string };
  onChange: (field: string, value: any) => void;
};

export default function Step1({ data, onChange }: Step1Props) {
  return (
    <div className="step">
      <h2>
        <span className="text-pink">Model</span> Application
      </h2>
      <p className="fs-5 mn-3">OnlyFans Model Application Form</p>

      <div className="mb-3">
        <label className="form-label fs-5">Full Name *</label>
        <input
          type="text"
          className="form-control"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Email *</label>
        <input
          type="email"
          className="form-control"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Age</label>
        <input
          type="text"
          className="form-control"
          value={data.age}
          onChange={(e) => onChange("age", e.target.value)}
        />
      </div>
    </div>
  );
}
