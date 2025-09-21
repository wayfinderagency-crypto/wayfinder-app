type Step5Props = {
  data: { tiktok60: boolean; phonesCount: string };
  onChange: (field: string, value: any) => void;
};

export default function Step5({ data, onChange }: Step5Props) {
  return (
    <div className="step">
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="tikTok60"
          checked={data.tiktok60}
          onChange={(e) => onChange("tiktok60", e.target.checked)}
        />
        <label className="form-check-label fs-5" htmlFor="tikTok60">
          Are you able to produce 60 TikToks per day?
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">How many phones do you have?</label>
        <select
          className="form-select"
          value={data.phonesCount}
          onChange={(e) => onChange("phonesCount", e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8+">8+</option>
        </select>
      </div>
    </div>
  );
}
