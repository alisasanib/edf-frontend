import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./";
import { useTheme } from "../../hooks/useTheme";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useTheme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("../../assets/icons/cross-close-svgrepo-com.svg", () => "mocked-close-icon.svg");

describe("<Modal />", () => {
  const mockOnBgClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: false,
    });
  });

  test("renders nothing when 'visible' is false", () => {
    render(
      <Modal visible={false}>
        <div>Test Content</div>
      </Modal>
    );
    const modalContent = screen.queryByText("Test Content");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("renders content when 'visible' is true", () => {
    render(
      <Modal
        visible={true}
        title='Test Modal'
        content='Test Modal Content'
      />
    );

    const modalTitle = screen.getByText("Test Modal");
    const modalContent = screen.getByText("Test Modal Content");
    expect(modalTitle).toBeInTheDocument();

    expect(modalContent).toBeInTheDocument();
  });

  test("calls onBgClick when background is clicked", () => {
    render(
      <Modal
        visible={true}
        title='Test Modal'
        onBgClick={mockOnBgClick}>
        <div>Test Content</div>
      </Modal>
    );

    const background = screen.getByRole("dialog").parentElement;
    fireEvent.mouseDown(background!);

    expect(mockOnBgClick).toHaveBeenCalledTimes(1);
  });

  test("calls onBgClick when 'Escape' key is pressed", () => {
    render(
      <Modal
        visible={true}
        title='Test Modal'
        onBgClick={mockOnBgClick}>
        <div>Test Content</div>
      </Modal>
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(mockOnBgClick).toHaveBeenCalledTimes(1);
  });

  test("closes modal when close button is clicked", () => {
    render(
      <Modal
        visible={true}
        title='Test Modal'
        onBgClick={mockOnBgClick}
      />
    );
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnBgClick).toHaveBeenCalledTimes(1);
  });
});
