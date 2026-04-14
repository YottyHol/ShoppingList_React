import type { ShoppingListItem } from "../types/ShoppingListItem";

export const mockShoppingItems: ShoppingListItem[] = [
  {
    id: "1",
    name: "Milk",
    price: 1.5,
    completed: false,
  },
  {
    id: "2",
    name: "Bread",
    price: 2.0,
    completed: false,
  },
  {
    id: "3",
    name: "Eggs",
    price: 3.25,
    completed: true,
  },
  {
    id: "4",
    name: "Apples",
    price: 2.75,
    completed: false,
  },
];
