import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};

const PRODUCTS = [
  // Electronics
  { id: 1, name: "HAVIT HV-G92 Gamepad", category: "Electronics", price: 1200, originalPrice: 1600, rating: 4.5, reviews: 88, image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=300&h=300&fit=crop", badge: "40% Off", delivery: "Free Delivery", brand: "HAVIT", description: "High-performance gaming gamepad with ergonomic design and multi-platform compatibility.", specs: { Connectivity: "USB + Wireless", Compatibility: "PC / PS3 / PS4", Battery: "600 mAh", Weight: "280g" } },
  { id: 2, name: "HAVIT HV-KB395L Keyboard", category: "Electronics", price: 1200, originalPrice: 1600, rating: 4.5, reviews: 88, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop", badge: "40% Off", delivery: "Free Delivery", brand: "HAVIT", description: "RGB mechanical keyboard with tactile switches and customizable lighting.", specs: { Type: "Mechanical", Switches: "Blue", Backlight: "RGB", Layout: "Full Size" } },
  { id: 3, name: "Acer Nitro Gaming Monitor", category: "Electronics", price: 12000, originalPrice: 16000, rating: 4.5, reviews: 88, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop", badge: "40% Off", delivery: "Free Delivery", brand: "Acer", description: "27-inch Full HD IPS gaming monitor with 165Hz refresh rate and AMD FreeSync.", specs: { Screen: "27 inch FHD", Refresh: "165Hz", Panel: "IPS", Response: "1ms" } },
  // Furniture
  { id: 4, name: "Ergonomic Office Chair", category: "Furniture", price: 8500, originalPrice: 14000, rating: 4.5, reviews: 88, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop", badge: "40% Off", delivery: "₹500 Delivery", brand: "DuraComfort", description: "Fully adjustable ergonomic chair with lumbar support and breathable mesh back.", specs: { Material: "Mesh + PU", Adjustable: "Yes", Weight: "12 kg", Warranty: "2 years" } },
  // Mobiles
  { id: 5, name: "iPhone 14 Series 256GB", category: "Mobiles", price: 79999, originalPrice: 99999, rating: 4.8, reviews: 2341, image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=300&h=300&fit=crop", badge: "New", delivery: "Free Delivery", brand: "Apple", description: "A15 Bionic chip, 12MP dual camera, all-day battery life and 5G connectivity.", specs: { Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Camera: "12MP + 12MP", Storage: "256 GB" } },
  // Electronics
  { id: 6, name: "JBL Boombox 3 Speaker", category: "Electronics", price: 8999, originalPrice: 14999, rating: 4.6, reviews: 743, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop", badge: "Sale", delivery: "Free Delivery", brand: "JBL", description: "Portable Bluetooth speaker with 24-hour playtime and IP67 waterproofing.", specs: { Battery: "24 hours", Bluetooth: "5.3", Waterproof: "IP67", Weight: "2.4 kg" } },
  // Fashion
  { id: 7, name: "Nike Air Max 270 React", category: "Woman's Fashion", price: 8495, originalPrice: 12995, rating: 4.4, reviews: 1823, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", badge: "Trending", delivery: "Free Delivery", brand: "Nike", description: "Max Air cushioning with React foam for incredible comfort all day.", specs: { Material: "Mesh + Synthetic", Sole: "React Foam", Closure: "Lace-up", Available: "UK 6–12" } },
  { id: 8, name: "Women's Collection Jacket", category: "Woman's Fashion", price: 2499, originalPrice: 4999, rating: 4.2, reviews: 612, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=300&fit=crop", badge: "50% Off", delivery: "Free Delivery", brand: "Zara Style", description: "Elegant designer jacket, perfect for casual and semi-formal occasions.", specs: { Material: "Polyester Blend", Fit: "Regular", Sizes: "XS–2XL", Care: "Machine Wash" } },
  // Mobiles
  { id: 9, name: "Samsung Galaxy S24 Ultra", category: "Mobiles", price: 89999, originalPrice: 124999, rating: 4.7, reviews: 5621, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop", badge: "Best Seller", delivery: "Free Delivery", brand: "Samsung", description: "200MP camera, S Pen included, Snapdragon 8 Gen 3, titanium frame.", specs: { Display: "6.8\" QHD+", Processor: "Snapdragon 8 Gen 3", Camera: "200MP", Battery: "5000 mAh" } },
  // Electronics
  { id: 10, name: "MacBook Air M3 13\"", category: "Electronics", price: 114900, originalPrice: 134900, rating: 4.9, reviews: 2187, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop", badge: "New", delivery: "Free Delivery", brand: "Apple", description: "Supercharged by M3 chip, fanless design, 18-hour battery.", specs: { Display: "13.6\" Liquid Retina", Chip: "Apple M3", RAM: "8 GB", Storage: "256 GB" } },
  // Beauty
  { id: 11, name: "Gucci Intense Oud Perfume", category: "Health & Beauty", price: 12999, originalPrice: 18999, rating: 4.5, reviews: 342, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop", badge: "Luxury", delivery: "Free Delivery", brand: "Gucci", description: "An oriental woody fragrance with oud wood, sandalwood and patchouli.", specs: { Volume: "90 ml", Type: "Eau de Parfum", Gender: "Unisex", Origin: "Italy" } },
  // Electronics
  { id: 12, name: "Amazon Echo Dot 5th Gen", category: "Electronics", price: 4499, originalPrice: 6499, rating: 4.3, reviews: 8921, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop", badge: "30% Off", delivery: "Free Delivery", brand: "Amazon", description: "Smart speaker with Alexa, improved bass, and eero Built-in for Wi-Fi extension.", specs: { Connectivity: "Wi-Fi + Bluetooth", Speaker: "1.73 inch", Colors: "5 options", Alexa: "Yes" } },
  { id: 13, name: "PlayStation 5 Digital Edition", category: "Electronics", price: 44990, originalPrice: 54990, rating: 4.8, reviews: 3421, image: "https://images.unsplash.com/photo-1607853202273-232359ecbde9?w=300&h=300&fit=crop", badge: "Hot", delivery: "Free Delivery", brand: "Sony", description: "Next-gen gaming with lightning-fast SSD, DualSense haptics and ray tracing.", specs: { Storage: "825 GB SSD", Resolution: "4K 120fps", Controller: "DualSense", Online: "PS Plus" } },
  // Books
  { id: 14, name: "Atomic Habits – James Clear", category: "Books", price: 299, originalPrice: 699, rating: 4.9, reviews: 34521, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop", badge: "Best Seller", delivery: "Free Delivery", brand: "Penguin", description: "The definitive guide to building good habits and breaking bad ones.", specs: { Pages: "320", Publisher: "Penguin", Language: "English", Format: "Paperback" } },
  // Electronics
  { id: 15, name: "Noise ColorFit Pro 4 Watch", category: "Electronics", price: 3499, originalPrice: 9999, rating: 4.0, reviews: 24532, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", badge: "65% Off", delivery: "Free Delivery", brand: "Noise", description: "AMOLED display, Bluetooth calling, SpO2 monitoring, 100+ sports modes.", specs: { Display: "1.78\" AMOLED", Battery: "7 days", Water: "IP68", Sensors: "SpO2 + HR" } },
  // Beauty
  { id: 16, name: "Lakme 9to5 Matte Lipstick", category: "Health & Beauty", price: 349, originalPrice: 599, rating: 4.1, reviews: 15632, image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9d?w=300&h=300&fit=crop", badge: "42% Off", delivery: "Free Delivery", brand: "Lakme", description: "All-day matte finish with primer enrichment for bold, long-lasting color.", specs: { Finish: "Matte", Duration: "12 hours", Weight: "3.6g", Cruelty: "Free" } },
  // Beauty extra
  { id: 17, name: "Maybelline Fit Me Foundation", category: "Health & Beauty", price: 425, originalPrice: 699, rating: 4.3, reviews: 18723, image: "https://images.unsplash.com/photo-1631214499644-b03c0f8e5ae0?w=300&h=300&fit=crop", badge: "39% Off", delivery: "Free Delivery", brand: "Maybelline", description: "Natural finish, blurs pores, controls shine for up to 12 hours.", specs: { Coverage: "Medium-Full", Finish: "Natural Matte", SPF: "18", Shades: "30+" } },
  { id: 18, name: "L'Oreal Paris Serum", category: "Health & Beauty", price: 799, originalPrice: 1299, rating: 4.4, reviews: 9843, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop", badge: "38% Off", delivery: "Free Delivery", brand: "L'Oreal", description: "1.5% pure hyaluronic acid, plumps skin and reduces fine lines instantly.", specs: { Volume: "30 ml", Skin: "All types", Key: "Hyaluronic Acid", SPF: "None" } },
  // Medicine
  { id: 19, name: "Himalaya Ashwagandha Tablets", category: "Medicine", price: 299, originalPrice: 450, rating: 4.4, reviews: 5621, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop", badge: "33% Off", delivery: "Free Delivery", brand: "Himalaya", description: "Pure Ashwagandha root extract — reduces stress, boosts energy and immunity.", specs: { Tablets: "60", Dosage: "1 tablet/day", Vegan: "Yes", Certified: "GMP" } },
  { id: 20, name: "Digene Antacid Gel 200ml", category: "Medicine", price: 89, originalPrice: 120, rating: 4.2, reviews: 3421, image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop", badge: "26% Off", delivery: "Free Delivery", brand: "Abbott", description: "Fast-acting antacid for acidity, heartburn and indigestion relief.", specs: { Volume: "200 ml", Flavour: "Orange", Type: "Gel Suspension", Usage: "After meals" } },
  { id: 21, name: "Dettol Antiseptic Liquid 250ml", category: "Medicine", price: 149, originalPrice: 199, rating: 4.6, reviews: 12043, image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&h=300&fit=crop", badge: "25% Off", delivery: "Free Delivery", brand: "Dettol", description: "Kills 99.9% of germs — use for wound care, bathing, floor cleaning.", specs: { Volume: "250 ml", Active: "Chloroxylenol", Uses: "Multipurpose", Safe: "Skin-tested" } },
  { id: 22, name: "Vitamin C 1000mg Tablets 60ct", category: "Medicine", price: 399, originalPrice: 599, rating: 4.5, reviews: 7832, image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=300&h=300&fit=crop", badge: "33% Off", delivery: "Free Delivery", brand: "HealthVit", description: "High-potency Vitamin C with Rose Hip — boosts immunity, glowing skin.", specs: { Tablets: "60", Dose: "1000 mg", Vegan: "Yes", Form: "Effervescent" } },
  // Sports
  { id: 23, name: "Adidas Ultraboost 22 Running", category: "Sports & Outdoor", price: 12999, originalPrice: 19999, rating: 4.6, reviews: 4123, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&h=300&fit=crop", badge: "35% Off", delivery: "Free Delivery", brand: "Adidas", description: "Responsive Boost midsole, Primeknit+ upper, Continental rubber outsole.", specs: { Type: "Running", Upper: "Primeknit+", Midsole: "Boost", Available: "UK 6–13" } },
  { id: 24, name: "Decathlon Yoga Mat 6mm", category: "Sports & Outdoor", price: 999, originalPrice: 1799, rating: 4.3, reviews: 6721, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop", badge: "44% Off", delivery: "Free Delivery", brand: "Decathlon", description: "Non-slip surface, 6mm thick, ideal for yoga, pilates, and stretching.", specs: { Thickness: "6 mm", Material: "NBR Foam", Size: "173x61 cm", Weight: "800g" } },
  // Groceries
  { id: 25, name: "Organic Ashwagandha Gummies", category: "Groceries", price: 599, originalPrice: 999, rating: 4.3, reviews: 2341, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop", badge: "40% Off", delivery: "₹20 Delivery", brand: "HealthVit", description: "KSM-66 Ashwagandha, stress relief, natural energy boost — 60 gummies.", specs: { Quantity: "60 Gummies", Flavour: "Mixed Berry", Vegan: "Yes", Organic: "Certified" } },
  { id: 26, name: "Tata Salt Lite 1kg", category: "Groceries", price: 45, originalPrice: 55, rating: 4.7, reviews: 28431, image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=300&h=300&fit=crop", badge: "18% Off", delivery: "Free Delivery", brand: "Tata", description: "Low sodium salt — 15% less sodium than regular salt, vacuum evaporated.", specs: { Weight: "1 kg", Iodine: "Yes", Sodium: "15% less", Type: "Iodised" } },
  // Men's Fashion
  { id: 27, name: "Levi's 511 Slim Fit Jeans", category: "Men's Fashion", price: 2499, originalPrice: 3999, rating: 4.5, reviews: 9823, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=300&h=300&fit=crop", badge: "37% Off", delivery: "Free Delivery", brand: "Levi's", description: "Classic slim fit 511 jeans — sits below waist, slim through thigh and leg.", specs: { Fit: "Slim", Rise: "Mid-rise", Fabric: "99% Cotton", Sizes: "28–38" } },
  { id: 28, name: "Allen Solly Men's Formal Shirt", category: "Men's Fashion", price: 1299, originalPrice: 2299, rating: 4.3, reviews: 5612, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop", badge: "43% Off", delivery: "Free Delivery", brand: "Allen Solly", description: "100% cotton formal shirt — wrinkle-free, slim fit, perfect for office wear.", specs: { Material: "100% Cotton", Fit: "Slim", Collar: "Spread", Sizes: "S–2XL" } },
  // Home & Lifestyle
  { id: 29, name: "Instant Pot Duo 7-in-1", category: "Home & Lifestyle", price: 6999, originalPrice: 12999, rating: 4.5, reviews: 7821, image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=300&h=300&fit=crop", badge: "Hot Deal", delivery: "Free Delivery", brand: "Instant Pot", description: "Pressure cooker, slow cooker, rice cooker, steamer and more — 7 in 1.", specs: { Capacity: "6 Quart", Functions: "7-in-1", Material: "Stainless Steel", Warranty: "1 year" } },
  { id: 30, name: "Philips Air Fryer HD9200", category: "Home & Lifestyle", price: 4999, originalPrice: 7999, rating: 4.4, reviews: 11234, image: "https://images.unsplash.com/photo-1648146417070-4af50b97b8a1?w=300&h=300&fit=crop", badge: "37% Off", delivery: "Free Delivery", brand: "Philips", description: "Rapid Air technology — fry with up to 90% less fat. 4.1L capacity.", specs: { Capacity: "4.1 L", Wattage: "1400W", Temp: "80–200°C", Timer: "60 min" } },
  // Baby's & Toys
  { id: 31, name: "LEGO Classic Bricks 484pc", category: "Baby's & Toys", price: 2499, originalPrice: 3999, rating: 4.8, reviews: 4312, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", badge: "37% Off", delivery: "Free Delivery", brand: "LEGO", description: "484 classic LEGO bricks in 33 colors — spark creativity with unlimited builds.", specs: { Pieces: "484", Age: "4+", Theme: "Classic", Material: "ABS Plastic" } },
  { id: 32, name: "Funskool Giggles Activity Gym", category: "Baby's & Toys", price: 1299, originalPrice: 1999, rating: 4.6, reviews: 2841, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop", badge: "35% Off", delivery: "Free Delivery", brand: "Funskool", description: "Soft activity gym with hanging toys — stimulates baby's sensory development.", specs: { Age: "0–12 months", Arches: "2", Toys: "5 hanging", Material: "BPA-Free" } },
];

const initialState = {
  products: PRODUCTS,
  cart: loadFromStorage("exclusive_cart", []),
  wishlist: loadFromStorage("exclusive_wish", []),
  user: loadFromStorage("exclusive_user", null),
  cartOpen: false,
  searchQuery: "",
  selectedCategory: "All",
  couponDiscount: 0,
  orders: loadFromStorage("exclusive_orders", []),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.cart.find((c) => c.id === action.payload.id);
      if (existing) { existing.qty += 1; }
      else { state.cart.push({ ...action.payload, qty: 1 }); }
      localStorage.setItem("exclusive_cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
      localStorage.setItem("exclusive_cart", JSON.stringify(state.cart));
    },
    increaseQty(state, action) {
      const item = state.cart.find((c) => c.id === action.payload);
      if (item) item.qty += 1;
      localStorage.setItem("exclusive_cart", JSON.stringify(state.cart));
    },
    decreaseQty(state, action) {
      const item = state.cart.find((c) => c.id === action.payload);
      if (item) {
        if (item.qty <= 1) { state.cart = state.cart.filter((c) => c.id !== action.payload); }
        else { item.qty -= 1; }
      }
      localStorage.setItem("exclusive_cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem("exclusive_cart", JSON.stringify([]));
    },
    toggleWishlist(state, action) {
      const idx = state.wishlist.indexOf(action.payload);
      if (idx > -1) { state.wishlist.splice(idx, 1); }
      else { state.wishlist.push(action.payload); }
      localStorage.setItem("exclusive_wish", JSON.stringify(state.wishlist));
    },
    setCartOpen(state, action) { state.cartOpen = action.payload; },
    setSearch(state, action) { state.searchQuery = action.payload; },
    setCategory(state, action) { state.selectedCategory = action.payload; },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("exclusive_user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("exclusive_user");
    },
    applyCoupon(state, action) { state.couponDiscount = action.payload; },
    addOrder(state, action) {
      state.orders.unshift(action.payload);
      localStorage.setItem("exclusive_orders", JSON.stringify(state.orders));
    },
  },
});

export const {
  addToCart, removeFromCart, increaseQty, decreaseQty, clearCart,
  toggleWishlist, setCartOpen, setSearch, setCategory,
  setUser, logout, applyCoupon, addOrder,
} = productSlice.actions;

export const selectCart = (s) => s.products.cart;
export const selectWishlist = (s) => s.products.wishlist;
export const selectUser = (s) => s.products.user;
export const selectCartOpen = (s) => s.products.cartOpen;
export const selectProducts = (s) => s.products.products;
export const selectSearch = (s) => s.products.searchQuery;
export const selectCategory = (s) => s.products.selectedCategory;
export const selectCoupon = (s) => s.products.couponDiscount;
export const selectOrders = (s) => s.products.orders;
export const selectCartCount = (s) => s.products.cart.reduce((sum, c) => sum + c.qty, 0);
export const selectCartTotal = (s) => s.products.cart.reduce((sum, c) => sum + c.price * c.qty, 0);

export default productSlice.reducer;
