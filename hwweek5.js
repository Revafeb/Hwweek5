class Applicant {
    constructor(name, age, balance) {
        this.name = name;
        this.age = age;
        this.balance = balance;
    }
}

const applicants = [];

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const balance = parseInt(document.getElementById("balance").value);

    if (name.length < 10 || age < 25 || balance < 100000 || balance > 1000000) {
        document.getElementById("registrationMessage").innerHTML = <div class='alert alert-danger'>Mohon periksa kembali input Anda.</div>;
        return;
    }

    const applicant = new Applicant(name, age, balance);
    applicants.push(applicant);
    document.getElementById("registrationMessage").innerHTML = <div class='alert alert-success'>Registrasi berhasil.</div>;
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("balance").value = "";
});

function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (const tab of tabContents) {
        tab.classList.remove("active");
    }
    const tabLinks = document.getElementsByClassName("tablink");
    for (const link of tabLinks) {
        link.classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");

    if (tabName === "list") {
        displayApplicants();
    }
}

function displayApplicants() {
    const tableBody = document.getElementById("applicantList");
    tableBody.innerHTML = "";
    if (applicants.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3'>Tidak ada pendaftar</td></tr>";
        document.getElementById("resume").innerHTML = "";
        return;
    }

    let totalBalance = 0;
    let totalAge = 0;

    for (const applicant of applicants) {
        totalBalance += applicant.balance;
        totalAge += applicant.age;

        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${applicant.name}</td>
                <td>${applicant.age}</td>
                <td>${applicant.balance}</td>
            `;
        tableBody.appendChild(row);
    }

    const averageBalance = totalBalance / applicants.length;
    const averageAge = totalAge / applicants.length;

    const resumeDiv = document.getElementById("resume");
    resumeDiv.innerHTML =
        <div class="alert alert-info" role="alert">
            Rata-rata pendaftar memiliki uang saku sebesar ${averageBalance.toFixed(2)} dengan rata-rata umur ${averageAge.toFixed(2)}
        </div>
        ;
}
