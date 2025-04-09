let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = { name, price, quantity: 1 };
  const existingItem = cart.find((i) => i.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.name}</td>
            <td>R${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>R${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
        `;
    cartItems.appendChild(row);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Profile editing toggle
function toggleEdit() {
  const inputs = document.querySelectorAll(
    "#profile-form input, #profile-form textarea"
  );
  const saveBtn = document.getElementById("save-btn");
  inputs.forEach((input) => {
    input.readOnly = !input.readOnly;
  });
  saveBtn.classList.toggle("d-none");
  if (!saveBtn.classList.contains("d-none")) {
    document.getElementById("profile-form").onsubmit = function (e) {
      e.preventDefault();
      alert("Profile updated! (This is a demo - changes not saved.)");
      inputs.forEach((input) => (input.readOnly = true));
      saveBtn.classList.add("d-none");
    };
  }
}

document.addEventListener("DOMContentLoaded", updateCart);
