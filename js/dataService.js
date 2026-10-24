
export async function loadAppData() {
    try {
        const [customersRes, productsRes, ordersRes] = await Promise.all([
            fetch('data/customers.json'),
            fetch('data/products.json'),
            fetch('data/orders.json')
        ]);

        if (!customersRes.ok || !productsRes.ok || !ordersRes.ok) {
            throw new Error("Erreur lors du chargement d'un ou plusieurs fichiers JSON.");
        }

        const customers = await customersRes.json();
        const products = await productsRes.json();
        const orders = await ordersRes.json();

        return { customers, products, orders };
    } catch (error) {
        console.error("Échec du chargement des données :", error);
        throw error; 
    }
}