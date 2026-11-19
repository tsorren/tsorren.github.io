// Contenido del sitio. Cada hecho sale de `maestro/resume.en.md` y `maestro/cv.es.md` (repo `career`) y
// declara su sección en `fuente`. Lo de tipo `relato` no es un hecho de CV: lo aprobó el autor el
// 2026-11-19 como texto provisorio (R1, columna 3).
// Los 5 proyectos de 2025 solo tienen año en el maestro: su orden acá es narrativo, no cronológico.

export type Idioma = 'es' | 'en';
export type Texto = Record<Idioma, string>;
export type Pos = { x: number; y: number };

export type Paso = {
  id: string;
  rotulo: Texto;
  frase: Texto;
  tipo: 'hecho' | 'relato';
  fuente?: string;
};

export type Capitulo = {
  id: string;
  fecha: Texto;
  nombre: Texto; // relato
  lugar?: string;
  pos: { escritorio: Pos; movil: Pos };
  pasos: Paso[];
  mas: Texto[];
  enlaces: { nombre: Texto; url: string }[]; // repos del maestro y certificados
  stack: string[];
  fuente: string;
};

export type Relato = {
  nombre: string;
  titular: Texto;
  hoy: { fecha: Texto; frase: Texto; cifras: { valor: Texto; rotulo: Texto; fuente: string }[] };
  capitulos: Capitulo[];
  aporte: { nombre: Texto; items: Texto[]; fuente: string }[];
  cierre: { titulo: Texto; lineas: Texto[]; meta: Texto };
  contacto: { email: string; github: string; linkedin: string };
  ficha: { texto: Texto; url?: string; fuente: string }[];
  goatcounter: string; // código del sitio en GoatCounter; vacío = sin analytics
};

const t = (es: string, en: string): Texto => ({ es, en });
const gh = (repo: string) => `https://github.com/tsorren/${repo}`;
const igual = (...xs: string[]) => xs.map((x) => t(x, x));

export const relato = {
  nombre: 'Tadeo Sorrentino',
  titular: t('Backend & Agent Engineering', 'Backend & AI/Agent Engineering'),

  hoy: {
    fecha: t('ago 2026 – hoy · WirData', 'Aug 2026 – today · WirData'),
    frase: t(
      'Construyo backends que no se caen y agentes de IA que trabajan con método.',
      'I build backends that stay up and AI agents that work with method.',
    ),
    cifras: [
      { valor: t('−75 %', '−75%'), rotulo: t('ciclo de CI/CD, de ~21 a 3–5 min', 'CI/CD cycle, from ~21 to 3–5 min'), fuente: 'WORK EXPERIENCE > WirData 2' },
      { valor: t('nov 2026', 'Nov 2026'), rotulo: t('CRM en Odoo en producción', 'Odoo CRM in production'), fuente: 'WORK EXPERIENCE > WirData 4' },
      { valor: t('>65 %', '>65%'), rotulo: t('menos tokens con gobernanza de agentes', 'fewer tokens with agent governance'), fuente: 'WORK EXPERIENCE > WirData 6' },
    ],
  },

  capitulos: [
    {
      id: 'empezar',
      fecha: t('2016', '2016'),
      nombre: t('Empezar', 'Getting started'),
      pos: { escritorio: { x: 10, y: 74 }, movil: { x: 22, y: 84 } },
      pasos: [
        { id: 'empezar-1', rotulo: t('Desde 2016', 'Since 2016'), frase: t('Programo desde 2016.', 'I have been programming since 2016.'), tipo: 'hecho', fuente: 'PROFESSIONAL SUMMARY' },
      ],
      mas: [],
      enlaces: [],
      stack: [],
      fuente: 'PROFESSIONAL SUMMARY',
    },
    {
      id: 'salvar',
      fecha: t('nov 2021 – abr 2023', 'Nov 2021 – Apr 2023'),
      nombre: t('Salvar lo que no se puede perder', "Saving what can't be lost"),
      lugar: 'Bosque',
      pos: { escritorio: { x: 28, y: 54 }, movil: { x: 72, y: 70 } },
      pasos: [
        { id: 'salvar-1', rotulo: t('El aviso', 'The warning'), frase: t('Consultor IT en Bosque: llega un aviso de que se van a borrar los datos de Google Drive de la empresa.', "IT Consultant at Bosque: a warning arrives that the company's Google Drive data will be deleted."), tipo: 'hecho', fuente: 'WORK EXPERIENCE > Bosque 1' },
        { id: 'salvar-2', rotulo: t('El plan', 'The plan'), frase: t('Lidero el plan de recuperación ante desastres.', 'I lead the disaster recovery plan.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > Bosque 1' },
        { id: 'salvar-3', rotulo: t('En inglés', 'In English'), frase: t('Coordino el respaldo con el soporte técnico de Google, en reuniones en vivo, en inglés.', 'I coordinate the backup with Google technical support in live meetings held in English.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > Bosque 1' },
        { id: 'salvar-4', rotulo: t('+700 GB', '700+ GB'), frase: t('Migro +700 GB a infraestructura propia, sin pérdida de datos y sin cortar la operación.', 'I migrate 700+ GB to dedicated on-premises infrastructure, with no data loss and no disruption to operations.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > Bosque 1' },
      ],
      mas: [
        t('Diseñé la topología de red local y los accesos remotos seguros al sistema contable (BTB Soft): de una conexión directa, un usuario por vez, a uso multiusuario en paralelo.', 'Designed the local network topology and secure remote access to the accounting system (BTB Soft): from direct access, one user at a time, to concurrent multi-user access.'),
        t('Escribí los procedimientos de infraestructura de IT y de mitigación de incidentes, una solución estandarizada para los problemas de la red local.', 'Wrote IT infrastructure and incident-mitigation procedures, a standardized solution for local network issues.'),
      ],
      enlaces: [],
      stack: [],
      fuente: 'WORK EXPERIENCE > Bosque',
    },
    {
      id: 'construir',
      fecha: t('2023 – 2025', '2023 – 2025'),
      nombre: t('Aprender a construir', 'Learning to build'),
      lugar: 'UTN FRBA',
      pos: { escritorio: { x: 48, y: 64 }, movil: { x: 30, y: 55 } },
      pasos: [
        { id: 'construir-1', rotulo: t('Ingeniería', 'Engineering'), frase: t('Empiezo Ingeniería en Sistemas de Información en la UTN FRBA.', 'I start Information Systems Engineering at UTN FRBA.'), tipo: 'hecho', fuente: 'EDUCATION' },
        { id: 'construir-2', rotulo: t('8,94', '8.94'), frase: t('Promedio 8,94/10.', 'CGPA 8.94/10.'), tipo: 'hecho', fuente: 'EDUCATION' },
        { id: 'construir-3', rotulo: t('SO en Go', 'OS in Go'), frase: t('2025: un simulador distribuido de un sistema operativo UNIX, en Go.', '2025: a distributed UNIX operating system simulator, in Go.'), tipo: 'hecho', fuente: 'PROJECTS > Distributed OS Simulation' },
        { id: 'construir-4', rotulo: t('Metamapa', 'Metamapa'), frase: t('2025: Metamapa, 5 microservicios; lidero la planificación y las decisiones de diseño.', "2025: Metamapa, 5 microservices; I lead the team's planning and design decisions."), tipo: 'hecho', fuente: 'PROJECTS > Metamapa' },
        { id: 'construir-5', rotulo: t('522.000 filas', '522,000 rows'), frase: t('2025: ~522.000 filas migradas a un modelo de 21 tablas en SQL Server.', '2025: ~522,000 rows migrated into a 21-table model on SQL Server.'), tipo: 'hecho', fuente: 'PROJECTS > Sofa Factory' },
      ],
      mas: [
        t('UTN FRBA, enero 2023 – actualidad, egreso estimado 2028.', 'UTN FRBA, January 2023 – present, expected 2028.'),
        t('Inglés C2 (EF SET 74/100). Español nativo.', 'English C2 (EF SET 74/100). Spanish: native.'),
        t('SO distribuido: planificación FIFO, SJF y SRT, paginación y memoria jerárquica con SWAP, multithreading y comunicación concurrente por HTTP.', 'Distributed OS: FIFO, SJF and SRT scheduling, paging and hierarchical memory with SWAP, multithreading and concurrent HTTP communication.'),
        t('Metamapa: RBAC con Spring Security, una máquina de estados para auditar hechos geolocalizados y reintentos para integrar fuentes externas.', 'Metamapa: RBAC with Spring Security, a state machine to audit geolocated reports and retry policies to integrate external sources.'),
        t('Fábrica de Sillones: esquema estrella con 8 dimensiones y 5 tablas de hechos, 10 vistas de KPIs y ETL en T-SQL.', 'Sofa Factory: star schema with 8 dimensions and 5 fact tables, 10 KPI views and ETL in T-SQL.'),
        t('Técnicas Avanzadas de Programación: Design by Contract en Ruby con metaprogramación y un motor de torneos inmutable en Scala.', 'Advanced Programming Techniques: Design by Contract in Ruby with metaprogramming and an immutable tournament engine in Scala.'),
        t('Tienda Sol: e-commerce MERN con validación de peticiones, CORS y secretos por variables de entorno; pruebas con Jest y Cypress.', 'Tienda Sol: MERN e-commerce with request validation, CORS and secrets via environment variables; tested with Jest and Cypress.'),
      ],
      enlaces: [
        { nombre: t('Simulación de Sistema Operativo Distribuido', 'Distributed OS Simulation'), url: gh('OS-Simulation-TP-SSOO') },
        { nombre: t('Metamapa', 'Metamapa'), url: gh('Metamapa-TP-DDSI') },
        { nombre: t('Fábrica de Sillones', 'Sofa Factory'), url: gh('Fabrica-de-Sillones-TP-BBDD') },
        { nombre: t('Técnicas Avanzadas de Programación', 'Advanced Programming Techniques'), url: gh('Paradigmas-Avanzados-TP-TADP') },
        { nombre: t('Tienda Sol', 'Tienda Sol'), url: gh('Tienda-Sol-TP-DDSO') },
        { nombre: t('EF SET 74/100 (C2)', 'EF SET 74/100 (C2)'), url: 'https://cert.efset.org/en/Fj7hMp' },
      ],
      stack: ['Golang', 'Java', 'Spring Boot', 'Spring Security', 'SQL Server', 'T-SQL', 'Ruby', 'Scala', 'React', 'Node.js', 'MongoDB'],
      fuente: 'EDUCATION, LANGUAGES, PROJECTS (2025)',
    },
    {
      id: 'fallar-bien',
      fecha: t('2026', '2026'),
      nombre: t('Sistemas que fallan bien', 'Systems that fail well'),
      lugar: 'DonaTrack',
      pos: { escritorio: { x: 67, y: 44 }, movil: { x: 70, y: 40 } },
      pasos: [
        { id: 'fallar-bien-1', rotulo: t('Equipo de 9', 'Team of 9'), frase: t('DonaTrack: en un equipo de 9, 5 microservicios en Java 21 y Spring Boot 4.', 'DonaTrack: in a team of 9, 5 microservices in Java 21 and Spring Boot 4.'), tipo: 'hecho', fuente: 'PROJECTS > DonaTrack' },
        { id: 'fallar-bien-2', rotulo: t('Eventos', 'Events'), frase: t('Se comunican por eventos con RabbitMQ: patrón outbox, reintentos e idempotencia.', 'They talk through events over RabbitMQ: outbox pattern, retries and idempotency.'), tipo: 'hecho', fuente: 'PROJECTS > DonaTrack' },
        { id: 'fallar-bien-3', rotulo: t('Contratos', 'Contracts'), frase: t('Soy responsable de los contratos entre servicios: abro y reviso los pull requests.', 'I own the inter-service contracts: I open and review the pull requests.'), tipo: 'hecho', fuente: 'PROJECTS > DonaTrack' },
        { id: 'fallar-bien-4', rotulo: t('Una sola vez', 'Exactly once'), frase: t('Si un servicio se cae, el mensaje espera y llega una sola vez.', 'If a service goes down, the message waits and arrives exactly once.'), tipo: 'relato' },
      ],
      mas: [
        t('Clean Architecture con reglas de capas verificadas con ArchUnit.', 'Clean Architecture with layer rules enforced by ArchUnit.'),
        t('Persistencia en PostgreSQL con Flyway y en MongoDB; OAuth2/JWT con Keycloak; API gateway con Spring Cloud Gateway y rate limiting con Redis.', 'Persistence in PostgreSQL with Flyway and MongoDB; OAuth2/JWT with Keycloak; API gateway on Spring Cloud Gateway with Redis-backed rate limiting.'),
        t('Pruebas unitarias, de integración (Testcontainers), de contrato (OpenAPI), de humo y de mutación (Pitest).', 'Unit, integration (Testcontainers), contract (OpenAPI), smoke and mutation (Pitest) tests.'),
        t('CI/CD en GitHub Actions con análisis estático en SonarQube; n8n por webhook para difundir insignias y el ranking mensual.', 'CI/CD in GitHub Actions with SonarQube static analysis; n8n via webhooks to broadcast badges and the monthly ranking.'),
      ],
      enlaces: [{ nombre: t('DonaTrack', 'DonaTrack'), url: gh('DonaTrack-TP-DDS') }],
      stack: ['Java 21', 'Spring Boot 4', 'Spring Cloud Gateway', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Keycloak', 'Redis', 'Testcontainers', 'ArchUnit', 'Pitest', 'GitHub Actions', 'n8n'],
      fuente: 'PROJECTS > DonaTrack',
    },
    {
      id: 'produccion',
      fecha: t('ago 2026 – hoy', 'Aug 2026 – today'),
      nombre: t('Llevar a producción, con agentes', 'Shipping to production, with agents'),
      lugar: 'WirData',
      pos: { escritorio: { x: 85, y: 30 }, movil: { x: 34, y: 24 } },
      pasos: [
        { id: 'produccion-1', rotulo: t('Multi-tenant', 'Multi-tenant'), frase: t('Software Engineer en WirData: participo en separar la autenticación en Keycloak de la autorización multi-tenant (RBAC/ABAC).', 'Software Engineer at WirData: I help decouple Keycloak authentication from multi-tenant authorization (RBAC/ABAC).'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > WirData 1' },
        { id: 'produccion-2', rotulo: t('−75 %', '−75%'), frase: t('CI/CD en GitHub Actions con Testcontainers: el ciclo de despliegue baja de ~21 min a 3–5 min.', 'CI/CD in GitHub Actions with Testcontainers: the deployment cycle drops from ~21 min to 3–5 min.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > WirData 2' },
        { id: 'produccion-3', rotulo: t('60 decisiones', '60 decisions'), frase: t('Relevo el flujo comercial de un cliente externo: más de 60 decisiones trazables.', "I gather an external client's sales workflow: 60+ traceable decisions."), tipo: 'hecho', fuente: 'WORK EXPERIENCE > WirData 3' },
        { id: 'produccion-4', rotulo: t('En producción', 'In production'), frase: t('Un CRM a medida en Odoo 19, en producción desde noviembre de 2026, dirigiendo agentes de IA con specs y auditoría de PR.', 'A custom Odoo 19 CRM, in production since November 2026, directing AI agents through specs and PR audits.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > WirData 4' },
        { id: 'produccion-5', rotulo: t('>65 %', '>65%'), frase: t('Gobernanza de agentes de IA: más de un 65 % menos de tokens.', 'AI agent governance: over 65% fewer tokens.'), tipo: 'hecho', fuente: 'WORK EXPERIENCE > WirData 6' },
      ],
      mas: [
        t('Participé en la reestructuración bajo DDD del microservicio de virtualización sobre XCP-ng, dentro del panel de servicios IaaS y SaaS (TypeScript, Kubernetes, Galera).', 'Contributed to restructuring the XCP-ng virtualization microservice around DDD, part of the IaaS and SaaS platform (TypeScript, Kubernetes, Galera).'),
        t('Estrategia de asignación transaccional de recursos con RabbitMQ (consistencia eventual).', 'Transactional resource allocation strategy using RabbitMQ (eventual consistency).'),
        t('El flujo comercial, especificado en Odoo CRM con dos tableros Kanban y revisado con una auditoría UX por rol (36 hallazgos).', 'The sales workflow, specified in Odoo CRM as two Kanban boards and reviewed through a role-based UX audit (36 findings).'),
        t('El módulo de Odoo: único mantenedor, CI en GitHub Actions, pruebas unitarias y E2E con Playwright, 98 % de cobertura; desplegado con Docker y Portainer, con un importador de 12 meses de datos; capacité a los equipos de Ventas y Leads.', 'The Odoo module: sole maintainer, CI in GitHub Actions, unit and E2E tests with Playwright, 98% coverage; deployed with Docker and Portainer with an importer for 12 months of data; trained the Sales and Leads teams.'),
        t('Plataforma de IA híbrida: LiteLLM, PostgreSQL y Hermes Agent, con modelos locales en vLLM sobre GPU NVIDIA T4; definí 8 de sus 21 decisiones técnicas.', 'Hybrid AI platform: LiteLLM, PostgreSQL and Hermes Agent, with local models on vLLM over NVIDIA T4 GPUs; defined 8 of its 21 technical decisions.'),
        t('Trazabilidad distribuida propagando Trace IDs por HTTP para auditoría centralizada.', 'Distributed tracing by propagating HTTP Trace IDs for centralized auditing.'),
        t('Operación NOC con Zabbix, NetBox, pfSense y Xen Orchestra; incidentes en gateways satelitales con respuesta en 15–30 min y un incidente crítico de PSU resuelto en menos de medio día.', 'NOC operations with Zabbix, NetBox, pfSense and Xen Orchestra; satellite gateway incidents with 15–30 min response time and a critical PSU incident resolved in under half a day.'),
        t('El método con agentes: spec → plan → tareas; un auditor de contexto limpio y sin escritura antes de cada PR; merge humano; router de contexto, gates por rama y PR, workflows, skills y hooks deterministas.', 'The method with agents: spec → plan → tasks; a clean-context, read-only auditor before every PR; human merge; context router, branch and PR gates, deterministic workflows, skills and hooks.'),
      ],
      enlaces: [],
      stack: ['TypeScript', 'Kubernetes', 'Galera', 'RabbitMQ', 'Keycloak', 'GitHub Actions', 'Testcontainers', 'Odoo 19', 'Python', 'Playwright', 'Docker', 'LiteLLM', 'vLLM'],
      fuente: 'WORK EXPERIENCE > WirData; método aprobado por el autor (R1, columna 3)',
    },
  ],

  aporte: [
    { nombre: t('Backend', 'Backend'), items: igual('Java', 'Spring Boot', 'TypeScript', 'DDD'), fuente: 'TECHNICAL SKILLS' },
    { nombre: t('Sistemas distribuidos', 'Distributed systems'), items: [...igual('RabbitMQ', 'Kubernetes'), t('Microservicios', 'Microservices')], fuente: 'TECHNICAL SKILLS' },
    { nombre: t('Agentes de IA', 'AI agents'), items: igual('Spec-Driven Development', 'Context Engineering', 'MCP'), fuente: 'TECHNICAL SKILLS' },
    { nombre: t('Calidad y entrega', 'Quality and delivery'), items: igual('Testcontainers', 'Playwright', 'GitHub Actions'), fuente: 'TECHNICAL SKILLS' },
  ],

  cierre: {
    titulo: t('Lo que puedo aportar', 'What I can bring'),
    lineas: [
      t('Sistemas que no se caen.', 'Systems that stay up.'),
      t('Decisiones con trade-offs, escritas y trazables.', 'Decisions with trade-offs, written down and traceable.'),
      t('Agentes de IA que trabajan con método.', 'AI agents that work with method.'),
    ],
    meta: t(
      'Lo que sigue: sistemas más grandes, decisiones más difíciles y aprender siempre.',
      "What's next: bigger systems, harder decisions, and always learning.",
    ),
  },

  contacto: {
    email: 'tadeosorrentino@gmail.com',
    github: 'https://github.com/tsorren',
    linkedin: 'https://linkedin.com/in/tadeo-sorrentino',
  },

  ficha: [
    { texto: t('Ingeniería en Sistemas de Información, UTN FRBA (2023 – egreso estimado 2028), promedio 8,94/10', 'B.S. in Information Systems Engineering, UTN FRBA (2023 – expected 2028), CGPA 8.94/10'), fuente: 'EDUCATION' },
    { texto: t('Inglés C2 (EF SET 74/100) · Español nativo', 'English C2 (EF SET 74/100) · Spanish: native'), url: 'https://cert.efset.org/en/Fj7hMp', fuente: 'EDUCATION, LANGUAGES' },
    { texto: t('Profesor de música voluntario en Manos Abiertas, desde abril de 2026', 'Volunteer music teacher at Manos Abiertas, since April 2026'), fuente: 'VOLUNTEERING' },
  ],

  goatcounter: '',
} satisfies Relato;

// Textos de interfaz.
export const ui = {
  lang: t('es-AR', 'en'),
  titulo: t('Tadeo Sorrentino · Backend & Agent Engineering', 'Tadeo Sorrentino · Backend & AI/Agent Engineering'),
  descripcion: t(
    'Software Engineer en WirData y estudiante de Ingeniería en Sistemas (UTN FRBA). Backend, sistemas distribuidos y agentes de IA, contado de 2016 a hoy.',
    'Software Engineer at WirData and Information Systems Engineering student (UTN FRBA). Backend, distributed systems and AI agents, told from 2016 to today.',
  ),
  otroIdioma: t('EN', 'ES'),
  otroIdiomaNombre: t('Read in English', 'Leer en español'),
  saltar: t('Saltar al contenido', 'Skip to content'),
  contacto: t('Contacto', 'Contact'),
  sonido: t('Sonido', 'Sound'),
  sonidoEstado: { off: t('apagado', 'off'), sistema: t('sistema', 'system'), ambiente: t('ambiente', 'ambient') },
  cinta: t('Capítulos', 'Chapters'),
  comoLlegue: t('¿Cómo llegué acá?', 'How did I get here?'),
  ayudaAvance: t('Scroll o deslizá para avanzar', 'Scroll or swipe to move on'),
  mas: t('Más', 'More'),
  repos: t('Enlaces', 'Links'),
  stack: t('Stack', 'Stack'),
  cielo: t('El cielo completo', 'The whole sky'),
  cieloAyuda: t('Elegí un capítulo para volver a él.', 'Pick a chapter to go back to it.'),
  meEscribis: t('Escribime', 'Write to me'),
  ficha: t('En pocas líneas', 'In a few lines'),
  hoy: t('Hoy', 'Today'),
};
