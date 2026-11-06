const table = document.getElementById("ordersTable");
const tbody = table.querySelector("tbody");

let rows = Array.from(tbody.querySelectorAll("tr"));

let currentPage = 1;
let rowsPerPage = 5;

let sortColumn = -1;
let sortAscending = true;



function displayRows() {

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    for (let i = 0; i < rows.length; i++) {

        if (i >= start && i < end) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }

    showPages();

    document.getElementById("totalOrders").textContent = rows.length;
}



function showPages() {

    let totalPages = Math.ceil(rows.length / rowsPerPage);

    let pagination = document.getElementById("pagination");

    pagination.innerHTML = "";


    let previous = document.createElement("li");
    previous.className = "page-item";

    previous.innerHTML = `
        <a class="page-link" href="#">Previous</a>
    `;

    if (currentPage === 1) {
        previous.classList.add("disabled");
    }

    previous.addEventListener("click", function(event) {
        event.preventDefault();

        if (currentPage > 1) {
            currentPage--;
            displayRows();
        }
    });

    pagination.appendChild(previous);



    for (let i = 1; i <= totalPages; i++) {

        let page = document.createElement("li");
        page.className = "page-item";

        if (i === currentPage) {
            page.classList.add("active");
        }

        page.innerHTML = `
            <a class="page-link" href="#">${i}</a>
        `;

        page.addEventListener("click", function(event) {
            event.preventDefault();

            currentPage = i;
            displayRows();
        });

        pagination.appendChild(page);

    }


    

    let next = document.createElement("li");
    next.className = "page-item";

    next.innerHTML = `
        <a class="page-link" href="#">Next</a>
    `;

    if (currentPage === totalPages) {
        next.classList.add("disabled");
    }

    next.addEventListener("click", function(event) {
        event.preventDefault();

        if (currentPage < totalPages) {
            currentPage++;
            displayRows();
        }
    });

    pagination.appendChild(next);

}




displayRows();



const headings = document.querySelectorAll("#ordersTable th");

headings.forEach(function(heading) {

    heading.addEventListener("click", function() {

        let column = Number(heading.dataset.column);

        if (sortColumn === column) {
            sortAscending = !sortAscending;
        } else {
            sortColumn = column;
            sortAscending = true;
        }

        rows.sort(function(a, b) {

            let valueA = a.cells[column].textContent.trim();
            let valueB = b.cells[column].textContent.trim();

            let result;


            if (column === 0 || column === 4) {

                valueA = Number(valueA.replace(/[₹,]/g, ""));
                valueB = Number(valueB.replace(/[₹,]/g, ""));

                result = valueA - valueB;

            } else {

              
                result = valueA.localeCompare(valueB);

            }

            if (sortAscending) {
                return result;
            } else {
                return -result;
            }

        });

        currentPage = 1;

        displayRows();

    });

});



const salesChart = new Chart(
    document.getElementById("salesChart"),
    {
        type: "bar",

        data: {

            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June"
            ],

            datasets: [{

                label: "Monthly Sales",

                data: [
                    12000,
                    19000,
                    15000,
                    25000,
                    22000,
                    30000
                ],

                backgroundColor: "blue"

            }]

        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }

    }
);


const orderChart = new Chart(
    document.getElementById("orderChart"),
    {
        type: "doughnut",

        data: {

            labels: [
                "Completed",
                "Pending",
                "Cancelled"
            ],

            datasets: [{

                data: [0, 0, 0],

                backgroundColor: [
                    "green",
                    "orange",
                    "red"
                ]

            }]

        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }

    }
);




function updateOrderChart() {

    let completed = 0;
    let pending = 0;
    let cancelled = 0;

    for (let i = 0; i < rows.length; i++) {

        let status = rows[i].cells[3].textContent.trim();

        if (status === "Completed") {
            completed++;
        }

        else if (status === "Pending") {
            pending++;
        }

        else if (status === "Cancelled") {
            cancelled++;
        }

    }

    orderChart.data.datasets[0].data = [
        completed,
        pending,
        cancelled
    ];

    orderChart.update();

}



updateOrderChart();




const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function(event) {

    event.preventDefault();

  
    let orderId = document.getElementById("orderId").value;
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let status = document.getElementById("orderStatus").value;
    let amount = document.getElementById("orderAmount").value;



    let alreadyExists = false;

    for (let i = 0; i < rows.length; i++) {

        if (rows[i].cells[0].textContent === orderId) {
            alreadyExists = true;
            break;
        }

    }

    if (alreadyExists) {
        alert("This Order ID already exists!");
        return;
    }



    let newRow = document.createElement("tr");

    let values = [
        orderId,
        customer,
        product,
        status,
        Number(amount).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        })
    ];



    for (let i = 0; i < values.length; i++) {

        let cell = document.createElement("td");

        cell.textContent = values[i];

        newRow.appendChild(cell);

    }


    tbody.appendChild(newRow);


    rows = Array.from(tbody.querySelectorAll("tr"));

    currentPage = Math.ceil(rows.length / rowsPerPage);

    displayRows();

    updateOrderChart();

    const modalElement = document.getElementById("addOrderModal");

    const modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();

    orderForm.reset();

});
