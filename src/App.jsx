import { useEffect, useState } from "react";
import "./App.css";

const PRODUCT_PRICE = 499;

function Header() {
  return (
    <header className="store-header">
      <div className="store-logo">a<span>mazon</span></div>
      <div className="store-heading">
        <h1>Amazon Product Store</h1>
        <p>Everything you need, delivered to you.</p>
      </div>
    </header>
  );
}

function ProductCard({
  productName,
  price,
  quantity,
  selectedColor,
  deliveryCity,
}) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      `${productName} | ${selectedColor} | Cart: ${quantity}`;

    return () => {
      document.title = previousTitle;
    };
  }, [productName, selectedColor, quantity]);

  const total = quantity * price;

  return (
    <section className="product-card">
      <div className={`product-visual ${selectedColor.toLowerCase()}`}>
        <div className="mouse">
          <div className="mouse-wheel" />
          <div className="mouse-line" />
        </div>
        <span className="visual-label">{selectedColor} Edition</span>
      </div>

      <div className="product-details">
        <span className="product-badge">FEATURED PRODUCT</span>
        <h2>{productName}</h2>
        <p className="product-subtitle">Wireless Optical Mouse</p>

        <div className="rating">
          <span>★★★★★</span>
          <small> Sample product</small>
        </div>

        <div className="price">₹{price}</div>
        <p className="tax-note">Inclusive of all taxes</p>

        <div className="detail-row">
          <span>Colour</span>
          <strong>{selectedColor}</strong>
        </div>

        <div className="detail-row">
          <span>Deliver to</span>
          <strong>📍 {deliveryCity || "Enter your city"}</strong>
        </div>

        <div className="cart-summary">
          <div>
            <span className="summary-label">CART QUANTITY</span>
            <strong className="quantity-number">{quantity}</strong>
          </div>
          <div className="total-block">
            <span className="summary-label">TOTAL AMOUNT</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <div className={`cart-status ${quantity > 0 ? "added" : ""}`}>
          <span className="status-dot" />
          {quantity === 0 ? "Cart is empty" : "Product added to cart"}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="store-footer">
      <p>© 2026 Amazon Product Store</p>
      <span>Simple shopping. Smart learning. Built with React.</span>
    </footer>
  );
}

function App() {
  const productName = "Wireless Mouse";
  const price = PRODUCT_PRICE;

  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  return (
    <div className="app">
      <Header />

      <main className="store-main">
        <section className="welcome-section">
          <span className="eyebrow">DAY 3 • REACT PRACTICE</span>
          <h2>Your shopping cart, made simple.</h2>
          <p>Choose a colour, set your delivery city, and manage your cart.</p>
        </section>

        {showProduct && (
          <ProductCard
            productName={productName}
            price={price}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}

        <section className="shopping-controls">
          <h3>Personalise your order</h3>

          <div className="input-grid">
            <label>
              Choose colour
              <select
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
              >
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
              </select>
            </label>

            <label>
              Delivery city
              <input
                type="text"
                value={deliveryCity}
                onChange={(event) => setDeliveryCity(event.target.value)}
                placeholder="Enter delivery city"
              />
            </label>
          </div>

          <div className="button-grid">
            <button
              className="add-button"
              onClick={() => setQuantity((current) => current + 1)}
            >
              + Add to Cart
            </button>

            <button
              className="remove-button"
              onClick={() => setQuantity((current) => Math.max(0, current - 1))}
              disabled={quantity === 0}
            >
              − Remove One
            </button>

            <button
              className="reset-button"
              onClick={() => setQuantity(0)}
            >
              ↻ Reset Cart
            </button>

            <button
              className="toggle-button"
              onClick={() => setShowProduct((visible) => !visible)}
            >
              {showProduct ? "Hide Product" : "Show Product"}
            </button>
          </div>

          <p className="hint">
            Your colour, delivery city, and quantity are preserved when the
            product card is hidden.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;