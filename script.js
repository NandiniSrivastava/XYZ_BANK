const API_URL = 'https://1degu0wnr1.execute-api.ap-south-1.amazonaws.com/prod';
// DOM Loaded
document.addEventListener('DOMContentLoaded', loadTransactions);

// Form Submission
document.getElementById("transactionForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const transaction = {
        accNumber: document.getElementById("accNumber").value,
        amount: document.getElementById("amount").value,
        type: document.getElementById("type").value
    };

    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        });
        
        if (response.ok) {
            clearForm();
            loadTransactions();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Load Transactions
async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();
        renderTransactions(transactions);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete Transaction
async function deleteTransaction(id) {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id.toString() })
        });
        
        if (response.ok) loadTransactions();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Render Transactions (updated)
function renderTransactions(transactions) {
    const tbody = document.getElementById("transactionTableBody");
    tbody.innerHTML = transactions.map(transaction => `
        <tr>
            <td>${transaction.accNumber}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><span class="delete-btn" onclick="deleteTransaction('${transaction.id}')">Delete</span></td>
        </tr>
    `).join('');
}

function clearForm() {
    document.getElementById("transactionForm").reset();
}
