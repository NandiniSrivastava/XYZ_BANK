const API_URL = 'https://your-api-gateway-url.amazonaws.com/prod';

// Update form submission
document.getElementById("transactionForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const accNumber = document.getElementById("accNumber").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accNumber: accNumber,
                amount: amount,
                type: type
            })
        });
        
        if (response.ok) {
            clearForm();
            loadTransactions();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Load transactions on page load
document.addEventListener('DOMContentLoaded', loadTransactions);

async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        transactions = await response.json();
        renderTransactions();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTransaction(id) {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id.toString() })
        });
        
        if (response.ok) {
            loadTransactions();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Keep the existing renderTransactions and clearForm functions
