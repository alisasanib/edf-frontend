import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "./";
import { SearchOptions } from "../../types/SearchOptions.dto";

describe("SelectField", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    value: "name" as SearchOptions,
    onChange: mockOnChange,
    options: [
      { key: "name", value: "Name" },
      { key: "capital", value: "Capital" },
      { key: "region", value: "Region" },
    ],
    label: "Search by",
  };

  test("renders the select field with correct label and options", () => {
    render(<SelectField {...defaultProps} />);

    const selectMenu = screen.getByTestId("select-menu");

    expect(selectMenu).toBeInTheDocument();
    expect(selectMenu).toHaveValue("name");
    expect(screen.getByLabelText("Search by")).toBeInTheDocument();

    const options = screen.getAllByTestId("select-option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Name");
    expect(options[1]).toHaveTextContent("Capital");
    expect(options[2]).toHaveTextContent("Region");
  });

  test("calls onChange when a different option is selected", () => {
    render(<SelectField {...defaultProps} />);

    const selectMenu = screen.getByTestId("select-menu");
    fireEvent.change(selectMenu, { target: { value: "capital" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("capital");
  });

  test("sets the correct value when an option is selected", () => {
    render(
      <SelectField
        {...defaultProps}
        value='region'
      />
    );
    const selectMenu = screen.getByTestId("select-menu");
    expect(selectMenu).toHaveValue("region");
  });
});
