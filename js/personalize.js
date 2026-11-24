// Grab the Handlebars template directly from index.html
const heroContainer = document.getElementById("hero-content");
const source = heroContainer.innerHTML;
const template = Handlebars.compile(source);

// Load customer data
fetch("customer-data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load customer data.");
        }

        return response.json();
    })
    .then(data => {
        // Select customer for preview
        const customer = data.customers[0];

        // Populate Handlebars tokens in the existing HTML
        heroContainer.innerHTML = template(customer);
    })
    .catch(error => {
        console.error("Personalization error:", error);

        // Fallback: compile with empty data so the {{else}} block renders
        heroContainer.innerHTML = template({});
    });