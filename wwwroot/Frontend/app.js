let token = ''; // Globale Variable f�r den Token

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
    document.body.classList.remove("modal-open"); // Hintergrund zur�cksetzen
}

// Funktion f�r Login
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
            console.log('Serverantwort:', data);  // �berpr�fe, ob der Token hier enthalten ist

            if (data && data.token) {  // �berpr�fe, ob das Token korrekt ist
                localStorage.setItem('token', data.token); // Speichere den Token im LocalStorage
                alert('Erfolgreich eingeloggt!');
                window.location.href = 'Frontend/admin.html'; // Weiterleitung zur Verwaltungsseite
            } else {
                alert('Token fehlt in der Antwort des Servers.');
            }
        } else {
            alert('Login fehlgeschlagen. Bitte �berpr�fe deine Eingaben.');
        }
    } catch (error) {
        console.error('Fehler beim Login:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es sp�ter erneut.');
    }
}

// Funktion f�r das Erstellen einer ServiceOrder
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
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einf�gen
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
            document.getElementById('orderForm').reset(); // Formular zur�cksetzen
        } else {
            const error = await response.text();
            alert(`Fehler beim Erstellen des Auftrags: ${error}`);
        }
    } catch (error) {
        console.error('Fehler beim Erstellen des Auftrags:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es sp�ter erneut.');
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
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einf�gen
            },
        });

        if (response.ok) {
            const orders = await response.json();
            const ordersList = document.getElementById('service-orders-list');
            ordersList.innerHTML = ''; // Liste zur�cksetzen

            orders.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.innerHTML = `
                    <h3>${order.customerName}</h3>
                    <p>Service: ${order.serviceType}</p>
                    <p>Priorit�t: ${order.priority}</p>
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
        console.error('Fehler beim Abrufen der Auftr�ge:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es sp�ter erneut.');
    }
}

// Funktion zum L�schen einer ServiceOrder
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
                'Authorization': `Bearer ${savedToken}`, // Token in den Header einf�gen
            },
        });

        if (response.ok) {
            alert('ServiceOrder gel�scht');
            loadServiceOrders(); // Liste nach L�schen aktualisieren
        } else {
            alert('Fehler beim L�schen der ServiceOrder.');
        }
    } catch (error) {
        console.error('Fehler beim L�schen der ServiceOrder:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es sp�ter erneut.');
    }
}

// Event Listener f�r das Erstellen eines Auftrags
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', createServiceOrder);
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    console.log('Aktueller Pfad:', path);  // Debugging-Ausgabe

    if (path.endsWith('admin.html')) {
        loadServiceOrders(); // L�dt die Auftr�ge bei Zugriff auf die Verwaltungsseite
    }
});
