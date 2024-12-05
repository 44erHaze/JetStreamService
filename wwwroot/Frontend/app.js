let token = '';

// Funktion f�r Login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5133/api/login/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        token = data.token;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('service-order-section').style.display = 'block';
        loadServiceOrders(); // ServiceOrders laden, nachdem der Benutzer eingeloggt ist
    } else {
        alert('Login fehlgeschlagen');
    }
}

// Funktion f�r das Erstellen einer ServiceOrder
async function createServiceOrder(event) {
    event.preventDefault();  // Verhindert das automatische Neuladen der Seite

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const priority = document.getElementById('priority').value;

    const response = await fetch('http://localhost:5133/api/serviceorders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customerName: name,  
            email: email,
            phone: phone,
            serviceType: service,  
            priority: priority     
        }),
    });

    if (response.ok) {
        alert('Auftrag erfolgreich erstellt!');
        // Formular zur�cksetzen
        document.getElementById('orderForm').reset();
    } else {
        alert('Fehler beim Erstellen des Auftrags');
    }
}


// Formular Event Listener
document.getElementById('orderForm').addEventListener('submit', createServiceOrder);

// Funktion zum Laden der ServiceOrders
async function loadServiceOrders() {
    const response = await fetch('http://localhost:5133/api/serviceorders', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const orders = await response.json();
    const ordersList = document.getElementById('service-orders-list');
    ordersList.innerHTML = ''; // Liste zur�cksetzen

    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.innerHTML = `
            <h3>${order.title}</h3>
            <p>${order.description}</p>
            <button onclick="deleteServiceOrder(${order.id})">Entfernen</button>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Funktion zum L�schen einer ServiceOrder
async function deleteServiceOrder(orderId) {
    const response = await fetch(`http://localhost:5133/api/serviceorders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        alert('ServiceOrder gel�scht');
        loadServiceOrders(); // Liste nach L�schen aktualisieren
    } else {
        alert('Fehler beim L�schen der ServiceOrder');
    }
}
