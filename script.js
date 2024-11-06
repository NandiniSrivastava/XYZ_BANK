document.getElementById("transactionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const accNumber = document.getElementById("accNumber").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    addTransaction(accNumber, amount, type);
    clearForm();
});

let transactions = [];

function addTransaction(accNumber, amount, type) {
    const transaction = {
        id: Date.now(),
        accNumber: accNumber,
        amount: amount,
        type: type
    };
    transactions.push(transaction);
    renderTransactions();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderTransactions();
}

function renderTransactions() {
    const tbody = document.getElementById("transactionTableBody");
    tbody.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.accNumber}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><span class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</span></td>
        `;

        tbody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById("accNumber").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "Deposit";
}
