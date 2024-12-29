import "@testing-library/jest-dom";
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

  it("should render a welcome message after submitting form correctly", () => {
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

  it("should render an error message when password is missing", () => {
    render(<App />);

    const userNameInput = screen.getByRole("textbox", {
      name: /USER NAME/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(userNameInput, { target: { value: "John Doe" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/password is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(passwordInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when username is missing", () => {
    render(<App />);

    const userNameInput = screen.getByRole("textbox", {
      name: /USER NAME/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(passwordInput, { target: { value: "anypassword" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/username is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("should render an error message when username is an empty string", () => {
    render(<App />);

    const usernameInput = screen.getByRole("textbox", {
      name: /USERNAME/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: " " } });
    fireEvent.change(passwordInput, { target: { value: "anypassword" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/username is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(usernameInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when password is an empty string", () => {
    render(<App />);

    const usernameInput = screen.getByRole("textbox", {
      name: /USERNAME/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.change(passwordInput, { target: { value: " " } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/password is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(usernameInput.matches(":focus")).toBe(true);
  });

  it("should render error messages when values are missing", () => {
    render(<App />);

    const userNameInput = screen.getByRole("textbox", {
      name: /USER NAME/i,
    }) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(button);

    const errorMessagePassword = screen.getByText(/password is missing/i);
    expect(errorMessagePassword).toBeDefined();
    expect(errorMessagePassword).toHaveStyle({ color: "rgb(255, 0, 0)" });
    const errorMessageUserName = screen.getByText(/username is missing/i);
    expect(errorMessageUserName).toBeDefined();
    expect(errorMessageUserName).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(userNameInput.matches(":focus")).toBe(true);
  });

  it("should navigate back to empty form", () => {
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

    const logoutBtn = screen.getByRole("button", { name: /log out/i });
    fireEvent.click(logoutBtn);

    expect(screen.getByText(/login/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();

    const userNameInputRevisit = screen.getByRole("textbox", {
      name: /USER NAME/i,
    }) as HTMLInputElement;
    const passwordInputRevisit = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    expect(userNameInputRevisit.value).toBe("");
    expect(passwordInputRevisit.value).toBe("");
  });
});
