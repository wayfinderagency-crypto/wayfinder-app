type Step3Fields = "hasOnlyFans" | "blockedCountries" | "pictures";

type Step3Props = {
  data: {
    hasOnlyFans: boolean;
    blockedCountries: string;
    pictures: FileList | null;
  };
  onChange: (
    field: Step3Fields,
    value: boolean | string | FileList | null
  ) => void;
};

export default function Step3({ data, onChange }: Step3Props) {
  return (
    <div className="step">
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input bg-pink"
          id="onlyfans"
          checked={data.hasOnlyFans}
          onChange={(e) => onChange("hasOnlyFans", e.target.checked)}
        />
        <label className="form-check-label fs-5" htmlFor="onlyfans">
          Do you have an OnlyFans account currently?
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">
          Do you need us to block any countries on OnlyFans?
        </label>
        <input
          type="text"
          className="form-control"
          value={data.blockedCountries}
          onChange={(e) => onChange("blockedCountries", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">
          Please attach pictures of yourself (3-5 Non-nude)
        </label>
        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) => onChange("pictures", e.target.files)}
        />
      </div>
    </div>
  );
}
