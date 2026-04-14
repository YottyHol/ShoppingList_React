export type ShoppingListItem = {
  id: string;
  name: string;
  price: number;
  completed: boolean;
  deleted: boolean;
};

export type NewShoppingListItem = Omit<
  ShoppingListItem,
  "id" | "completed" | "deleted"
>;
