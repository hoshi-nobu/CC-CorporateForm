// =====================
// Character Count
// =====================
const messageEl = document.getElementById("message");
const charCountEl = document.getElementById("char-count");
const MAX_CHARS = 1000;

messageEl.addEventListener("input", () => {
  const len = messageEl.value.length;
  if (len > MAX_CHARS) {
    messageEl.value = messageEl.value.slice(0, MAX_CHARS);
  }
  charCountEl.textContent = `${Math.min(len, MAX_CHARS)} / ${MAX_CHARS}文字`;
  charCountEl.style.color = len >= MAX_CHARS ? "#dc2626" : "#b0b0b0";
});

// =====================
// Validation
// =====================
const rules = [
  {
    id: "category",
    validate: (v) => v !== "",
    message: "お問い合わせ種別を選択してください。",
  },
  {
    id: "name",
    validate: (v) => v.trim() !== "",
    message: "お名前を入力してください。",
  },
  {
    id: "email",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: "正しいメールアドレスを入力してください。",
  },
  {
    id: "subject",
    validate: (v) => v.trim() !== "",
    message: "件名を入力してください。",
  },
  {
    id: "message",
    validate: (v) => v.trim() !== "",
    message: "お問い合わせ内容を入力してください。",
  },
];

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((el) => {
    el.classList.remove("field-error");
  });
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

function showError(id, message) {
  const input = document.getElementById(id);
  const field = input.closest(".field");
  field.classList.add("field-error");

  const msg = document.createElement("p");
  msg.className = "error-message";
  msg.textContent = message;
  field.appendChild(msg);
}

function validate() {
  clearErrors();
  let isValid = true;

  for (const rule of rules) {
    const el = document.getElementById(rule.id);
    if (!rule.validate(el.value)) {
      showError(rule.id, rule.message);
      isValid = false;
    }
  }

  const agree = document.getElementById("agree");
  if (!agree.checked) {
    const checkRow = agree.closest(".check-row");
    const msg = document.createElement("p");
    msg.className = "error-message";
    msg.textContent = "プライバシーポリシーへの同意が必要です。";
    checkRow.insertAdjacentElement("afterend", msg);
    isValid = false;
  }

  return isValid;
}

// =====================
// Form Submission
// =====================
const submitBtn = document.getElementById("submit-btn");
const formCard = document.getElementById("form-card");
const successCard = document.getElementById("success-card");

submitBtn.addEventListener("click", () => {
  if (!validate()) return;

  // 送信処理（実際はここでAPIへのfetchなどを実装）
  const formData = {
    category: document.getElementById("category").value,
    name: document.getElementById("name").value.trim(),
    company: document.getElementById("company").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  console.log("送信データ:", formData);

  // 完了画面に切り替え
  formCard.style.display = "none";
  successCard.style.display = "block";
});

// =====================
// Real-time Validation (on blur)
// =====================
rules.forEach((rule) => {
  const el = document.getElementById(rule.id);
  el.addEventListener("blur", () => {
    // 既存エラーを対象フィールドのみクリア
    const field = el.closest(".field");
    field.classList.remove("field-error");
    field.querySelectorAll(".error-message").forEach((e) => e.remove());

    if (!rule.validate(el.value)) {
      showError(rule.id, rule.message);
    }
  });
});
