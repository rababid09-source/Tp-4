

export function getCustomerById(customers, customerId) {
    return customers.find(c => c.id === customerId);
}

export function getProductById(products, productId) {
    return products.find(p => p.id === productId);
}

export function enrichOrder(order, customers, products) {
    const customer = getCustomerById(
        customers,
        order.customerId
    );

    const items = order.items.map(item => {
        const product = getProductById(
            products,
            item.productId
        );

        return {
            ...item,
            productName: product ? product.name : "Inconnu",
            productCategory: product ? product.category : "Inconnue",
            price: product ? product.price : 0,
            lineTotal: product
                ? product.price * item.quantity
                : 0
        };
    });

    const totalAmount = items.reduce(
        (sum, item) => sum + item.lineTotal,
        0
    );

    return {
        ...order,
        customerName: customer ? customer.name : "Cliente inconnue",
        customerCity: customer ? customer.city : "",
        items,
        totalAmount
    };
}

export function getFilteredOrders(state) {
    const orders = state.orders.map(order =>
        enrichOrder(order, state.customers, state.products)
    );

    return orders.filter(order => {
        const matchesSearch = order.customerName
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());

        const matchesStatus =
            state.selectedStatus === "all" ||
            order.status === state.selectedStatus;

        const matchesCategory =
            state.selectedCategory === "all" ||
            order.items.some(
                item => item.productCategory === state.selectedCategory
            );

        return matchesSearch && matchesStatus && matchesCategory;
    });
}
