import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import SteakTimer from "../components/SteakTimer";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("SteakTimer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders the header", () => {
    render(<SteakTimer />);
    expect(screen.getByText(/Steak Timer/i)).toBeInTheDocument();
  });

  it("disables dropdowns when timer is running", () => {
    render(<SteakTimer />);
    // Targeting the first <select> element (the "Cut" dropdown)
    const [cutDropdown] = screen.getAllByRole("combobox");
    expect(cutDropdown).not.toBeDisabled();

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
    });
    expect(cutDropdown).toBeDisabled();
  });

});
