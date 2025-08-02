// Sample product data (you can replace with API or database)
const products = [
  { name: "Smartphone", price: "$299" },
  { name: "Bluetooth Headphones", price: "$59" },
  { name: "T-shirt - Black", price: "$19" },
  { name: "Microwave Oven", price: "$120" },
  { name: "Running Shoes", price: "$75" },
  { name: "Smartwatch", price: "$130" }
];

// Load products into any page with #productGrid
const productGrid = document.getElementById("productGrid");

if (productGrid) {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    productGrid.appendChild(div);
  });
}

// Handle login form validation
const loginForm = document.querySelector("form");

if (loginForm && window.location.pathname.includes("login.html")) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    // Simple demo login logic
    if (email === "user@example.com" && password === "password123") {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to homepage
    } else {
      alert("Invalid email or password.");
    }
  });
}

