type Step3Fields = "long_text";

type Step3Props = {
  data: { long_text: string };
  onChange: (field: Step3Fields, value: string) => void;
};

export default function Step3({ data, onChange }: Step3Props) {
  return (
    <div className="step">
      <div className="mb-3">
        <label className="form-label fs-5" htmlFor="of">
          Why do you want to start on OnlyFans? Do you already have an account?
          What&rsquo;s your goal? Feel free to share any details that come to
          mind.
        </label>
        <textarea
          name="of"
          id="of"
          className="form-control"
          value={data.long_text}
          onChange={(e) => onChange("long_text", e.target.value)}
        ></textarea>
        <p className="text-secondary">
          Note: This field isn&rsquo;t required. If you can&rsquo;t think of
          anything, just skip it! 🙂
        </p>
        <p className="fs-5 text-center">
          Feel free to share more information with us!
        </p>
      </div>
    </div>
  );
}
