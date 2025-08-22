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

// Register Logic begins here

document.addEventListener('DOMContentLoaded', function (){
  const registrationForm = document.getElementById('frm-register');
  if (!registrationForm) {
    console.log('Registration form not found');
    return;
  }

registrationForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  try {
    //Get input forms
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm_password = document.getElementById('confirm_password');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');

    
  console.log({
  first_name,
  last_name,
  email,
  password,
  confirm_password,
  phone,
  address
});


  // Get Input Value and trim whitespace
  const firstValue = first_name.value.trim();
  const lastValue = last_name.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirm_password.value.trim();
  const phoneValue = phone.value;
  const addressValue = address.value;




// check if all fields are filled 

if (
  !firstValue ||
  !lastValue  ||
  !emailValue  ||
  !passwordValue ||
  !confirmPasswordValue ||
  !phoneValue ||
  !addressValue 

) {
  alert('All fields are required');
}

// validate password confirmation 
if (passwordValue !== confirmPasswordValue) {
  alert('Passwords do not match. Please try again');
  return;
}

if (passwordValue.length < 6) {
  alert('Password must be at least 6 characters long');
  return;
}

// send the request to the server
const response = await fetch('/auth/sign-up', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    first_name: firstValue,
    last_name: lastValue,
    email: emailValue,
    phone: phoneValue,
    password: passwordValue,
    address: addressValue,
  }),
});

if (!response.ok) {
  // If response is not ok, try to read it as text
const errorText = await response.text();
console.log('server error response:', errorText);
alert('Registration failed. Please try again');
return;
}

// Try to parse JSON if the response is Ok (200)
const data = await response.json();
alert(data.message);
registrationForm.reset(); // clear the form on success

} catch (error) {
  console.log('Registration error', error);
  alert(`An error occurred during resgistration. Details: ${error.message}`)
}
});

});



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


// login logic begins here 
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("frm-login");
  if (!loginForm){
    return;
  }
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
      //get form input
      const email = document.getElementById("email");
      const password = document.getElementById("password");
       
      //validate that all element exist 
      if (!email || !password) {
        throw new Error("Required form elements are missing");
      }

      //get input value and trim white space 
      const emailValue = email.value.trim();
      const passwordValue = password.value;

      //validation
        if (!emailValue|| !passwordValue){
        alert("All fields are required");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Disable the submit button to prevent double submission
      const submitButton = loginForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = "Signing in...";


      try {
        // Send the request to the server
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(
            `${data.message} Welcome ${data.name} of email address: ${data.email}`
          );
          loginForm.reset(); // Clear the form on success

          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(data));

          // Redirect to dashboard or home page
          window.location.href = "/dashboard";
        } else {
          alert(
            data.message ||
              "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(
          "A network error occurred. Please check your connection and try again."
        );
      } finally {
        // Re-enable the submit button regardless of outcome
        submitButton.disabled = false;
        submitButton.textContent = "Login";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");

    }
  });
  
});

