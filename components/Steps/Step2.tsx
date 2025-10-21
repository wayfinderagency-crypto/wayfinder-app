type Step2Fields = "phone_number" | "email" | "pictures";

type Step2Props = {
  data: {
    phone_number: string;
    email: string;
    pictures: FileList | null;
  };
  onChange: (
    field: Step2Fields,
    value: boolean | string | FileList | null
  ) => void;
};

export default function Step2({ data, onChange }: Step2Props) {
  return (
    <div className="step">
      <div className="mb-3">
        <label className="form-label custom-fs" htmlFor="phone_number">
          What&rsquo;s your phone number?
        </label>
        <input
          id="phone_number"
          type="text"
          className="form-control"
          value={data.phone_number}
          onChange={(e) => onChange("phone_number", e.target.value)}
        />
        <p className="text-secondary">
          Disclaimer: We need this number to be able to contact you via text
          message.
        </p>
      </div>

      <div className="mb-3">
        <label className="form-label custom-fs" htmlFor="email">
          Email address:*
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
        <label className="form-label custom-fs">
          Please attach pictures of yourself (3-5 Non-nude)
        </label>
        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) => onChange("pictures", e.target.files)}
        />
        <p className="text-secondary">Not mandatory, but helpful!</p>
      </div>
    </div>
  );
}
