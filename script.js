const apiUrl = "https://jq249kyhp3.execute-api.ap-south-1.amazonaws.com/prod";

document.addEventListener('DOMContentLoaded', loadTransactions);

document.getElementById("transactionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const transaction = {
        accNumber: document.getElementById("accNumber").value,
        amount: document.getElementById("amount").value,
        type: document.getElementById("type").value
    };

    try {
        const response = await fetch(`${apiUrl}/submit`, {
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
