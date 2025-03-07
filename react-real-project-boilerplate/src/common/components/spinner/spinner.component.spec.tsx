import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { usePromiseTracker } from "react-promise-tracker";
import { SpinnerComponent } from "./spinner.component";

vi.mock("react-promise-tracker", () => ({
  usePromiseTracker: vi.fn()
}));

const useMockPromiseTracker = usePromiseTracker as Mock;

describe("Spinner Component specs", () => {
  it("should not show the modal when there are no promises in progress", () => {
    // Arrange
    useMockPromiseTracker.mockReturnValue({ promiseInProgress: false });

    // Act
    render(<SpinnerComponent />);
    
    // Assert
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("should show the modal when there are no promises in progress", async () => {
    // Arrange
    useMockPromiseTracker.mockReturnValue({ promiseInProgress: true });
    
    // Act
    render(<SpinnerComponent />);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByRole("presentation")).toBeInTheDocument();
    });
  });

  it("should hide the modal after the promise is resolved", async () => {
    // Arrange
    useMockPromiseTracker.mockReturnValue({ promiseInProgress: true });

    // Act
    const { rerender } = render(<SpinnerComponent />);

    // Assert
    await waitFor(() => {
      expect(screen.getByRole("presentation")).toBeInTheDocument();
    });

    useMockPromiseTracker.mockReturnValue({ promiseInProgress: false });

    rerender(<SpinnerComponent />);

    await waitFor(() => {
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    });
  });
});
