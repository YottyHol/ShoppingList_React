import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "../App";
import { useShoppingListStore } from "../stores/shoppingListStore";
import { mockShoppingItems } from "../utils/mockShoppingItems";

describe("App success flows", () => {
  beforeEach(() => {
    localStorage.clear();
    useShoppingListStore.setState({ items: [...mockShoppingItems] });
  });

  it("shows shopping items as a list", () => {
    render(<App />);

    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
    expect(screen.getByText("Eggs")).toBeInTheDocument();
    expect(screen.getByText("Apples")).toBeInTheDocument();
  });

  it("adds an item to the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /add item/i }));
    await user.type(screen.getByLabelText("Name"), "Coffee");
    await user.type(screen.getByLabelText("Price (£)"), "5.50");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("£5.50")).toBeInTheDocument();
  });

  it("removes an item from the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Remove Milk" }));

    expect(screen.queryByText("Milk")).not.toBeInTheDocument();
  });

  it("ticks off an item in the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    const milkCheckbox = screen.getByRole("checkbox", {
      name: "Mark Milk as done",
    });
    expect(milkCheckbox).not.toBeChecked();

    await user.click(milkCheckbox);

    expect(
      screen.getByRole("checkbox", {
        name: "Mark Milk as not done",
      }),
    ).toBeChecked();
  });

  it("shows the total price", () => {
    render(<App />);

    // 1.50 + 2.00 + 3.25 + 2.75 = 9.50
    expect(screen.getByText("Current shopping list")).toBeInTheDocument();
    expect(screen.getByText("£9.50")).toBeInTheDocument();
  });

  it("shows over-budget status when spending limit is exceeded", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Your budget (£)"), "8");

    expect(screen.getByText("Over budget by £1.50")).toBeInTheDocument();
  });
});
