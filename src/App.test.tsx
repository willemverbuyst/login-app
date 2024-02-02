import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("should render with the title visible", () => {
    render(<App />);

    expect(screen.getByText(/Login/i)).toBeDefined();
  });
});
