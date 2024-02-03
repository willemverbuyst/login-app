import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("should render with the title visible", () => {
    render(<App />);

    expect(screen.getByText(/login/i)).toBeDefined();
  });

  it("should render with 2 input fields and a button", () => {
    render(<App />);

    expect(screen.getByRole("textbox", { name: /user name/i })).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();
  });

  it("should render welcome message after submitting form correctly", () => {
    render(<App />);

    const userNameInput = screen.getByRole("textbox", {
      name: /USER NAME/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(userNameInput, { target: { value: "John Doe" } });
    fireEvent.change(passwordInput, { target: { value: "anypassword" } });
    fireEvent.click(button);

    expect(screen.getByText("Welcome John Doe")).toBeDefined();
    expect(screen.getByRole("button", { name: /log out/i })).toBeDefined();
  });
});
