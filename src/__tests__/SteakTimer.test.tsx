import {
  render,
  screen,
  fireEvent,
  waitFor,
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

  it("starts the timer and updates time left as integer", async () => {
    render(<SteakTimer />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
    });

    const totalTimeEl = screen.getByText(/Total:/i);
    const totalTimeMatch = totalTimeEl.textContent?.match(/\d+/);
    const totalTime = totalTimeMatch ? parseInt(totalTimeMatch[0]) : 0;

    expect(
      screen.getByText(new RegExp(`Left: ${totalTime}s`, "i"))
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`Left: ${totalTime - 1}s`, "i"))
      ).toBeInTheDocument();
    });
  });

  it("displays the flip message at halfway", async () => {
    render(<SteakTimer />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
    });

    const totalTimeEl = screen.getByText(/Total:/i);
    const totalTimeMatch = totalTimeEl.textContent?.match(/\d+/);
    const totalTime = totalTimeMatch ? parseInt(totalTimeMatch[0]) : 0;
    const halfway = Math.floor(totalTime / 2);

    await act(async () => {
      vi.advanceTimersByTime((halfway - 1) * 1000);
    });
    expect(screen.queryByText(/Flip Your Steak Now/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Flip Your Steak Now/i)).toBeInTheDocument();
    });
  });

  it("displays the finished message when timer ends", async () => {
    render(<SteakTimer />);
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
    });

    const totalTimeEl = screen.getByText(/Total:/i);
    const totalTimeMatch = totalTimeEl.textContent?.match(/\d+/);
    const totalTime = totalTimeMatch ? parseInt(totalTimeMatch[0]) : 0;

    // Wrap the timer advance in an async act so that all state updates flush
    await act(async () => {
      vi.advanceTimersByTime(totalTime * 1000);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Finished! Pick up your steak now!/i)
      ).toBeInTheDocument();
    });
  });
});
