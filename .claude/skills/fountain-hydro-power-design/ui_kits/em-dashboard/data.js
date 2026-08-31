window.EMData = {
  week: 24,
  period: "13 – 19 de junio de 2022",
  kpis: [
    { label: "Disponibilidad", value: "98,4", unit: "%", delta: "+1,2 pp", deltaTone: "up", caption: "vs. semana 23" },
    { label: "Generación", value: "3,42", unit: "GWh", delta: "−3,1 %", deltaTone: "down", caption: "semana" },
    { label: "Órdenes cerradas", value: "7", unit: "", delta: "de 8", deltaTone: "neutral", caption: "plan semanal" },
    { label: "Horas-hombre", value: "512", unit: "h", delta: "+46 h", deltaTone: "neutral", caption: "acumulado" },
  ],
  units: [
    { id: "u1", name: "Unidad 1", status: "operational", mw: "28,4", availability: 99.8, hours: "168,0" },
    { id: "u2", name: "Unidad 2", status: "planned", mw: "22,1", availability: 94.6, hours: "159,0" },
    { id: "capt", name: "Captación", status: "fault", mw: "—", availability: 100, hours: "168,0" },
    { id: "subest", name: "Subestación", status: "operational", mw: "—", availability: 100, hours: "168,0" },
  ],
  orders: [
    { id: "OT-1042", desc: "Inspección de rodete", loc: "Unidad 1", type: "Preventiva", hours: "12,5", status: "operational", statusLabel: "Cerrada", owner: "J. Ríos" },
    { id: "OT-1043", desc: "Cambio de aceite del regulador", loc: "Unidad 2", type: "Preventiva", hours: "8,0", status: "operational", statusLabel: "Cerrada", owner: "M. Guerra" },
    { id: "OT-1044", desc: "Prueba de protecciones diferenciales", loc: "Subestación", type: "Preventiva", hours: "6,0", status: "operational", statusLabel: "Cerrada", owner: "A. Pineda" },
    { id: "OT-1048", desc: "Termografía de tableros de control", loc: "Casa de máquinas", type: "Predictiva", hours: "4,0", status: "planned", statusLabel: "En ejecución", owner: "J. Ríos" },
    { id: "OT-1049", desc: "Limpieza de rejilla de toma", loc: "Captación", type: "Preventiva", hours: "9,5", status: "operational", statusLabel: "Cerrada", owner: "L. Batista" },
    { id: "OT-1051", desc: "Falla de sensor de nivel", loc: "Captación", type: "Correctiva", hours: "3,25", status: "fault", statusLabel: "Abierta", owner: "M. Guerra" },
    { id: "OT-1052", desc: "Ajuste de acoplamiento de bomba", loc: "Unidad 2", type: "Correctiva", hours: "5,0", status: "operational", statusLabel: "Cerrada", owner: "A. Pineda" },
  ],
  daily: [
    { d: "Lun", availability: 100, gen: 0.52 },
    { d: "Mar", availability: 100, gen: 0.55 },
    { d: "Mié", availability: 94, gen: 0.44 },
    { d: "Jue", availability: 92, gen: 0.41 },
    { d: "Vie", availability: 100, gen: 0.53 },
    { d: "Sáb", availability: 100, gen: 0.51 },
    { d: "Dom", availability: 100, gen: 0.46 },
  ],
  notes: [
    { title: "Sensor de nivel en captación", body: "El transmisor de nivel presentó lecturas erráticas el jueves. Se instaló un equipo de respaldo; la sustitución definitiva queda programada para la semana 25.", tone: "danger" },
    { title: "Parada programada Unidad 2", body: "Cambio de aceite del regulador ejecutado el miércoles y jueves, dentro de la ventana prevista de 9 horas.", tone: "warning" },
    { title: "Sin hallazgos de seguridad", body: "No se reportaron incidentes ni condiciones inseguras durante el período.", tone: "success" },
  ],
};
