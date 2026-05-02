import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve uploads directory
  const uploadsPath = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsPath));

  // Mock Data from User
  const categories = ["Clothes", "Bed Sheets"];
  const products = [
    {
        "id": 1,
        "name": "Maria.B Pakistani Luxury Embroidered Lawn Suit",
        "description": "Fabric:Printed Lawn .Work: Embroidery and Printed .Includes: Kameez, Trouser and Dupatta.Accessories: Tassels and hanging pearls will be provided same as the model picture.",
        "price": 5679,
        "stock": 34,
        "images": [
            "/uploads/1758100603435-WhatsApp Image 2025-09-17 at 2.14.56 PM (1).jpeg"
        ],
        "categoryId": 1,
        "categoryName": "Clothes",
        "discountType": "percentage",
        "discountValue": 10,
        "finalPrice": 5111.1,
        "rating": 4.5,
        "rating_count": 12,
        "image": "/uploads/1758100603435-WhatsApp Image 2025-09-17 at 2.14.56 PM (1).jpeg"
    },
    {
        "id": 2,
        "name": "Maria.B Pakistani Luxury Embroidered Lawn Suit",
        "description": "Fabric:Printed Lawn .Work: Embroidery and Printed .Includes: Kameez, Trouser and Dupatta.Accessories: Tassels and hanging pearls will be provided same as the model picture.",
        "price": 10000,
        "stock": 34,
        "images": [
            "/uploads/1758100854974-WhatsApp Image 2025-09-17 at 2.20.24 PM.jpeg"
        ],
        "categoryId": 1,
        "categoryName": "Clothes",
        "discountType": "percentage",
        "discountValue": 50,
        "finalPrice": 5000,
        "rating": 4.0,
        "rating_count": 8,
        "image": "/uploads/1758100854974-WhatsApp Image 2025-09-17 at 2.20.24 PM.jpeg"
    },
    {
        "id": 3,
        "name": "SLIME Comforter Set- 7 Pcs",
        "description": "1 x Bed Sheet 90 x 95 Inches1 x Comforter Filled (150 GSM) 90 x 95 Inches4 x Pillow Covers Printed 18 x 28 Inches1 x Cushion Cover Printed 16 x 16 Inches",
        "price": 7000,
        "stock": 34,
        "images": [
            "/uploads/1758101066009-WhatsApp Image 2025-09-17 at 2.20.24 PM.jpeg"
        ],
        "categoryId": 2,
        "categoryName": "Bed Sheets",
        "discountType": "percentage",
        "discountValue": 30,
        "finalPrice": 4900,
        "rating": 4.8,
        "rating_count": 25,
        "image": "/uploads/1758101066009-WhatsApp Image 2025-09-17 at 2.20.24 PM.jpeg"
    },
    {
        "id": 4,
        "name": "SLIME Comforter Set- 7 Pcs",
        "description": "1 x Bed Sheet 90 x 95 Inches1 x Comforter Filled (150 GSM) 90 x 95 Inches4 x Pillow Covers Printed 18 x 28 Inches1 x Cushion Cover Printed 16 x 16 Inches",
        "price": 7000,
        "stock": 34,
        "images": [
            "/uploads/1758101352025-WhatsApp Image 2025-09-17 at 2.22.39 PM.jpeg"
        ],
        "categoryId": 2,
        "categoryName": "Bed Sheets",
        "discountType": "percentage",
        "discountValue": 30,
        "finalPrice": 4900,
        "rating": 4.2,
        "rating_count": 15,
        "image": "/uploads/1758101352025-WhatsApp Image 2025-09-17 at 2.22.39 PM.jpeg"
    },
    {
        "id": 5,
        "name": "tesjjj",
        "description": "test description for elegant suit",
        "price": 24000,
        "stock": 22,
        "images": [
            "/uploads/images-1777651786226-537739729.png"
        ],
        "categoryId": 1,
        "categoryName": "Clothes",
        "discountType": "percentage",
        "discountValue": 14,
        "finalPrice": 20640,
        "rating": 4.9,
        "rating_count": 42,
        "image": "/uploads/images-1777651786226-537739729.png"
    }
  ];

  let cart: any[] = [];
  let orders: any[] = [];
  let currentUser: any = null;

  // API Routes
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock logic
    currentUser = {
      id: 11,
      name: "fiaz",
      email: email || "numanfia1@gmail.com",
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    res.json({
      success: true,
      message: "Login successful",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token",
      user: currentUser
    });
  });

  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;
    currentUser = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    res.json({
      success: true,
      message: "Registration successful",
      user: currentUser
    });
  });

  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  });

  app.get("/api/cart", (req, res) => {
    const totalAmount = cart.reduce((acc, item) => acc + item.total, 0);
    res.json({ items: cart, totalAmount });
  });

  app.post("/api/cart/add", (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * product.finalPrice;
    } else {
      cart.push({
        ...product,
        quantity,
        total: quantity * product.finalPrice
      });
    }
    res.json({ success: true, message: "Added to cart" });
  });

  app.patch("/api/cart/update/:id", (req, res) => {
    const { quantity } = req.body;
    const itemIdx = cart.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIdx > -1) {
      cart[itemIdx].quantity = quantity;
      cart[itemIdx].total = quantity * cart[itemIdx].finalPrice;
      res.json({ success: true });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  });

  app.delete("/api/cart/remove/:id", (req, res) => {
    cart = cart.filter(item => item.id !== parseInt(req.params.id));
    res.json({ success: true });
  });

  app.delete("/api/cart/clear/:id", (req, res) => {
    // Treat as clear all if ID is generic or specific
    cart = [];
    res.json({ success: true });
  });

  app.post("/api/oder/checkout", (req, res) => {
    const { shippingAddress, city, phoneNumber } = req.body;
    if (cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const order = {
      id: orders.length + 1,
      userId: currentUser?.id || 11,
      status: "pending",
      totalAmount: cart.reduce((acc, item) => acc + item.total, 0).toFixed(2),
      shippingAddress,
      city,
      phoneNumber,
      orderDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      OrderItems: cart.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.finalPrice.toFixed(2),
        total: item.total.toFixed(2),
        Product: { images: item.images }
      }))
    };
    orders.push(order);
    cart = [];
    res.json({ success: true, order });
  });

  app.get("/api/oder", (req, res) => {
    res.json(orders);
  });

  app.post("/api/submit", (req, res) => {
    const { productId, rating, comment } = req.body;
    res.json({ success: true, message: "Rating submitted" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
