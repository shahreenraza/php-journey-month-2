const orders = [
  { id: 1, customer: "Shahreen", total: 1200, status: "delivered", items: ["Book", "Pen"] },
  { id: 2, customer: "Ayesha", total: 800, status: "pending", items: ["Bag", "Pen"] },
  { id: 3, customer: "Shahreen", total: 1500, status: "delivered", items: ["Laptop", "Mouse"] },
  { id: 4, customer: "Riya", total: 400, status: "cancelled", items: ["Book"] },
  { id: 5, customer: "Ayesha", total: 2000, status: "pending", items: ["Phone", "Charger"] }
];


const totalRevenue = orders.reduce((sum, order) => {
  return sum + order.total;
}, 0);

console.log("1. Total Revenue:", totalRevenue);



const revenuePerCustomer = orders.reduce((spending, order) => {
  if (spending[order.customer] === undefined) {
    spending[order.customer] = 0;
  }

  spending[order.customer] += order.total;
  return spending;
}, {});

console.log("2. Revenue Per Customer:", revenuePerCustomer);



const highestOrders = [...orders]
  .sort((a, b) => b.total - a.total)
  .slice(0, 3);

console.log("3. Top 3 Orders:", highestOrders);



const ordersByStatus = orders.reduce((groups, order) => {
  if (!(order.status in groups)) {
    groups[order.status] = [];
  }

  groups[order.status].push(order);
  return groups;
}, {});

console.log("4. Orders By Status:", ordersByStatus);



const averageOrderValue = Number(
  (totalRevenue / orders.length).toFixed(2)
);

console.log("5. Average Order Value:", averageOrderValue);



const allItems = orders.flatMap(order => order.items);

const uniqueItems = Array.from(new Set(allItems));

console.log("6. Unique Items:", uniqueItems);


console.log(
  "Every order total > 0:",
  orders.every(order => order.total > 0)
);

console.log(
  "Some order total > 1000:",
  orders.some(order => order.total > 1000)
);

console.log(
  "Orders above 500:",
  orders.filter(order => order.total > 500)
);


console.log(
  "First order above 1000:",
  orders.find(order => order.total > 1000)
);

console.log(
  "Index of first order above 1000:",
  orders.findIndex(order => order.total > 1000)
);
