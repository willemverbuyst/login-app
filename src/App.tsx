import { FormEvent, useRef, useState } from "react";
import "./App.css";
import InputField, { Api } from "./components/InputField";

function App() {
  const userNameRef = useRef<Api>(null);
  const passwordRef = useRef<Api>(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();

    if (userName && password) {
      console.log(userName, password);
      setUserName("");
      setPassword("");
    }
  }

  function validate() {
    if (!userName.trim()) {
      userNameRef.current?.focus();
      userNameRef.current?.setError("username is missing");
    }
    if (!password.trim()) {
      passwordRef.current?.focus();
      passwordRef.current?.setError("password is missing");
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
        apiRef={userNameRef}
      />
      <InputField
        id="password"
        label="PASSWORD"
        type="password"
        value={password}
        setValue={setPassword}
        apiRef={passwordRef}
      />

      <section>
        <button type="submit" disabled={!userName && !password}>
          SUBMIT
        </button>
      </section>
    </form>
  );
}

export default App;
