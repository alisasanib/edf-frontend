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
    options: [
      { id: 1, label: "Option 1" },
      { id: 2, label: "Option 2" },
      { id: 3, label: "Option 3" },
    ],
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

    fireEvent.change(input, { target: { value: "Option 1" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    expect(mockOnChange).toHaveBeenCalledWith("Option 1");
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
    expect(input).toHaveAttribute("aria-expanded", "true");

    fireEvent.blur(input);
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  test("handles ArrowDown and ArrowUp to navigate options", () => {
    render(<InputField {...defaultProps} value="Option"/>);

    const input = screen.getByRole("combobox");

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getAllByTestId("autocomplete-option")[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getAllByTestId("autocomplete-option")[1]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(screen.getAllByTestId("autocomplete-option")[0]).toHaveAttribute("aria-selected", "true");
  });

  test("handles Enter key to select option", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnChange).toHaveBeenCalledWith("Option 2");
  });

  test("handles Escape key to close the list", () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "Escape" });

    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
