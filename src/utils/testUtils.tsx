import { RenderOptions, RenderResult, render } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeProvider"; // Adjust the import based on your file structure

export const renderWithTheme = (ui: React.ReactElement, options?: RenderOptions): RenderResult => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
};
