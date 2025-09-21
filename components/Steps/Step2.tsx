type Step2Props = {
  data: {
    timeAvailable: string;
    origin: string;
    contentType: string;
    startDate: string;
  };
  onChange: (field: string, value: any) => void;
};

export default function Step2({ data, onChange }: Step2Props) {
  return (
    <div className="step">
      <div className="mb-3">
        <label className="form-label fs-5">
          How much time do you have available to create content per day?
        </label>
        <input
          type="text"
          className="form-control"
          value={data.timeAvailable}
          onChange={(e) => onChange("timeAvailable", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Origin</label>
        <input
          type="text"
          className="form-control"
          value={data.origin}
          onChange={(e) => onChange("origin", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">
          What type of content are you willing to create?
        </label>
        <input
          type="text"
          className="form-control"
          value={data.contentType}
          onChange={(e) => onChange("contentType", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">How soon can you start?</label>
        <input
          type="text"
          placeholder="dd.mm.yyyy"
          className="form-control"
          value={data.startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
        />
      </div>
    </div>
  );
}
