let selectedCustomerId = null;

async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";

      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;

      // SELECT CUSTOMER → FILL FORM
      div.addEventListener("click", () => {
        selectedCustomerId = person.id;

        document.getElementById("firstName").value = person.first_name || "";
        document.getElementById("lastName").value = person.last_name || "";
        document.getElementById("email").value = person.email || "";
        document.getElementById("phone").value = person.phone || "";
        document.getElementById("birthDate").value = person.birth_date || "";
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

// CREATE + UPDATE CUSTOMER
const form = document.getElementById("customerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newCustomer = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birth_date: document.getElementById("birthDate").value
  };

  const method = selectedCustomerId ? "PUT" : "POST";
  const url = selectedCustomerId
    ? `/api/persons/${selectedCustomerId}`
    : "/api/persons";

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    });

    if (!res.ok) {
      throw new Error("Failed to save customer");
    }

    selectedCustomerId = null;
    form.reset();
    loadCustomers();

  } catch (err) {
    console.error(err);
    alert("Error saving customer");
  }
});

// Run on page load
loadCustomers();