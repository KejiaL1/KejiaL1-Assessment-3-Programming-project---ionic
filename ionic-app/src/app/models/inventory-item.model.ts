export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

export enum StockStatus {
  InStock = 'In stock',
  LowStock = 'Low stock',
  OutOfStock = 'Out of stock'
}

export interface InventoryItem {
  item_id?: number;
  item_name: string;
  category: Category;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: StockStatus;
  featured_item?: number;
  special_note?: string | null;
}