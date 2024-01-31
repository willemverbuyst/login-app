import { FormEvent, useRef, useState } from "react";
import "./App.css";
import InputField, { Api } from "./components/InputField";

function App() {
  const passwordRef = useRef<Api>(null);
  const userNameRef = useRef<Api>(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();
    console.log(userName, password);
  }

  function validate() {
    if (!password.trim()) {
      passwordRef.current?.focus();
    }
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputField
        id="userName"
        label="USER NAME"
        value={userName}
        setValue={setUserName}
        type="text"
        apiRef={passwordRef}
      />
      <InputField
        id="password"
        label="PASSWORD"
        type="password"
        value={password}
        setValue={setPassword}
        apiRef={userNameRef}
      />

      <section>
        <button type="submit">SUBMIT</button>
      </section>
    </form>
  );
}

export default App;
