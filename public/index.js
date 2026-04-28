let selectedCustomer = null;

async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");
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
        Phone: ${person.phone || "-"}<br>
        Birth date: ${person.birth_date || "-"}
      `;

      div.addEventListener("click", () => selectCustomer(person));

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

function selectCustomer(person) {
  selectedCustomer = person;

  document.getElementById("first-name").value = person.first_name;
  document.getElementById("last-name").value = person.last_name;
  document.getElementById("email").value = person.email;
  document.getElementById("phone").value = person.phone || "";
  document.getElementById("birth-date").value = person.birth_date || "";
}

function clearForm() {
  selectedCustomer = null;
  document.getElementById("customer-form-element").reset();
}

async function handleSubmit(event) {
  event.preventDefault();

  const customer = {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birth_date: document.getElementById("birth-date").value
  };

  try {
    if (selectedCustomer) {
      // UPDATE
      await fetch(`/api/persons/${selectedCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      });
    } else {
      // CREATE
      await fetch("/api/persons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      });
    }

    clearForm();
    loadCustomers();

  } catch (err) {
    console.error(err);
  }
}

async function deleteCustomer() {
  if (!selectedCustomer) return;

  if (!confirm("Are you sure you want to delete this customer?")) return;

  try {
    await fetch(`/api/persons/${selectedCustomer.id}`, {
      method: "DELETE"
    });

    clearForm();
    loadCustomers();

  } catch (err) {
    console.error(err);
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("customer-form-element")
    .addEventListener("submit", handleSubmit);

  document
    .getElementById("delete-btn")
    .addEventListener("click", deleteCustomer);

  loadCustomers();
});