let token = ''; // Globale Variable für den Token

// Zeigt das Login-Formular an
function showLoginForm() {
    const loginFormContainer = document.getElementById('loginFormContainer');
    loginFormContainer.style.display = 'block'; // Formular anzeigen
    document.body.classList.add("modal-open");  // Hintergrund abdunkeln
}

// Versteckt das Login-Formular
function hideLoginForm() {
    const loginFormContainer = document.getElementById('loginFormContainer');
    loginFormContainer.style.display = 'none'; // Formular ausblenden
    document.body.classList.remove("modal-open"); // Hintergrund zurücksetzen
}

// Funktion für Login
async function login(event) {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
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

        if (response.ok) {
            const data = await response.json();
            console.log('Serverantwort:', data);  // Überprüfe, ob der Token hier enthalten ist

            if (data && data.token) {  // Überprüfe, ob das Token korrekt ist
                localStorage.setItem('token', data.token); // Speichere den Token im LocalStorage
                alert('Erfolgreich eingeloggt!');
                window.location.href = 'Frontend/admin.html'; // Weiterleitung zur Verwaltungsseite
            } else {
                alert('Token fehlt in der Antwort des Servers.');
            }
        } else {
            alert('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
        }
    } catch (error) {
        console.error('Fehler beim Login:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// Funktion für das Erstellen einer ServiceOrder
async function createServiceOrder(event) {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const priority = document.getElementById('priority').value;
    const savedToken = localStorage.getItem('token'); // Token aus LocalStorage abrufen

    if (!savedToken) {
        alert('Du bist nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        return;
    }

    try {
        const response = await fetch('http://localhost:5133/api/serviceorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einfügen
            },
            body: JSON.stringify({
                customerName: name,
                email: email,
                phone: phone,
                serviceType: service,
                priority: priority,
            }),
        });

        if (response.ok) {
            alert('Auftrag erfolgreich erstellt!');
            document.getElementById('orderForm').reset(); // Formular zurücksetzen
        } else {
            const error = await response.text();
            alert(`Fehler beim Erstellen des Auftrags: ${error}`);
        }
    } catch (error) {
        console.error('Fehler beim Erstellen des Auftrags:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// Funktion zum Laden der ServiceOrders
async function loadServiceOrders() {
    const savedToken = localStorage.getItem('token'); // Token aus LocalStorage abrufen

    if (!savedToken) {
        alert('Du bist nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        return;
    }

    try {
        const response = await fetch('http://localhost:5133/api/serviceorders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einfügen
            },
        });

        if (response.ok) {
            const orders = await response.json();
            const ordersList = document.getElementById('service-orders-list');
            ordersList.innerHTML = ''; // Liste zurücksetzen

            orders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.innerHTML = `
                    <h3>${order.customerName}</h3>
                    <p>Service: ${order.serviceType}</p>
                    <p>Priority: ${order.priority}</p>
                    <button onclick="deleteServiceOrder(${order.id})">Entfernen</button>
                `;
                ordersList.appendChild(orderItem);
            });
        } else if (response.status === 401) {
            alert('Dein Token ist abgelaufen. Bitte melde dich erneut an.');
            localStorage.removeItem('token');
            window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        } else {
            alert('Fehler beim Abrufen der Daten.');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Aufträge:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// Funktion zum Aktualisieren einer ServiceOrder
async function updateServiceOrder(orderId) {
    const status = document.getElementById('status-' + orderId).value;
    const employeeComment = document.getElementById('employeeComment-' + orderId).value;
    const savedToken = localStorage.getItem('token'); // Token aus LocalStorage abrufen

    if (!savedToken) {
        alert('Du bist nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        return;
    }

    try {
        const response = await fetch(`http://localhost:5133/api/serviceorders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einfügen
            },
            body: JSON.stringify({
                status: status,
                employeeComment: employeeComment
            }),
        });

        if (response.ok) {
            alert('ServiceOrder aktualisiert');
            loadServiceOrders(); // Liste nach Update aktualisieren
        } else {
            const error = await response.text();
            alert(`Fehler beim Aktualisieren der ServiceOrder: ${error}`);
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren der ServiceOrder:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// Funktion zum Laden der ServiceOrders (mit Update-Option)
async function loadServiceOrders() {
    const savedToken = localStorage.getItem('token'); // Token aus LocalStorage abrufen

    if (!savedToken) {
        alert('Du bist nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        return;
    }

    try {
        const response = await fetch('http://localhost:5133/api/serviceorders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einfügen
            },
        });

        if (response.ok) {
            const orders = await response.json();
            const ordersList = document.getElementById('service-orders-list');
            ordersList.innerHTML = ''; // Liste zurücksetzen

            orders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.innerHTML = `
                    <h3>${order.customerName}</h3>
                    <p>Service: ${order.serviceType}</p>
                    <p>Priority: ${order.priority}</p>
                    <label for="status-${order.id}">Status:</label>
                    <select id="status-${order.id}">
                        <option value="InProgress" ${order.status === 'InProgress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                    <label for="employeeComment-${order.id}">Kommentar:</label>
                    <input type="text" id="employeeComment-${order.id}" value="${order.employeeComment}" />
                    <button onclick="deleteServiceOrder(${order.id})">Entfernen</button>
                    <button onclick="updateServiceOrder(${order.id})">Aktualisieren</button>
                `;
                ordersList.appendChild(orderItem);
            });
        } else if (response.status === 401) {
            alert('Dein Token ist abgelaufen. Bitte melde dich erneut an.');
            localStorage.removeItem('token');
            window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        } else {
            alert('Fehler beim Abrufen der Daten.');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Aufträge:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}


// Funktion zum Löschen einer ServiceOrder
async function deleteServiceOrder(orderId) {
    const savedToken = localStorage.getItem('token'); // Token aus LocalStorage abrufen

    if (!savedToken) {
        alert('Du bist nicht eingeloggt. Bitte melde dich an.');
        window.location.href = 'index.html'; // Weiterleitung zur Login-Seite
        return;
    }

    try {
        const response = await fetch(`http://localhost:5133/api/serviceorders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einfügen
            },
        });

        if (response.ok) {
            alert('ServiceOrder gelöscht');
            loadServiceOrders(); // Liste nach Löschen aktualisieren
        } else {
            alert('Fehler beim Löschen der ServiceOrder.');
        }
    } catch (error) {
        console.error('Fehler beim Löschen der ServiceOrder:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
}

// Event Listener für das Erstellen eines Auftrags
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', createServiceOrder);
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    console.log('Aktueller Pfad:', path);  // Debugging-Ausgabe

    if (path.endsWith('admin.html')) {
        loadServiceOrders(); // Lädt die Aufträge bei Zugriff auf die Verwaltungsseite
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const impressumLink = document.querySelectorAll('[data-link="impressum"]');

    impressumLink.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'impressum.html';
        });
    });
});
