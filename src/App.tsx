import { FormEvent, useRef, useState } from "react";
import "./App.css";
import InputField, { Api } from "./components/InputField";

function App() {
  const userNameRef = useRef<Api>(null);
  const passwordRef = useRef<Api>(null);

  const [loggedInUser, setLoggedInUser] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;
    validate(userName, password);

    if (userName && password) {
      setLoggedInUser(userName);
    }
  }

  function validate(
    userName: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) {
    if (!userName || (typeof userName === "string" && !userName.trim())) {
      userNameRef.current?.focus();
      userNameRef.current?.setError("username is missing");
    }
    if (!password || (typeof password === "string" && !password.trim())) {
      passwordRef.current?.focus();
      passwordRef.current?.setError("password is missing");
    }
  }

  function goToForm() {
    setLoggedInUser("");
  }

  return loggedInUser ? (
    <main>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={goToForm}>LOG OUT</button>
    </main>
  ) : (
    <main>
      <h1>Login</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <InputField
          id="userName"
          label="USER NAME"
          type="text"
          apiRef={userNameRef}
        />
        <InputField
          id="password"
          label="PASSWORD"
          type="password"
          apiRef={passwordRef}
        />

        <section>
          <button type="submit">SUBMIT</button>
        </section>
      </form>
    </main>
  );
}

export default App;
