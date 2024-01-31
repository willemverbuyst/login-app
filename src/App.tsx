import { FormEvent, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userName, password);
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
      />
      <InputField
        id="password"
        label="PASSWORD"
        type="password"
        value={password}
        setValue={setPassword}
      />

      <section>
        <button type="submit">SUBMIT</button>
      </section>
    </form>
  );
}

export default App;
