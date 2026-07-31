function toggleMenu(){
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

function closeMenu(){
    const nav = document.getElementById("navLinks");
    nav.classList.remove("active");
}

function copyAccount(){
    const account = document.getElementById("accountNumber").innerText.trim();
    navigator.clipboard.writeText(account)
    .then(function(){
        alert("Account number copied.");
    })
    .catch(function(){
        alert("Please copy the account number manually.");
    });
}
