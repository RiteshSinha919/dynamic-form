import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EducationCardItem from "./index";
import formStore from "../../../store/FormStore";

jest.mock("../../../store/FormStore", () => ({
  updateFormRecord: jest.fn(),
  removeFormRecord: jest.fn(),
}));

describe("EducationCardItem", () => {
  const mockProps = {
    id: "test-id",
    institute: "Test Institute",
    degree: "Test Degree",
    errors: {
      institute: "",
      degree: "",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the education card item component with initial values", () => {
    render(<EducationCardItem {...mockProps} />);

    const instituteInput = screen.getByLabelText("Institute Name");
    const degreeInput = screen.getByLabelText("Degree");

    expect(instituteInput).toHaveValue("Test Institute");
    expect(degreeInput).toHaveValue("Test Degree");
  });

  it("display error messages when provided", () => {
    const propsWithErrors = {
      ...mockProps,
      errors: {
        institute: "Institute is required",
        degree: "Degree is required",
      },
    };

    render(<EducationCardItem {...propsWithErrors} />);

    expect(screen.getByText("Institute is required")).toBeInTheDocument();
    expect(screen.getByText("Degree is required")).toBeInTheDocument();
  });

  it("calls updateFormRecord when institute input changes", () => {
    render(<EducationCardItem {...mockProps} />);

    const instituteInput = screen.getByLabelText("Institute Name");
    fireEvent.change(instituteInput, { target: { value: "New Institute" } });

    expect(formStore.updateFormRecord).toHaveBeenCalledWith(
      "test-id",
      "institute",
      "New Institute"
    );
  });

  it("calls updateFormRecord when degree input changes", () => {
    render(<EducationCardItem {...mockProps} />);

    const degreeInput = screen.getByLabelText("Degree");
    fireEvent.change(degreeInput, { target: { value: "New Degree" } });

    expect(formStore.updateFormRecord).toHaveBeenCalledWith(
      "test-id",
      "degree",
      "New Degree"
    );
  });

  it("calls removeFormRecord when close button is clicked", () => {
    render(<EducationCardItem {...mockProps} />);

    const closeButton = screen.getByText("x");
    fireEvent.click(closeButton);

    expect(formStore.removeFormRecord).toHaveBeenCalledWith("test-id");
  });
});
