import { RenderOptions, RenderResult, render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeProvider";

export const renderWithTheme = (ui: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
};
