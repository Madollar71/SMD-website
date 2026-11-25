
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

const nav = $("#mainNav");
const menuToggle = $("#menuToggle");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

$$("nav a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);

  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.showModal();
}

$$("[data-open]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.plan) {
      $("#vipPlanText").textContent =
        `Selected level: ${button.dataset.plan}. Final price and benefits will be confirmed before payment.`;
    }

    openModal(button.dataset.open);
  });
});

$$(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.close();
  });
});

$$("[data-placeholder]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showToast(
      `Add the official ${link.dataset.placeholder} profile URL in index.html.`
    );
  });
});

// DONATIONS
// Preview only: no real payment is processed.

$("#donateContinue").addEventListener("click", () => {
  const amount = Number($("#donationAmount").value);

  if (!Number.isFinite(amount) || amount < 10) {
    $("#donateMessage").textContent =
      "Enter a contribution of at least KES 10.";
    return;
  }

  $("#donateMessage").textContent =
    "Preview only: no payment was made. Connect a secure M-Pesa checkout backend to continue.";
});

// VIP MEMBERSHIP

$("#vipContinue").addEventListener("click", () => {
  if (
    !$("#vipName").value.trim() ||
    !$("#vipPhone").value.trim()
  ) {
    $("#vipMessage").textContent =
      "Please enter your gamer tag and phone number.";
    return;
  }

  $("#vipMessage").textContent =
    "Interest captured on this preview only. Connect a backend and set confirmed membership prices before taking payment.";
});

// TOURNAMENT REGISTRATION

$("#tournamentContinue").addEventListener("click", () => {
  if (
    !$("#playerName").value.trim() ||
    !$("#playerContact").value.trim()
  ) {
    $("#tournamentMessage").textContent =
      "Please enter your gamer tag and contact details.";
    return;
  }

  $("#tournamentMessage").textContent =
    "Preview only: this form does not send or save your details yet. Connect a registration backend to receive entries.";
});
