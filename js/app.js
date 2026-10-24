

import { state } from "./state.js";
import { loadAppData } from "./dataService.js";
import { getFilteredOrders } from "./selectors.js";

import {
    renderIndicators,
    renderOrders,
    renderOrderDetails,
    showError,
    hideError
} from "./view.js";

const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");

function displayOrders() {
    const filteredOrders = getFilteredOrders(state);

    renderIndicators(state);
    renderOrders(filteredOrders, showOrderDetails);
}

function showOrderDetails(order) {
    renderOrderDetails(order);
}

searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    displayOrders();
});

statusFilter.addEventListener("change", (event) => {
    state.selectedStatus = event.target.value;
    displayOrders();
});

categoryFilter.addEventListener("change", (event) => {
    state.selectedCategory = event.target.value;
    displayOrders();
});

async function init() {
    try {
        hideError();

        const data = await loadAppData();

        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        displayOrders();
    } catch (error) {
        showError(
            "Impossible de charger les données. Vérifiez les fichiers JSON et le serveur local."
        );

        console.error(error);
    }
}

init();
