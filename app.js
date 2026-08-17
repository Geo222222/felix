const SITE_CONFIG = {
  person: { name: "Felix", location: "Nigeria" },
  ngn: { enabled: false, provider: "", paymentUrl: "" },
  crypto: {
    bitcoin: { enabled: false, name: "Bitcoin", symbol: "BTC", network: "Bitcoin", address: "" },
    usdc: { enabled: false, name: "USD Coin", symbol: "USDC", network: "", address: "" },
    usdt: { enabled: false, name: "Tether", symbol: "USDT", network: "", address: "" }
  }
};

const modal = document.getElementById("supportModal");
const modalContent = document.getElementById("modalContent");
let lastFocused = null;

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);

function ngnMarkup() {
  const cfg = SITE_CONFIG.ngn;
  if (cfg.enabled && cfg.paymentUrl) return `<p class="eyebrow">Naira support</p><h2 id="modalTitle">Donate in Naira</h2><p>Your payment is completed on ${escapeHtml(cfg.provider || "Felix’s payment provider")}’s secure hosted page.</p><div class="payment-state"><strong>Ready to support Felix?</strong><p>You’ll leave this website to complete your donation securely.</p><a class="button button-primary" href="${escapeHtml(cfg.paymentUrl)}" target="_blank" rel="noopener noreferrer">Continue to payment</a></div><p class="notice">Felix’s website does not collect or store your card or bank details.</p>`;
  return `<p class="eyebrow">Naira support</p><h2 id="modalTitle">Donate in Naira</h2><p>Felix’s Naira payment channel is being connected. No payment details are collected on this website.</p><div class="payment-state"><strong>Payment link not yet active</strong><p>Please check back after Felix’s hosted Nigerian payment link has been connected.</p></div><p class="notice">Never send card numbers, banking passwords, PINs, or OTP codes through this site.</p>`;
}

function cryptoMarkup() {
  const assets = Object.values(SITE_CONFIG.crypto).filter(a => a.enabled && a.address);
  const list = assets.length ? assets.map(a => `<div class="asset"><div class="asset-head"><div><strong>${escapeHtml(a.symbol)}</strong><small>${escapeHtml(a.name)}</small></div><small>${escapeHtml(a.network)}</small></div><code>${escapeHtml(a.address)}</code><button class="copy-btn" data-copy-address="${escapeHtml(a.address)}">Copy address</button></div>`).join("") : `<div class="payment-state"><strong>Crypto addresses not yet active</strong><p>Felix’s public receiving addresses will appear here once they are verified and connected.</p></div>`;
  return `<p class="eyebrow">Crypto support</p><h2 id="modalTitle">Donate Cryptocurrency</h2><p>Choose only a listed asset and use exactly the network shown. Crypto transactions usually cannot be reversed.</p><div class="asset-list">${list}</div><p class="notice">Only public receiving addresses belong here. Felix will never ask for your wallet seed phrase or private key.</p>`;
}

function openModal(type) {
  lastFocused = document.activeElement;
  modalContent.innerHTML = type === "crypto" ? cryptoMarkup() : ngnMarkup();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close")?.focus();
  modalContent.querySelectorAll("[data-copy-address]").forEach(btn => btn.addEventListener("click", () => copyAddress(btn)));
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lastFocused?.focus();
}

async function copyAddress(button) {
  const value = button.dataset.copyAddress;
  try {
    await navigator.clipboard.writeText(value);
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => button.textContent = old, 1500);
  } catch { window.prompt("Copy this address:", value); }
}

document.querySelectorAll("[data-open-support]").forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.openSupport)));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

async function copyCurrentUrl(button) {
  try {
    await navigator.clipboard.writeText(window.location.href);
    const old = button.textContent;
    button.textContent = "Link copied";
    setTimeout(() => button.textContent = old, 1600);
  } catch { window.prompt("Copy this link:", window.location.href); }
}

document.getElementById("shareButton")?.addEventListener("click", async e => {
  const data = { title: "Support Felix", text: "Support Felix with everyday living needs, teaching, sewing, and ministry.", url: window.location.href };
  if (navigator.share) { try { await navigator.share(data); } catch (err) { if (err.name !== "AbortError") console.error(err); } }
  else copyCurrentUrl(e.currentTarget);
});
document.getElementById("copyLinkButton")?.addEventListener("click", e => copyCurrentUrl(e.currentTarget));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
