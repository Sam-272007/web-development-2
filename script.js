let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let selectedType = "";

const steps = document.querySelectorAll(".step");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const form = document.getElementById("transactionForm");
const resetBtn = document.getElementById("resetBtn");

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");

function showStep(id) {
    steps.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
    let income = 0;
    let expense = 0;
    listEl.innerHTML = "";

    transactions.forEach(t => {
        t.type === "income" ? income += t.amount : expense += t.amount;
        const li = document.createElement("li");
        li.innerHTML = `<span>${t.category}</span><span>₹${t.amount}</span>`;
        listEl.appendChild(li);
    });

    incomeEl.textContent = income;
    expenseEl.textContent = expense;
    balanceEl.textContent = income - expense;
}

function resetFlow() {
    amountInput.value = "";
    categoryInput.value = "";
    showStep("step1");
}

function incomeAnimation() {
    for (let i = 0; i < 18; i++) {
        const m = document.createElement("div");
        m.className = "money";
        m.textContent = "₹";
        m.style.left = Math.random() * 100 + "vw";
        m.style.animationDuration = 2.5 + Math.random() * 2 + "s";
        document.body.appendChild(m);
        setTimeout(() => m.remove(), 5000);
    }
}

function expenseAnimation(amount) {
    for (let i = 0; i < 4; i++) {
        const t = document.createElement("div");
        t.className = "expense-text";
        t.textContent = `−₹${amount}`;
        t.style.left = 35 + Math.random() * 30 + "%";
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2200);
    }
}

incomeBtn.addEventListener("click", () => {
    selectedType = "income";
    showStep("step2");
});

expenseBtn.addEventListener("click", () => {
    selectedType = "expense";
    showStep("step2");
});

form.addEventListener("submit", e => {
    e.preventDefault();

    if (document.getElementById("step2").classList.contains("active")) {
        if (amountInput.value <= 0) return alert("Enter a valid amount");
        showStep("step3");
        return;
    }

    if (categoryInput.value.trim() === "") return alert("Enter a category");

    const amount = Number(amountInput.value);

    transactions.push({
        type: selectedType,
        amount: amount,
        category: categoryInput.value
    });

    saveData();
    selectedType === "income" ? incomeAnimation() : expenseAnimation(amount);
    updateUI();
    resetFlow();
});

resetBtn.addEventListener("click", () => {
    transactions = [];
    localStorage.removeItem("transactions");
    updateUI();
    resetFlow();
});

updateUI();
