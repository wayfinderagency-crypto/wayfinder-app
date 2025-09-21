type Step4Props = {
  data: { phone: string; socialMedia: string };
  onChange: (field: string, value: any) => void;
};

export default function Step4({ data, onChange }: Step4Props) {
  return (
    <div className="step">
      <div className="mb-3">
        <label className="form-label fs-5">
          What phone do you have? (camera quality)
        </label>
        <input
          type="text"
          className="form-control"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">
          Social media accounts (followers count)
        </label>
        <input
          type="text"
          className="form-control"
          value={data.socialMedia}
          onChange={(e) => onChange("socialMedia", e.target.value)}
        />
      </div>
    </div>
  );
}
