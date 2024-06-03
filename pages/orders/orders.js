
// const dropdownToggle = document.querySelector('.fa-caret-down');
// const dropdownMenu = document.querySelector('.dropdown-menu');

// dropdownToggle.addEventListener('click', function() {
//   dropdownMenu.classList.toggle('show');
// });
function showForm() {
    document.getElementById('new_orders').style.display = 'block';
}

document.getElementById('closeFormIcon').addEventListener('click', function() {
    document.getElementById('new_orders').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('/orders-data')
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById("ordersTableBody");
            data.forEach(order => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <th><label><input type="checkbox"></label></th>
                    <td>#${order.orderID}</td>
                    <td>${order.orderFecha}</td>
                    <td>${order.clientName}</td>
                    <td>${order.orderSC}</td>
                    <td>${order.orderDestiny}</td>
                    <td>${order.orderAmount}</td>
                    <td>${order.orderStatus}</td>
                `;
                ordersTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar las órdenes:', error));
});

