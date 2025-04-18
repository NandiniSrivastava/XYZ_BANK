const apiUrl = "https://jq249kyhp3.execute-api.ap-south-1.amazonaws.com/prod/submit";

document.addEventListener('DOMContentLoaded', loadTransactions);

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
        } else {
            console.error("POST failed");
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch');
        const transactions = await response.json();
        renderTransactions(transactions);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTransaction(id) {
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id.toString() })
        });

        if (response.ok) loadTransactions();
        else console.error("DELETE failed");
    } catch (error) {
        console.error('Error:', error);
    }
}

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
