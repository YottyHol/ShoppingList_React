import { beforeEach, describe, expect, it } from "vitest";
import { useShoppingListStore } from "../stores/shoppingListStore";
import { mockShoppingItems } from "../utils/mockShoppingItems";

describe("shoppingListStore persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    useShoppingListStore.setState({ items: [...mockShoppingItems] });
  });

  it("persists data between sessions through localStorage", async () => {
    useShoppingListStore.getState().addItem({ name: "Bananas", price: 1.2 });

    const storedSnapshot = localStorage.getItem("mayden-shopping-list");
    expect(storedSnapshot).toContain("Bananas");

    useShoppingListStore.setState({ items: [] });
    expect(useShoppingListStore.getState().items).toEqual([]);

    if (storedSnapshot) {
      localStorage.setItem("mayden-shopping-list", storedSnapshot);
    }

    await useShoppingListStore.persist.rehydrate();

    expect(
      useShoppingListStore
        .getState()
        .items.some((item) => item.name === "Bananas"),
    ).toBe(true);
  });
});
