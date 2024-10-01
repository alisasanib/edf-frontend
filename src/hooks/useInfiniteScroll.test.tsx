import { renderHook } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  let mockLoadMore: jest.Mock;

  beforeEach(() => {
    mockLoadMore = jest.fn();
    window.innerHeight = 1000;
    Object.defineProperty(document.body, "offsetHeight", {
      writable: true,
      configurable: true,
      value: 1500,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call loadMore when the bottom of the page is reached", () => {
    window.scrollY = 600;

    renderHook(() => useInfiniteScroll(false, mockLoadMore, 100));

    window.dispatchEvent(new Event("scroll"));

    expect(mockLoadMore).toHaveBeenCalled();
  });

  test("should not call loadMore when loading is true", () => {
    window.scrollY = 600;

    renderHook(() => useInfiniteScroll(true, mockLoadMore, 100));

    window.dispatchEvent(new Event("scroll"));
    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  test("should remove event listener on unmount", () => {
    const { unmount } = renderHook(() => useInfiniteScroll(false, mockLoadMore, 100));
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
