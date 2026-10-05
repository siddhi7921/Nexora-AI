# ⚡ Nexora AI

<div align="center">

### 🧠 Intelligent Project Analytics & Risk Detection Platform

**Transform project data into actionable insights.**

Nexora AI is a self-contained project intelligence platform that combines project management, task tracking, automated risk analysis, team workload monitoring, and a data-aware assistant in one unified workspace.

**See the Risk. Understand the Project. Decide What Matters.**

</div>

---

## 🚀 Overview

Nexora AI helps teams understand project health and identify potential delivery risks before they become critical.

The platform analyzes project and task data to answer important questions:

- ⚠️ Which projects are currently at risk?
- 📅 Which deadlines may be missed?
- 🚧 What blockers are affecting progress?
- 🎯 What should be prioritized next?
- 👥 How is work distributed across the team?
- 📊 Which tasks require immediate attention?

---

## 🌐 Run Locally

Start the application:

```bash
cd project_sensial_ai
npm start
```

Then open:

```text
http://localhost:3000
```

> No third-party packages or API keys are required.

## Deploy on Netlify

The root `netlify.toml` publishes `project_sensial_ai/public`, which contains the
homepage, stylesheet, and browser script. No build command is required for these
static files. Keep this configuration when deploying so the site serves the
dashboard instead of a page-not-found error.

This deploy serves the frontend only. The Node.js server is not deployed by this
configuration; the dashboard uses its existing browser-local fallback when the
API is unavailable. Shared backend storage is not included in this deployment.

---

## 📸 Dashboard Preview

/<img width="1205" height="635" alt="image" src="https://github.com/user-attachments/assets/cfc98b8e-c22e-4a27-809c-b096be0d092e" />


The dashboard provides a clear overview of:

- 📊 Project health and completion
- ⚠️ Automated risk scores
- 👥 Team workload
- 🎯 Priority tasks
- 📅 Deadline signals
- 🚧 Active blockers
- 🤖 AI-powered project insights

---

# ✨ Key Features

## 📊 Intelligent Project Dashboard

Monitor the health of your projects from a centralized workspace.

Track:

- Active projects
- Project completion
- Risk levels
- Overdue tasks
- Active blockers
- Team workload
- Priority signals
- Delivery health

---

## 📁 Project Management

Create and manage multiple projects with important delivery information.

Each project can track:

- Project name
- Description
- Progress
- Deadline
- Tasks
- Priority
- Blockers
- Risk indicators

Project data is persisted locally using `data.json`, which is automatically created when changes are made.

---

## ✅ Task Management

Manage tasks throughout their workflow.

Features include:

- Create new tasks
- Track task status
- Mark tasks as completed
- Identify overdue tasks
- Detect blocked work
- Assign priorities
- Monitor project progress

---

## ⚠️ Intelligent Risk Scoring

Nexora AI evaluates multiple project signals to generate a dynamic risk score.

The risk engine considers:

```text
📅 Deadline Proximity
        +
⏰ Overdue Tasks
        +
🚧 Active Blockers
        +
📉 Project Progress
        +
🎯 Priority Signals
        │
        ▼
⚠️ PROJECT RISK SCORE
```

This helps identify projects that may require immediate attention.

---

## 🎯 Priority Intelligence

Nexora AI automatically highlights work that should be addressed first.

Priority signals include:

- 🔴 Overdue tasks
- 🟠 Blocked work
- 🟡 High-priority tasks
- 📅 Approaching deadlines

Helping teams answer:

> **What should we work on next?**

---

## 👥 Team Workload Analysis

Monitor task distribution across contributors.

The workload system helps identify:

- Contributors with high workloads
- Uneven task distribution
- Available team capacity
- Potential delivery bottlenecks

---

## 🤖 Data-Aware Project Assistant

The built-in project assistant analyzes available project and task data to provide contextual insights.

Example questions:

```text
Which project has the highest risk?
```

```text
What should we prioritize today?
```

```text
Why is this project delayed?
```

```text
Which team member has the highest workload?
```

```text
Show all overdue tasks.
```

The assistant can analyze:

- Project progress
- Task status
- Team workload
- Blockers
- Delays
- Priorities
- Risk signals

---

# 📡 REST API

Nexora AI provides a lightweight JSON REST API.

### Dashboard

```http
GET /api/dashboard
```

Returns aggregated dashboard data, project statistics, workload information, and risk signals.

### Projects

```http
GET /api/projects
```

```http
POST /api/projects
```

### Tasks

```http
GET /api/tasks
```

```http
POST /api/tasks
```

### Project Assistant

```http
POST /api/assistant
```

Provides contextual responses based on current project and task data.

---

# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js |
| API | REST API |
| Data Storage | JSON Persistence |
| Risk Analysis | Rule-Based Scoring Engine |
| Assistant | Data-Aware Analysis |
| Dependencies | No Third-Party Packages Required |

---

# 📂 Project Structure

```text
nexora-ai/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── server/
│   ├── server.js
│   ├── routes/
│   └── services/
│
├── screenshots/
│   └── analytics-dashboard.png
│
├── data.json
├── package.json
├── README.md
└── LICENSE
```

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      USER / TEAM     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     NEXORA AI UI     │
                         │ Responsive Dashboard │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       REST API       │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
      ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
      │ Project Engine│     │  Task Engine  │     │  Risk Engine  │
      └───────────────┘     └───────────────┘     └───────────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Project Assistant  │
                         │  Data-Aware Analysis │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      data.json       │
                         │   Local Persistence  │
                         └──────────────────────┘
```

---

# 🧠 What This Project Demonstrates

Nexora AI demonstrates practical software engineering concepts beyond a basic CRUD application.

- ✓ Responsive Frontend Development
- ✓ Backend Development
- ✓ REST API Design
- ✓ Data Persistence
- ✓ Business Logic
- ✓ Project Risk Analysis
- ✓ Team Workload Analysis
- ✓ Decision Support Systems
- ✓ Data-Aware Assistant Architecture
- ✓ Scalable System Design

---

# 🔮 Future Roadmap

### Production Infrastructure

- [ ] PostgreSQL database
- [ ] User authentication
- [ ] Role-based access control
- [ ] Cloud deployment

### Advanced AI

- [ ] LLM-powered project assistant
- [ ] Document intelligence
- [ ] RAG-based knowledge retrieval
- [ ] Natural language analytics

### Predictive Intelligence

- [ ] Machine learning risk prediction
- [ ] Deadline forecasting
- [ ] Workload optimization
- [ ] Automated recommendations

### Real-Time Collaboration

- [ ] WebSocket updates
- [ ] Team notifications
- [ ] Activity timeline
- [ ] Collaborative workspaces

---

# 📄 License

This project is available under the **MIT License**.

---

<div align="center">

## ⭐ Nexora AI

### **See the Risk. Understand the Project. Decide What Matters.**

If you find this project useful or interesting, consider giving the repository a ⭐.

**Built with curiosity, engineering, and a vision for intelligent project management.**

</div>
