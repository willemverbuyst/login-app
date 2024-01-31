import { FormEvent, useState } from "react";
import "./App.css";

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
      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label
          htmlFor="userName"
          style={{
            padding: "0.5rem",
          }}
        >
          USER NAME
        </label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </section>
      <section style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="password" style={{ padding: "0.5rem" }}>
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <section>
        <button type="submit">SUBMIT</button>
      </section>
    </form>
  );
}

export default App;
