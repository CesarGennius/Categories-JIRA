const listItems = [
  'User Request Handling - [FD 000000] - Asociación de Pago',
  'User Request Handling - [FD 000000] - Cancelación de Certificados',
  'User Request Handling - [FD 000000] - Actualización Cruce de Stripe',
  'User Request Handling - [FD 000000] - Usuario BO Bloqueado (correo@) [BANCO]',
  'User Request Handling - [FD 000000] - Consulta: ¿?',
  'User Request Handling - [FD 000000] - Generación Reportes de Cuentas [BANCOS]',
  'User Request Handling - [FD 000000] - Creación Cuentas de Prueba (correo@)',
  'Technical Analysis - [FD 000000] - BO No Permite Aplicar Reembolso',
  'Technical Analysis - [FD 000000] - Sistema No Genera Certificado',
  'Technical Analysis - [FD 000000] - BO No Procesa Cobro QUOS',
  'Functional Support - [FD 000000] - Actualización Datos Cobertura',
  'Functional Support - [FD 000000] - Actualización de Datos',
  'Functional Support - [FD 000000] - Cancelación Tarjeta Virtual',
  'Functional Support - [FD 000000] - Reverso Split Payment',
  'Functional Support - [FD 000000] - Reverso Compra de Miles',
  'Error Troubleshooting - [FD 000000] - Declinación Travel',
  'Error Troubleshooting - [FD 000000] - Asistencia en Ingreso o Registro',
  'Error Troubleshooting - [FD 000000] - Cuenta Sin Tarjeta Virtual',
  'Error Troubleshooting - [FD 000000] - Declinación Universal',
  'Incident Resolution - [FD 000000] - Reunión Soporte (Temas Tratados)'
];

const container = document.getElementById("list-container");

listItems.forEach(originalText => {
  const div = document.createElement("div");
  div.className = "item";

  const textContainer = document.createElement("div");
  textContainer.className = "text-container";

  const codeMatch = originalText.match(/\[FD (\d{6})\]/);
  const codeValue = codeMatch ? codeMatch[1] : "000000";

  const parts = originalText.split(/\[FD \d{6}\] - /);
  const beforeCode = parts[0].trim();
  const afterCode = parts[1] ? parts[1].trim() : "";

  const spanBefore = document.createElement("span");
  spanBefore.textContent = `${beforeCode} [FD `;

  const inputCode = document.createElement("input");
  inputCode.className = "editable-code";
  inputCode.type = "text";
  inputCode.value = codeValue;
  inputCode.readOnly = true;

  inputCode.addEventListener("click", () => {
    inputCode.readOnly = false;
    inputCode.focus();
    inputCode.select();
  });

  inputCode.addEventListener("blur", () => {
    inputCode.readOnly = true;
    if (!/^\d{6}$/.test(inputCode.value)) {
      inputCode.value = codeValue;
    }
  });

  const spanAfter = document.createElement("span");
  spanAfter.textContent = `] - ${afterCode}`;

  textContainer.appendChild(spanBefore);
  textContainer.appendChild(inputCode);
  textContainer.appendChild(spanAfter);

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.title = "Copiar al portapapeles";
  btn.innerText = "📋";

  btn.addEventListener("click", () => {
    const fullText = `${beforeCode} [FD ${inputCode.value}] - ${afterCode}`;
    navigator.clipboard.writeText(fullText).then(() => {
      btn.classList.add("copied");
      btn.innerText = "✓";
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerText = "📋";
      }, 1300);
    });
  });

  div.appendChild(textContainer);
  div.appendChild(btn);
  container.appendChild(div);
});

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("themeBtn");
  btn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
}
