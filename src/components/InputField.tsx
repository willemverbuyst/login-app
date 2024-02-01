import {
  Dispatch,
  HTMLInputTypeAttribute,
  RefObject,
  SetStateAction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type Api = {
  focus: () => void;
  setError: (msg: string) => void;
};

function InputField(props: {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  apiRef: RefObject<Api>;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    props.apiRef,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      setError: (msg: string) => setErrorMessage(msg),
    }),
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    props.setValue(e.target.value);
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "3rem",
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
        ref={inputRef}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={handleChange}
      />
      <p
        style={{
          color: "red",
          fontSize: "80%",
          margin: 0,
          textAlign: "left",
        }}
      >
        {errorMessage}
      </p>
    </section>
  );
}

export default InputField;
