import React from "react";
import InputField from "./index";
import { render, screen, fireEvent } from "@testing-library/react";

describe("testing input field component", () => {
  const mockHandleChangeFunct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render input with correct props", () => {
    render(
      <InputField
        inputLabel="college"
        inputValue="NIT"
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    const labelElement = screen.getByText("college");
    const inputElement = screen.getByLabelText("college");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("id", "college");
    expect(inputElement).toHaveAttribute("value", "NIT");
  });

  it("showing error message when provided", () => {
    render(
      <InputField
        inputLabel="college"
        inputValue=""
        onChange={mockHandleChangeFunct}
        errorMessage="field required"
      />
    );

    const errorElement = screen.getByText("field required");

    expect(errorElement).toBeInTheDocument();
  });
  it("handle input change correctly", () => {
    render(
      <InputField
        inputLabel="college"
        inputValue=""
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    const inputElement = screen.getByLabelText("college");

    fireEvent.change(inputElement, { target: { value: "NIT" } });

    expect(mockHandleChangeFunct).toHaveBeenCalledWith(
      expect.objectContaining({
        target: inputElement,
      })
    );
  });

  it("should not show error message when empty string is provided", () => {
    render(
      <InputField
        inputLabel="college"
        inputValue=""
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    const errorElement = screen.queryByText("field required");
    expect(errorElement).not.toBeInTheDocument();
  });

  it("should update input value when value prop changes", () => {
    const { rerender } = render(
      <InputField
        inputLabel="college"
        inputValue=""
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    const inputElement = screen.getByLabelText("college");
    expect(inputElement).toHaveValue("");

    rerender(
      <InputField
        inputLabel="college"
        inputValue="NIT"
        onChange={mockHandleChangeFunct}
        errorMessage=""
      />
    );

    expect(inputElement).toHaveValue("NIT");
  });
});
