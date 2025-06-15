import React from "react";
import InputField from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

describe("testing input field component", () => {
  const mockHandleChangeFunct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render with proper label", () => {
    render(
      <InputField
        inputLabel="college"
        inputValue=""
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    const inputElement = screen.getByLabelText("college");

    expect(inputElement).toBeInTheDocument();
    console.log(inputElement);

    expect(inputElement).toHaveTextContent("college");
  });
});
