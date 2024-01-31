import {
  Dispatch,
  HTMLInputTypeAttribute,
  RefObject,
  SetStateAction,
  useImperativeHandle,
  useRef,
} from "react";

export type Api = {
  focus: () => void;
};

function InputField(props: {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  apiRef: RefObject<Api>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    props.apiRef,
    () => ({
      focus: () => {
        console.log(`ENTER A VALUE FOR ${props.id.toLocaleUpperCase()}`);
        inputRef.current?.focus();
      },
    }),
    [props.id]
  );

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
        ref={inputRef}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </section>
  );
}

export default InputField;
