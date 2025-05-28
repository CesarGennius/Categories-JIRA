
const listItems = ['User Request Handling - [FD 000000] - Asociación De Pago', 'User Request Handling - [FD 000000] - Cancelación De Certificados', 'User Request Handling - [FD 000000] - Actualización Cruce De Stripe', 'User Request Handling - [FD 000000] - Usuario BO Bloqueado (correo@) [BANCO]', 'User Request Handling - [FD 000000] - Consulta: ¿CIBC No Tiene Implementado Un API?', 'User Request Handling - [FD 000000] - Generación Reportes De Cuentas [CIBC, FC, BANCO, MR, CHN Y Cuscatlan]', 'User Request Handling - [FD 000000] - Creación Cuentas De Prueba (correo@)', 'Technical Analysis - [FD 000000] - BO No Permite Aplicar Reembolso', 'Technical Analysis - [FD 000000] - Sistema No Generó Certificado', 'Technical Analysis - [FD 000000] - Cobro No Procesa', 'Functional Support - [FD 000000] - Actualización Datos Cobertura', 'Functional Support - [FD 000000] - Actualización De Datos', 'Functional Support - [FD 000000] - Cancelación Tarjeta Virtual', 'Functional Support - [FD 000000] - Reverso Split Payment', 'Functional Support - [FD 000000] - Reverso Compra De Miles', 'Error Troubleshooting - [FD 000000] - Declinación Travel', 'Error Troubleshooting - [FD 000000] - Asistencia En Ingreso O Registro', 'Error Troubleshooting - [FD 000000] - Cuenta Sin Tarjeta Virtual', 'Error Troubleshooting - [FD 000000] - Declinación Universal', 'Incident Resolution - [FD 000000] - Reunión Soporte (Temas Tratados)'];

const container = document.getElementById("list-container");

listItems.forEach(text => {
  const div = document.createElement("div");
  div.className = "item";

  const textContainer = document.createElement("div");
  textContainer.className = "text-container";

  const spanText = document.createElement("span");
  spanText.className = "text";
  spanText.textContent = text;

  textContainer.appendChild(spanText);

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.title = "Copiar al portapapeles";
  btn.innerText = "📋";

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(text).then(() => {
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
