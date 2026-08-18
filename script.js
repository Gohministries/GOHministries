let finance = JSON.parse(localStorage.getItem("finance") || "[]");
let projects = JSON.parse(localStorage.getItem("projects") || "[]");

function show(id) {
    document.querySelectorAll(".page").forEach(p =>
        p.classList.add("hidden")
    );

    document.getElementById(id).classList.remove("hidden");

    update();
}

function toggle(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function saveFinance() {
    finance.push({
        type: type.value,
        date: date.value,
        description: description.value,
        amount: Number(amount.value)
    });

    localStorage.setItem("finance", JSON.stringify(finance));

    renderFinance();
    update();
}

function saveProject() {
    projects.push({
        name: projectName.value,
        budget: Number(projectBudget.value),
        spent: Number(projectSpent.value),
        status: projectStatus.value
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    renderProjects();
    update();
}

function renderFinance() {
    financeList.innerHTML = finance.map((r, i) => `
        <div class="record">
            <b>${r.type.toUpperCase()}</b><br>
            ${r.date}<br>
            ${r.description}<br>
            LKR ${r.amount.toLocaleString()}
            <br><br>
            <button onclick="deleteFinance(${i})">Delete</button>
        </div>
    `).join("");
}

function renderProjects() {
    projectList.innerHTML = projects.map((p, i) => `
        <div class="record">
            <b>${p.name}</b><br>
            Budget: LKR ${p.budget.toLocaleString()}<br>
            Spent: LKR ${p.spent.toLocaleString()}<br>
            Status: ${p.status}
            <br><br>
            <button onclick="deleteProject(${i})">Delete</button>
        </div>
    `).join("");
}

function deleteFinance(i) {
    finance.splice(i, 1);
    localStorage.setItem("finance", JSON.stringify(finance));
    renderFinance();
    update();
}

function deleteProject(i) {
    projects.splice(i, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
    update();
}

function update() {
    let income = 0;
    let expenses = 0;

    finance.forEach(r => {
        if (r.type === "income")
            income += r.amount;
        else
            expenses += r.amount;
    });

    document.getElementById("income").textContent =
        "LKR " + income.toLocaleString();

    document.getElementById("expenses").textContent =
        "LKR " + expenses.toLocaleString();

    document.getElementById("balance").textContent =
        "LKR " + (income - expenses).toLocaleString();

    document.getElementById("projectCount").textContent =
        projects.length;
}

function backup() {
    const data = {
        finance,
        projects,
        date: new Date().toISOString()
    };

    const file = new Blob(
        [JSON.stringify(data, null, 2)],
        {type: "application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = "goh-admin-backup.json";
    link.click();
}

renderFinance();
renderProjects();
update();