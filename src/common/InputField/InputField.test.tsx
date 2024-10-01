import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./";

describe("InputField Component", () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();

  const defaultProps = {
    value: "",
    onChange: mockOnChange,
    onFocus: mockOnFocus,
    onBlur: mockOnBlur,
    onKeyDown: mockOnKeyDown,
    placeholder: "Search for a country",
    isAutoComplete: true,
    ariaExpanded: false,
    ariaControls: "autocomplete-list",
    ariaLabel: "Search for a country",
  };

  test("<InputField />", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-label", "Search for a country");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-controls", "autocomplete-list");
    expect(input).toHaveAttribute("placeholder", "Search for a country");
    expect(input).toHaveAttribute("autoComplete", "off");
  });

  test("calls onChange when the input value is changed", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "Germany" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    expect(mockOnChange).toHaveBeenCalledWith("Germany");
  });

  test("displays an error message when errorMessage is provided", () => {
    render(
      <InputField
        {...defaultProps}
        errorMessage='Test Error Message'
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Test Error Message");
  });

  test("calls onFocus and onBlur correctly", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");

    fireEvent.focus(input);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test("handles key down events", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
  });
});
