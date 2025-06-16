import React from "react";
import ActionButton from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

describe("testing action button component", () => {
  const mockOnClickFunct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render with proper button text", () => {
    render(<ActionButton buttonText="Add" onClick={mockOnClickFunct} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Add");
  });

  it("working action button click", () => {
    render(<ActionButton buttonText="Add" onClick={mockOnClickFunct} />);
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(mockOnClickFunct).toHaveBeenCalledTimes(1);
  });
});
