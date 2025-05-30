/* ---------------- Lista de tareas ---------------- */
const listItems = [
  'Error Troubleshooting - [FD 000000] - Descripción',
  'Error Troubleshooting - [FD 000000] - Declinación Universal',
  'Error Troubleshooting - [FD 000000] - Declinación Travel',
  'Error Troubleshooting - [FD 000000] - Asistencia en Ingreso o Registro',
  'Error Troubleshooting - [FD 000000] - Cuenta Sin Tarjeta Virtual',
  'Technical Analysis - [FD 000000] - Descripción',
  'Technical Analysis - [FD 000000] - BO No Permite Aplicar Reembolso',
  'Technical Analysis - [FD 000000] - Sistema No Genera Certificado',
  'Technical Analysis - [FD 000000] - BO No Procesa Cobro QUOS',
  'Functional Support - [FD 000000] - Descripción',
  'Functional Support - [FD 000000] - Actualización de Datos',
  'Functional Support - [FD 000000] - Actualización Datos Cobertura',
  'Functional Support - [FD 000000] - Cancelación Tarjeta Virtual',
  'Functional Support - [FD 000000] - Reverso Split Payment',
  'Functional Support - [FD 000000] - Reverso Compra de Miles',
  'Functional Support - [FD 000000] - Reverso Transacción Universal (Fraude)',
  'User Request Handling - [FD 000000] - Descripción',
  'User Request Handling - [FD 000000] - Asociación de Pago',
  'User Request Handling - [FD 000000] - Cancelación de Certificados',
  'User Request Handling - [FD 000000] - Actualización Cruce de Stripe',
  'User Request Handling - [FD 000000] - Usuario BO Bloqueado (correo@) [BANCO]',
  'User Request Handling - [FD 000000] - Consulta: ¿?',
  'User Request Handling - [FD 000000] - Generación Reportes de Cuentas [BANCOS]',
  'User Request Handling - [FD 000000] - Creación Cuentas de Prueba (correo@)',
  'Incident Resolution - [FD 000000] - Reunión Soporte (Temas Tratados)',
  'Specialized Support Escalation - [FD 000000] - Descripción',
  'Cross-Department Consultation - [FD 000000] - Descripción',
  'Announcements/Training by Gennius - [FD 000000] - Descripción'
];

/* ---------------- Elementos DOM ---------------- */
const container   = document.getElementById("list-container");
const themeBtn    = document.getElementById("themeBtn");
const searchInput = document.getElementById("searchInput");

/* ---------------- Tema: carga y persistencia ---------------- */
(function initTheme() {
  const storedPref  = localStorage.getItem("darkMode");
  const osPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = storedPref === null ? osPrefersDark : JSON.parse(storedPref);

  if (shouldUseDark) document.body.classList.add("dark-mode");
  updateThemeBtnLabel();
})();

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  updateThemeBtnLabel();
}
function updateThemeBtnLabel() {
  const isDark = document.body.classList.contains("dark-mode");
  themeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
}
themeBtn.addEventListener("click", toggleTheme);

/* ---------------- Render lista ---------------- */
function buildList() {
  listItems.forEach(originalText => {
    const div = document.createElement("div");
    div.className = "item";

    /* --- Detectar categoría --- */
    const category = originalText.split(" - ")[0].trim();
    div.dataset.category = category;

    /* --- Extraer código FD --- */
    const codeMatch = originalText.match(/\[FD (\d{6})\]/);
    const defaultCode = codeMatch ? codeMatch[1] : "000000";

    const [beforeCode, afterPart] = originalText.split(/\[FD \d{6}\] - /);
    const afterCode = afterPart ? afterPart.trim() : "";

    /* --- Construir nodos --- */
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    const spanBefore = document.createElement("span");
    spanBefore.textContent = `${beforeCode.trim()} [FD `;

    const inputCode = document.createElement("input");
    inputCode.className = "editable-code";
    inputCode.type = "text";
    inputCode.value = defaultCode;
    inputCode.readOnly = true;

    /* ---- Validación: solo dígitos (0‑9) ---- */
    inputCode.addEventListener("click", () => {
      inputCode.readOnly = false;
      inputCode.focus();
      inputCode.select();
    });
    inputCode.addEventListener("input", () => {
      inputCode.value = inputCode.value.replace(/\D/g, "").slice(0, 6); // solo números (máx 6)
    });
    inputCode.addEventListener("blur", () => {
      inputCode.readOnly = true;
      if (!/^\d{1,6}$/.test(inputCode.value)) inputCode.value = defaultCode;
      inputCode.value = inputCode.value.padStart(6, "0");
    });

    const spanAfter = document.createElement("span");
    spanAfter.textContent = `] - ${afterCode}`;

    textContainer.append(spanBefore, inputCode, spanAfter);

    /* --- Botón copiar --- */
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.setAttribute("aria-label", "Copiar texto");
    btn.title = "Copiar al portapapeles";
    btn.textContent = "📋";

    btn.addEventListener("click", () => {
      const fullText = `${beforeCode.trim()} [FD ${inputCode.value}] - ${afterCode}`;
      navigator.clipboard.writeText(fullText).then(() => {
        btn.classList.add("copied");
        btn.textContent = "✓";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.textContent = "📋";
        }, 1300);
      });
    });

    div.append(textContainer, btn);
    container.appendChild(div);
  });
}
buildList();

/* ---------------- Búsqueda rápida ---------------- */
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  for (const item of container.children) {
    const visible = item.textContent.toLowerCase().includes(query);
    item.style.display = visible ? "flex" : "none";
  }
});
