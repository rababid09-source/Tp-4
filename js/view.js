

export function renderIndicators(state) {
    document.getElementById("total-customers").textContent =
        state.customers.length;

    document.getElementById("total-products").textContent =
        state.products.length;

    document.getElementById("total-orders").textContent =
        state.orders.length;

    const total = state.orders.reduce((sum, order) => {
        return sum + order.items.reduce((subtotal, item) => {
            const product = state.products.find(
                p => p.id === item.productId
            );

            return subtotal + (product
                ? product.price * item.quantity
                : 0);
        }, 0);
    }, 0);

    document.getElementById("total-amount").textContent =
        total.toLocaleString("fr-FR") + " MAD";
}

export function renderOrders(orders, onShowDetails) {
    const container = document.getElementById("orders-list");
    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML =
            '<p class="text-center">Aucune réservation ou commande trouvée.</p>';
        return;
    }

    orders.forEach(order => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5>Rendez-vous / Commande #${order.id}</h5>
                    <p><strong>Cliente :</strong> ${order.customerName}</p>
                    <p><strong>Ville :</strong> ${order.customerCity}</p>
                    <p><strong>Date :</strong> ${order.date}</p>
                    <p><strong>Statut :</strong> ${order.status}</p>
                    <p><strong>Montant :</strong>
                        ${order.totalAmount.toLocaleString("fr-FR")} MAD
                    </p>
                    <button class="btn btn-primary btn-sm">
                        Voir détails
                    </button>
                </div>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            onShowDetails(order);
        });

        container.appendChild(card);
    });
}

export function renderOrderDetails(order) {
    const panel = document.getElementById("order-details");
    const content = document.getElementById("details-content");

    panel.classList.remove("d-none");

    content.innerHTML = `
        <h4>Détails #${order.id}</h4>
        <p><strong>Cliente :</strong> ${order.customerName}</p>
        <p><strong>Ville :</strong> ${order.customerCity}</p>
        <p><strong>Date :</strong> ${order.date}</p>
        <p><strong>Statut :</strong> ${order.status}</p>
        <h5>Produits</h5>
        <ul>
            ${order.items.map(item => `
                <li>
                    ${item.productName} —
                    Quantité : ${item.quantity} —
                    Prix : ${item.price} MAD —
                    Sous-total : ${item.lineTotal} MAD
                </li>
            `).join("")}
        </ul>
        <h5>Total : ${order.totalAmount.toLocaleString("fr-FR")} MAD</h5>
    `;
}

export function showError(message) {
    const element = document.getElementById("error-message");
    element.textContent = message;
    element.classList.remove("d-none");
}

export function hideError() {
    document.getElementById("error-message").classList.add("d-none");
}
