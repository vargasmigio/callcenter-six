const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const formMessage = document.querySelector("#formMessage");
const togglePassword = document.querySelector("#togglePassword");
const ticketsChart = document.querySelector("#ticketsChart");
let dashboardTicketsChart = null;

const allowedUsers = [
  { username: "karol", password: "123456" },
  { username: "eberth", password: "123456" },
  { username: "rosmery", password: "123456" },
  { username: "george", password: "123456" },
  { username: "miguel", password: "123456" }
];

function setMessage(message, type = "error") {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = message;
  formMessage.classList.toggle("success", type === "success");
}

function validateCredentials(username, password) {
  if (!username || !password) {
    return "Completa el usuario y la contraseña para continuar.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  const hasAccess = allowedUsers.some((user) => (
    user.username === username && user.password === password
  ));

  if (!hasAccess) {
    return "Usuario o contraseña incorrectos. Verifica tus datos de acceso.";
  }

  return "";
}

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("is-visible", isPassword);
    togglePassword.setAttribute("aria-pressed", String(isPassword));
    togglePassword.setAttribute(
      "aria-label",
      isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
    );
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const errorMessage = validateCredentials(username, password);

    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    const submitButton = loginForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Validando acceso...";
    setMessage("Acceso autorizado. Redirigiendo al dashboard.", "success");

    localStorage.setItem("ccai-session", JSON.stringify({
      user: username,
      role: "Supervisor de atención",
      loginAt: new Date().toISOString()
    }));

    window.setTimeout(() => {
      window.location.href = "pages/dashboard.html";
    }, 900);
  });
}

const dashboardFallback = {
  calidad: 94,
  kpis: {
    ticketsHoy: { valor: 186, tendencia: "+12% frente al promedio diario" },
    enProceso: { valor: 43, tendencia: "18 casos dentro del SLA crítico" },
    resueltos: { valor: 129, tendencia: "91% resueltos en primer contacto" },
    tiempoPromedio: { valor: "03:24", tendencia: "-36s frente a la semana anterior" },
    satisfaccion: { valor: "4.8/5", tendencia: "+0.3 puntos en CSAT" }
  },
  ticketsPorDia: [
    { dia: "Lun", tickets: 142 },
    { dia: "Mar", tickets: 168 },
    { dia: "Mie", tickets: 156 },
    { dia: "Jue", tickets: 181 },
    { dia: "Vie", tickets: 194 },
    { dia: "Sab", tickets: 128 },
    { dia: "Dom", tickets: 96 }
  ],
  actividadReciente: [
    {
      tipo: "Ticket escalado",
      detalle: "Caso #CC-1027 enviado al área de retención por riesgo de baja.",
      hora: "08:42",
      estado: "Prioridad alta"
    },
    {
      tipo: "Evaluación QA",
      detalle: "Agente Mariana Torres obtuvo 96% en protocolo de empatía.",
      hora: "08:31",
      estado: "Aprobado"
    }
  ]
};

const ticketsFallback = [
  {
    id: "CC-1042",
    cliente: "Ana Martinez",
    asunto: "Consulta sobre facturación duplicada",
    estado: "En proceso",
    prioridad: "Alta",
    fecha: "2026-05-23",
    canal: "Teléfono",
    agente: "Mariana Torres",
    descripcion: "La cliente reporta dos cargos en su estado de cuenta y solicita validación antes del cierre del ciclo."
  },
  {
    id: "CC-1041",
    cliente: "Roberto Salas",
    asunto: "Solicitud de cambio de plan",
    estado: "Abierto",
    prioridad: "Media",
    fecha: "2026-05-23",
    canal: "Chat",
    agente: "Luis Paredes",
    descripcion: "El cliente desea migrar a un plan empresarial y requiere confirmación de beneficios disponibles."
  }
];

const metricsEvaluationFallback = {
  puntajeGlobal: 91,
  desempeno: {
    tiempoAtencion: { valor: "04:12", tendencia: "-18s frente a la medición anterior" },
    tiempoRespuesta: { valor: "318 ms", tendencia: "Dentro del objetivo de 400 ms" },
    erroresRegistro: { valor: "2.1%", tendencia: "-0.7% luego de ajustes en formulario" }
  },
  usabilidad: {
    satisfaccionCliente: { valor: "4.7/5", tendencia: "Alta valoración en encuestas CSAT" },
    facilidadUso: { valor: "92%", tendencia: "Usuarios completan tareas sin asistencia" },
    rapidezSistema: { valor: "89%", tendencia: "Percepcion positiva de velocidad" }
  },
  series: {
    dias: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    tiempoAtencion: [4.8, 4.6, 4.4, 4.3, 4.2, 4.1, 4.0],
    tiempoRespuesta: [382, 361, 344, 332, 318, 306, 296],
    erroresRegistro: [4.1, 3.8, 3.2, 2.9, 2.4, 2.1, 1.9],
    usabilidad: {
      labels: ["Satisfaccion", "Facilidad", "Rapidez"],
      valores: [94, 92, 89]
    }
  }
};

const reportsFallback = {
  impactoGeneral: 74,
  resumen: "La implementación del sistema inteligente redujo tiempos críticos, disminuyó errores operativos y aumentó la capacidad de resolución del equipo de atención.",
  resultados: [
    {
      indicador: "Tiempo de respuesta",
      antes: 10,
      despues: 2,
      unidad: "s",
      impacto: "80% más rápido",
      tipo: "reducir"
    },
    {
      indicador: "Errores de registro",
      antes: 12,
      despues: 3,
      unidad: "%",
      impacto: "75% menos errores",
      tipo: "reducir"
    },
    {
      indicador: "Resolución en primer contacto",
      antes: 54,
      despues: 83,
      unidad: "%",
      impacto: "+29 puntos",
      tipo: "aumentar"
    }
  ]
};

const improvementsFallback = {
  prioridadPromedio: 88,
  resumen: "Las mejoras propuestas fortalecen el rendimiento operativo, la experiencia de usuario y la automatización de procesos críticos.",
  mejoras: [
    {
      titulo: "Optimización del sistema",
      descripcion: "Ajustar consultas, cache de datos frecuentes y carga progresiva de módulos para mejorar estabilidad.",
      impacto: "Alto",
      indicador: "Reducción estimada del 35% en latencia",
      prioridad: 92
    },
    {
      titulo: "Mejoras en UI",
      descripcion: "Simplificar flujos de tickets y reforzar jerarquía visual para disminuir errores del operador.",
      impacto: "Alto",
      indicador: "Hasta 28% menos errores de registro",
      prioridad: 89
    }
  ]
};

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function readSessionUser() {
  try {
    const session = JSON.parse(localStorage.getItem("ccai-session"));
    return session && session.user ? session.user : "Supervisor";
  } catch (error) {
    return "Supervisor";
  }
}

async function loadMetrics() {
  try {
    const response = await fetch("../data/metricas.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudo cargar metricas.json");
    }

    return await response.json();
  } catch (error) {
    return dashboardFallback;
  }
}

async function loadTickets() {
  try {
    const response = await fetch("../data/tickets.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudo cargar tickets.json");
    }

    return await response.json();
  } catch (error) {
    return ticketsFallback;
  }
}

async function loadEvaluationMetrics() {
  try {
    const response = await fetch("../data/metricas-evaluacion.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudo cargar metricas-evaluacion.json");
    }

    return await response.json();
  } catch (error) {
    return metricsEvaluationFallback;
  }
}

async function loadReports() {
  try {
    const response = await fetch("../data/reportes.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudo cargar reportes.json");
    }

    return await response.json();
  } catch (error) {
    return reportsFallback;
  }
}

async function loadImprovements() {
  try {
    const response = await fetch("../data/mejoras.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("No se pudo cargar mejoras.json");
    }

    return await response.json();
  } catch (error) {
    return improvementsFallback;
  }
}

function renderKpis(data) {
  const kpis = data.kpis;

  setText("#qualityScore", `${data.calidad}%`);
  setText("#ticketsHoy", kpis.ticketsHoy.valor);
  setText("#ticketsHoyTrend", kpis.ticketsHoy.tendencia);
  setText("#enProceso", kpis.enProceso.valor);
  setText("#enProcesoTrend", kpis.enProceso.tendencia);
  setText("#resueltos", kpis.resueltos.valor);
  setText("#resueltosTrend", kpis.resueltos.tendencia);
  setText("#tiempoPromedio", kpis.tiempoPromedio.valor);
  setText("#tiempoTrend", kpis.tiempoPromedio.tendencia);
  setText("#satisfaccion", kpis.satisfaccion.valor);
  setText("#satisfaccionTrend", kpis.satisfaccion.tendencia);
}

function renderActivity(items) {
  const list = document.querySelector("#activityList");

  if (!list) {
    return;
  }

  list.innerHTML = items.map((item, index) => `
    <article class="activity-item" style="animation-delay: ${index * 70}ms">
      <span class="activity-dot"></span>
      <div>
        <div class="activity-meta">
          <strong>${item.tipo}</strong>
          <span>${item.hora}</span>
        </div>
        <p>${item.detalle}</p>
        <span class="activity-status">${item.estado}</span>
      </div>
    </article>
  `).join("");

  setText("#activityCount", `${items.length} eventos`);
}

function drawTicketsChart(points) {
  if (!ticketsChart) {
    return;
  }

  if (window.Chart) {
    if (dashboardTicketsChart) {
      dashboardTicketsChart.destroy();
    }

    chartDefaults();
    dashboardTicketsChart = new Chart(ticketsChart, {
      type: "bar",
      data: {
        labels: points.map((point) => point.dia),
        datasets: [
          {
            label: "Tickets por día",
            data: points.map((point) => point.tickets),
            backgroundColor: [
              "rgba(37, 99, 235, 0.82)",
              "rgba(124, 58, 237, 0.82)",
              "rgba(34, 197, 94, 0.78)",
              "rgba(234, 179, 8, 0.82)",
              "rgba(236, 72, 153, 0.78)",
              "rgba(14, 165, 233, 0.78)",
              "rgba(239, 68, 68, 0.72)"
            ],
            borderRadius: 10,
            maxBarThickness: 56
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#eef2f7" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
    return;
  }

  const context = ticketsChart.getContext("2d");
  const width = ticketsChart.width;
  const height = ticketsChart.height;
  const padding = 48;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const maxTickets = Math.max(...points.map((point) => point.tickets));
  const barWidth = chartWidth / points.length * 0.52;

  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.strokeStyle = "#e2e8f0";
  context.font = "700 14px Inter, Arial, sans-serif";
  context.fillStyle = "#64748b";

  for (let index = 0; index <= 4; index += 1) {
    const y = padding + chartHeight / 4 * index;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  points.forEach((point, index) => {
    const x = padding + chartWidth / points.length * index + chartWidth / points.length * 0.24;
    const barHeight = point.tickets / maxTickets * chartHeight;
    const y = height - padding - barHeight;
    const gradient = context.createLinearGradient(0, y, 0, height - padding);

    gradient.addColorStop(0, "#7c3aed");
    gradient.addColorStop(1, "#2563eb");

    context.fillStyle = gradient;
    roundRect(context, x, y, barWidth, barHeight, 12);
    context.fill();

    context.fillStyle = "#08111f";
    context.textAlign = "center";
    context.fillText(point.tickets, x + barWidth / 2, y - 12);

    context.fillStyle = "#64748b";
    context.fillText(point.dia, x + barWidth / 2, height - 18);
  });
}

function roundRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}

async function initDashboard() {
  if (!document.querySelector(".dashboard-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());

  const metrics = await loadMetrics();
  renderKpis(metrics);
  renderActivity(metrics.actividadReciente);
  drawTicketsChart(metrics.ticketsPorDia);
  initDashboardTabs();
}

const refreshDashboard = document.querySelector("#refreshDashboard");

if (refreshDashboard) {
  refreshDashboard.addEventListener("click", initDashboard);
}

window.addEventListener("resize", () => {
  if (ticketsChart) {
    loadMetrics().then((metrics) => drawTicketsChart(metrics.ticketsPorDia));
  }
});

initDashboard();

function initDashboardTabs() {
  const tabs = document.querySelectorAll("[data-dashboard-tab]");
  const sections = document.querySelectorAll("[data-dashboard-section]");

  if (!tabs.length || !sections.length) {
    return;
  }

  if (document.body.dataset.dashboardTabsReady === "true") {
    return;
  }

  document.body.dataset.dashboardTabsReady = "true";

  function activateDashboardTab(tabName) {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.dashboardTab === tabName);
    });

    sections.forEach((section) => {
      const visible = section.dataset.dashboardSection.split(" ").includes(tabName);
      section.hidden = !visible;
    });

    if (ticketsChart && tabName !== "satisfaccion") {
      loadMetrics().then((metrics) => drawTicketsChart(metrics.ticketsPorDia));
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateDashboardTab(tab.dataset.dashboardTab));
  });

  activateDashboardTab("tickets");
}

let allTickets = [];
let selectedTicketId = "";

function normalizeText(value) {
  return String(value).trim().toLowerCase();
}

function slug(value) {
  return normalizeText(value).replace(/\s+/g, "-");
}

function formatTicketDate(value) {
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getFilteredTickets() {
  const search = normalizeText(document.querySelector("#ticketSearch").value);
  const status = document.querySelector("#statusFilter").value;
  const priority = document.querySelector("#priorityFilter").value;

  return allTickets.filter((ticket) => {
    const matchesSearch = !search
      || normalizeText(ticket.id).includes(search)
      || normalizeText(ticket.cliente).includes(search);
    const matchesStatus = status === "todos" || ticket.estado === status;
    const matchesPriority = priority === "todas" || ticket.prioridad === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

function renderTicketSummary(tickets) {
  const activeCount = tickets.filter((ticket) => ticket.estado !== "Resuelto").length;
  const highPriority = tickets.filter((ticket) => ticket.prioridad === "Alta").length;
  const resolved = tickets.filter((ticket) => ticket.estado === "Resuelto").length;

  setText("#ticketsActiveCount", activeCount);
  setText("#ticketTotal", tickets.length);
  setText("#ticketHighPriority", highPriority);
  setText("#ticketResolved", resolved);
}

function renderTicketsTable(tickets) {
  const tableBody = document.querySelector("#ticketsTableBody");

  if (!tableBody) {
    return;
  }

  if (!tickets.length) {
    tableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">No se encontraron tickets con los filtros seleccionados.</td>
      </tr>
    `;
    setText("#ticketResultCount", "0 resultados");
    return;
  }

  tableBody.innerHTML = tickets.map((ticket) => `
    <tr data-ticket-id="${ticket.id}" class="${ticket.id === selectedTicketId ? "selected" : ""}">
      <td><span class="ticket-id">${ticket.id}</span></td>
      <td>${ticket.cliente}</td>
      <td><span class="ticket-subject">${ticket.asunto}</span></td>
      <td><span class="status-badge status-${slug(ticket.estado)}">${ticket.estado}</span></td>
      <td><span class="priority-badge priority-${slug(ticket.prioridad)}">${ticket.prioridad}</span></td>
      <td>${formatTicketDate(ticket.fecha)}</td>
    </tr>
  `).join("");

  setText("#ticketResultCount", `${tickets.length} resultados`);

  tableBody.querySelectorAll("tr[data-ticket-id]").forEach((row) => {
    row.addEventListener("click", () => {
      selectedTicketId = row.dataset.ticketId;
      const selectedTicket = allTickets.find((ticket) => ticket.id === selectedTicketId);
      renderTicketDetail(selectedTicket);
      renderTicketsTable(getFilteredTickets());
    });
  });
}

function renderTicketDetail(ticket) {
  const detail = document.querySelector("#ticketDetail");

  if (!detail || !ticket) {
    return;
  }

  detail.innerHTML = `
    <span class="detail-kicker">Detalle del caso</span>
    <h2>${ticket.id}</h2>
    <p>${ticket.descripcion}</p>
    <div class="detail-grid">
      <div>
        <span>Cliente</span>
        <strong>${ticket.cliente}</strong>
      </div>
      <div>
        <span>Asunto</span>
        <strong>${ticket.asunto}</strong>
      </div>
      <div>
        <span>Estado</span>
        <strong>${ticket.estado}</strong>
      </div>
      <div>
        <span>Prioridad</span>
        <strong>${ticket.prioridad}</strong>
      </div>
      <div>
        <span>Canal</span>
        <strong>${ticket.canal}</strong>
      </div>
      <div>
        <span>Agente asignado</span>
        <strong>${ticket.agente}</strong>
      </div>
      <div>
        <span>Fecha</span>
        <strong>${formatTicketDate(ticket.fecha)}</strong>
      </div>
    </div>
  `;
}

function applyTicketFilters() {
  const filteredTickets = getFilteredTickets();
  renderTicketsTable(filteredTickets);
}

async function initTicketsModule() {
  if (!document.querySelector(".tickets-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());
  allTickets = await loadTickets();
  selectedTicketId = allTickets[0] ? allTickets[0].id : "";

  renderTicketSummary(allTickets);
  renderTicketsTable(allTickets);

  if (allTickets[0]) {
    renderTicketDetail(allTickets[0]);
  }

  ["#ticketSearch", "#statusFilter", "#priorityFilter"].forEach((selector) => {
    const control = document.querySelector(selector);

    if (control) {
      control.addEventListener("input", applyTicketFilters);
      control.addEventListener("change", applyTicketFilters);
    }
  });

  const clearButton = document.querySelector("#clearTicketFilters");

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      document.querySelector("#ticketSearch").value = "";
      document.querySelector("#statusFilter").value = "todos";
      document.querySelector("#priorityFilter").value = "todas";
      applyTicketFilters();
    });
  }
}

initTicketsModule();

const simulationState = {
  mode: "normal",
  users: 218,
  targetUsers: 240,
  responseTime: 280,
  queuedTickets: 18,
  history: Array.from({ length: 16 }, (_, index) => 35 + index * 2)
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function isSystemSaturated(users) {
  return users > 450;
}

function calculateSimulationMetrics() {
  const drift = Math.round((simulationState.targetUsers - simulationState.users) * 0.22);
  const jitter = randomBetween(-12, 12);

  simulationState.users = clamp(simulationState.users + drift + jitter, 90, 760);

  const saturated = isSystemSaturated(simulationState.users);
  const baseResponse = saturated ? 930 : 260;
  const loadFactor = saturated
    ? (simulationState.users - 450) * 2.2
    : simulationState.users * 0.42;

  simulationState.responseTime = Math.round(baseResponse + loadFactor + randomBetween(-42, 58));
  simulationState.queuedTickets = saturated
    ? Math.round((simulationState.users - 390) / 3 + randomBetween(8, 28))
    : Math.max(4, Math.round(simulationState.users / 14 + randomBetween(-5, 8)));

  const loadPercent = clamp(Math.round(simulationState.users / 760 * 100), 8, 100);
  simulationState.history.push(loadPercent);
  simulationState.history = simulationState.history.slice(-16);
}

function renderSimulation() {
  const main = document.querySelector(".simulation-main");

  if (!main) {
    return;
  }

  const saturated = isSystemSaturated(simulationState.users);
  const hero = document.querySelector(".simulation-hero");
  const status = saturated ? "Saturado" : "Estable";

  if (hero) {
    hero.classList.toggle("saturated", saturated);
  }

  setText("#simulationMode", simulationState.mode === "alta" ? "Alta" : "Normal");
  setText("#systemStatus", status);
  setText("#activeUsers", simulationState.users);
  setText("#responseTime", `${simulationState.responseTime} ms`);
  setText("#queuedTickets", simulationState.queuedTickets);
  setText("#simulationClock", new Date().toLocaleTimeString("es-PE"));
  setText(
    "#systemNarrative",
    saturated
      ? "La carga supero el umbral operativo; se incrementan latencia y cola de tickets."
      : "La plataforma opera dentro del rango esperado para atencion simultanea."
  );
  setText(
    "#activeUsersTrend",
    saturated ? "Demanda por encima del umbral" : "Concurrencia controlada"
  );
  setText(
    "#responseTrend",
    saturated ? "Respuesta degradada por carga alta" : "Latencia dentro del objetivo"
  );
  setText(
    "#queueTrend",
    saturated ? "Cola creciendo por saturacion" : "Cola operativa estable"
  );

  const loadBars = document.querySelector("#loadBars");

  if (loadBars) {
    loadBars.innerHTML = simulationState.history.map((value) => `
      <span
        class="load-bar ${saturated ? "saturated" : ""}"
        style="height: ${value}%"
      ></span>
    `).join("");
  }
}

function tickSimulation() {
  calculateSimulationMetrics();
  renderSimulation();
}

function initSimulationModule() {
  if (!document.querySelector(".simulation-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());

  const highButton = document.querySelector("#simulateHigh");
  const normalButton = document.querySelector("#simulateNormal");

  if (highButton) {
    highButton.addEventListener("click", () => {
      simulationState.mode = "alta";
      simulationState.targetUsers = randomBetween(560, 720);
      tickSimulation();
    });
  }

  if (normalButton) {
    normalButton.addEventListener("click", () => {
      simulationState.mode = "normal";
      simulationState.targetUsers = randomBetween(180, 320);
      tickSimulation();
    });
  }

  renderSimulation();
  window.setInterval(tickSimulation, 1400);
}

initSimulationModule();

function renderMetricCards(data) {
  setText("#metricsGlobalScore", `${data.puntajeGlobal}%`);
  setText("#attentionTime", data.desempeno.tiempoAtencion.valor);
  setText("#attentionTimeTrend", data.desempeno.tiempoAtencion.tendencia);
  setText("#metricsResponseTime", data.desempeno.tiempoRespuesta.valor);
  setText("#metricsResponseTimeTrend", data.desempeno.tiempoRespuesta.tendencia);
  setText("#registrationErrors", data.desempeno.erroresRegistro.valor);
  setText("#registrationErrorsTrend", data.desempeno.erroresRegistro.tendencia);
  setText("#customerSatisfaction", data.usabilidad.satisfaccionCliente.valor);
  setText("#customerSatisfactionTrend", data.usabilidad.satisfaccionCliente.tendencia);
  setText("#easeOfUse", data.usabilidad.facilidadUso.valor);
  setText("#easeOfUseTrend", data.usabilidad.facilidadUso.tendencia);
  setText("#systemSpeed", data.usabilidad.rapidezSistema.valor);
  setText("#systemSpeedTrend", data.usabilidad.rapidezSistema.tendencia);
}

function chartDefaults() {
  if (!window.Chart) {
    return;
  }

  Chart.defaults.font.family = "Inter, Arial, sans-serif";
  Chart.defaults.color = "#64748b";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
}

function createPerformanceChart(data) {
  const canvas = document.querySelector("#performanceChart");

  if (!canvas || !window.Chart) {
    return;
  }

  new Chart(canvas, {
    type: "line",
    data: {
      labels: data.series.dias,
      datasets: [
        {
          label: "Tiempo de atencion (min)",
          data: data.series.tiempoAtencion,
          borderColor: "#7c3aed",
          backgroundColor: "rgba(124, 58, 237, 0.12)",
          tension: 0.38,
          fill: true
        },
        {
          label: "Tiempo de respuesta (ms)",
          data: data.series.tiempoRespuesta,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          tension: 0.38,
          yAxisID: "response"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#eef2f7" }
        },
        response: {
          position: "right",
          beginAtZero: true,
          grid: { drawOnChartArea: false }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function createUsabilityChart(data) {
  const canvas = document.querySelector("#usabilityChart");

  if (!canvas || !window.Chart) {
    return;
  }

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: data.series.usabilidad.labels,
      datasets: [
        {
          label: "Indicadores UX",
          data: data.series.usabilidad.valores,
          borderColor: "#7c3aed",
          backgroundColor: "rgba(124, 58, 237, 0.18)",
          pointBackgroundColor: "#2563eb"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 },
          grid: { color: "#e2e8f0" },
          angleLines: { color: "#e2e8f0" }
        }
      }
    }
  });
}

function createErrorsChart(data) {
  const canvas = document.querySelector("#errorsChart");

  if (!canvas || !window.Chart) {
    return;
  }

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: data.series.dias,
      datasets: [
        {
          label: "Errores de registro (%)",
          data: data.series.erroresRegistro,
          backgroundColor: data.series.erroresRegistro.map((value) => (
            value > 3 ? "rgba(239, 68, 68, 0.72)" : "rgba(37, 99, 235, 0.78)"
          )),
          borderRadius: 10,
          maxBarThickness: 54
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#eef2f7" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function renderMetricCharts(data) {
  chartDefaults();
  createPerformanceChart(data);
  createUsabilityChart(data);
  createErrorsChart(data);
}

async function initMetricsModule() {
  if (!document.querySelector(".metrics-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());

  const data = await loadEvaluationMetrics();
  renderMetricCards(data);
  renderMetricCharts(data);
}

initMetricsModule();

function formatReportValue(item, key) {
  return `${item[key]}${item.unidad}`;
}

function improvementPercent(item) {
  if (item.tipo === "reducir") {
    return Math.round((item.antes - item.despues) / item.antes * 100);
  }

  return Math.round((item.despues - item.antes) / item.antes * 100);
}

function renderReportSummary(data) {
  setText("#reportImpactScore", `${data.impactoGeneral}%`);
  setText("#reportHeroImpact", `${data.impactoGeneral}%`);
  setText("#reportSummary", data.resumen);

  const response = data.resultados.find((item) => item.indicador === "Tiempo de respuesta");
  const errors = data.resultados.find((item) => item.indicador === "Errores de registro");
  const resolution = data.resultados.find((item) => item.indicador === "Resolución en primer contacto");

  if (response) {
    setText("#reportResponseImpact", `${improvementPercent(response)}%`);
  }

  if (errors) {
    setText("#reportErrorsImpact", `${improvementPercent(errors)}%`);
  }

  if (resolution) {
    setText("#reportResolutionImpact", `+${resolution.despues - resolution.antes} pts`);
  }
}

function renderReportTable(items) {
  const tableBody = document.querySelector("#reportTableBody");

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = items.map((item) => `
    <tr>
      <td><span class="ticket-subject">${item.indicador}</span></td>
      <td>${formatReportValue(item, "antes")}</td>
      <td>${formatReportValue(item, "despues")}</td>
      <td><span class="impact-positive">${item.impacto}</span></td>
    </tr>
  `).join("");
}

function createBeforeAfterChart(data) {
  const canvas = document.querySelector("#beforeAfterChart");

  if (!canvas || !window.Chart) {
    return;
  }

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: data.resultados.map((item) => item.indicador),
      datasets: [
        {
          label: "Antes",
          data: data.resultados.map((item) => item.antes),
          backgroundColor: "rgba(239, 68, 68, 0.72)",
          borderRadius: 10
        },
        {
          label: "Después",
          data: data.resultados.map((item) => item.despues),
          backgroundColor: "rgba(37, 99, 235, 0.78)",
          borderRadius: 10
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#eef2f7" }
        },
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: false }
        }
      }
    }
  });
}

function createImprovementChart(data) {
  const canvas = document.querySelector("#improvementChart");

  if (!canvas || !window.Chart) {
    return;
  }

  new Chart(canvas, {
    type: "line",
    data: {
      labels: data.resultados.map((item) => item.indicador),
      datasets: [
        {
          label: "Mejora (%)",
          data: data.resultados.map((item) => improvementPercent(item)),
          borderColor: "#7c3aed",
          backgroundColor: "rgba(124, 58, 237, 0.14)",
          pointBackgroundColor: "#2563eb",
          pointRadius: 5,
          tension: 0.36,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#eef2f7" },
          ticks: {
            callback: (value) => `${value}%`
          }
        },
        x: {
          grid: { display: false },
          ticks: { maxRotation: 0, autoSkip: false }
        }
      }
    }
  });
}

function renderReportCharts(data) {
  chartDefaults();
  createBeforeAfterChart(data);
  createImprovementChart(data);
}

function initInternalTabs(tabSelector, sectionSelector, dataKey) {
  const tabs = document.querySelectorAll(tabSelector);
  const sections = document.querySelectorAll(sectionSelector);

  if (!tabs.length || !sections.length) {
    return;
  }

  function activateTab(value) {
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset[dataKey] === value);
    });

    sections.forEach((section) => {
      section.hidden = section.dataset[dataKey.replace("Tab", "Section")] !== value;
    });

    window.setTimeout(() => window.dispatchEvent(new Event("resize")), 80);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset[dataKey]));
  });

  activateTab(tabs[0].dataset[dataKey]);
}

async function initReportsModule() {
  if (!document.querySelector(".reports-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());

  const data = await loadReports();
  renderReportSummary(data);
  renderReportTable(data.resultados);
  renderReportCharts(data);
  initInternalTabs("[data-report-tab]", "[data-report-section]", "reportTab");
}

initReportsModule();

function renderImprovementCards(items, activeIndex = 0) {
  const grid = document.querySelector("#improvementsGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <article class="improvement-card" style="animation-delay: ${index * 70}ms">
      <span class="detail-kicker">${item.impacto}</span>
      <h2>${item.titulo}</h2>
      <p>${item.descripcion}</p>
      <div class="improvement-impact">
        <span>Impacto esperado</span>
        <strong>${item.indicador}</strong>
      </div>
      <div class="priority-meter">
        <div><span style="width: ${item.prioridad}%"></span></div>
        <small>Prioridad ${item.prioridad}%</small>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".improvement-card").forEach((card, index) => {
    card.hidden = index !== activeIndex;
  });
}

function renderImprovementTable(items) {
  const tableBody = document.querySelector("#improvementsTableBody");

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = items.map((item) => `
    <tr>
      <td><span class="ticket-subject">${item.titulo}</span></td>
      <td>${item.descripcion}</td>
      <td><span class="impact-positive">${item.indicador}</span></td>
      <td>${item.prioridad}%</td>
    </tr>
  `).join("");
}

async function initImprovementsModule() {
  if (!document.querySelector(".improvements-main")) {
    return;
  }

  setText("#currentUser", readSessionUser());

  const data = await loadImprovements();
  setText("#improvementPriority", `${data.prioridadPromedio}%`);
  setText("#improvementSummary", data.resumen);
  renderImprovementCards(data.mejoras, 0);
  renderImprovementTable(data.mejoras);

  document.querySelectorAll("[data-improvement-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-improvement-tab]").forEach((item) => {
        item.classList.toggle("active", item === tab);
      });
      renderImprovementCards(data.mejoras, Number(tab.dataset.improvementTab));
    });
  });
}

initImprovementsModule();
