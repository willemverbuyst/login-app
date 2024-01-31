import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

function InputField(props: {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label
        htmlFor={props.id}
        style={{
          padding: "0.5rem",
        }}
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </section>
  );
}

export default InputField;
