-- 1. AUTH & ADMIN
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password_hash TEXT NOT NULL -- Store bcrypt hash here
);

-- 2. PRODUCTS & VARIANTS
CREATE TABLE products (
  id TEXT PRIMARY KEY, -- UUID
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT, -- 'Jewelry', 'Clothing', 'Shoes', 'Household'
  sub_category TEXT, -- 'Stitched', 'Unstitched', 'Rings'
  base_price REAL,
  images TEXT, -- JSON Array of Cloudinary URLs
  supplier_origin TEXT, -- 'manual', 'csv', 'api'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variants (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  sku TEXT,
  size TEXT,
  color TEXT,
  material TEXT,
  stock_quantity INTEGER DEFAULT 0,
  price_override REAL, -- If different from base_price
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 3. ORDERS
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  shipping_address TEXT,
  total_amount REAL,
  status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered
  items_json TEXT, -- JSON snapshot of items purchased
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SEED INITIAL DATA (Example)
INSERT INTO admin_users (username, password_hash) VALUES ('admin', '1234'); -- Change this later!
