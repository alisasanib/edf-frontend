import { render, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import useOutsideClick from "./useClickOutside";

const TestComponent = ({ callback }: { callback: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, callback);

  return (
    <div>
      <div
        data-testid='inside'
        ref={ref}>
        Inside Element
      </div>
      <div data-testid='outside'>Outside Element</div>
    </div>
  );
};

describe("useOutsideClick", () => {
  test("calls the callback when clicking outside the element", () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent callback={callback} />);
    fireEvent.mouseDown(getByTestId("outside"));
    expect(callback).toHaveBeenCalled();
  });

  test("does not call the callback when clicking inside the element", () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent callback={callback} />);

    fireEvent.mouseDown(getByTestId("inside"));
    expect(callback).not.toHaveBeenCalled();
  });
});
