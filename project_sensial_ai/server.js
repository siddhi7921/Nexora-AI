const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const PORT = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, 'public');
const storePath = path.join(__dirname, 'data.json');
const initialData = {
  projects: [
    { id: 'p1', name: 'Nova Commerce', owner: 'Siddhinath', dueDate: '2026-09-18', progress: 62, budget: '$48,000', status: 'At risk' },
    { id: 'p2', name: 'Atlas Mobile', owner: 'Ravi Kumar', dueDate: '2026-10-06', progress: 78, budget: '$31,500', status: 'On track' },
    { id: 'p3', name: 'Core Platform', owner: 'Ava Wilson', dueDate: '2026-09-09', progress: 41, budget: '$64,000', status: 'At risk' }
  ],
  tasks: [
    { id: 't1', projectId: 'p1', title: 'Authentication API', assignee: 'Rahul S.', dueDate: '2026-08-29', status: 'Blocked', priority: 'High', dependency: 'Security review' },
    { id: 't2', projectId: 'p1', title: 'Checkout integration', assignee: 'Priya N.', dueDate: '2026-09-02', status: 'In progress', priority: 'High', dependency: 'Authentication API' },
    { id: 't3', projectId: 'p1', title: 'Analytics events', assignee: 'Leo M.', dueDate: '2026-09-06', status: 'Todo', priority: 'Medium', dependency: '' },
    { id: 't4', projectId: 'p2', title: 'Offline sync', assignee: 'Rahul S.', dueDate: '2026-09-13', status: 'In progress', priority: 'Medium', dependency: '' },
    { id: 't5', projectId: 'p3', title: 'Database migration', assignee: 'Ava W.', dueDate: '2026-08-26', status: 'Blocked', priority: 'High', dependency: 'Schema approval' },
    { id: 't6', projectId: 'p3', title: 'Load test', assignee: 'Leo M.', dueDate: '2026-09-01', status: 'Todo', priority: 'High', dependency: 'Database migration' }
  ]
};
function load() { try { return JSON.parse(fs.readFileSync(storePath, 'utf8')); } catch { return structuredClone(initialData); } }
let db = load();
function save() { fs.writeFileSync(storePath, JSON.stringify(db, null, 2)); }
function risk(project) {
  const tasks = db.tasks.filter(t => t.projectId === project.id);
  const today = new Date('2026-08-28T00:00:00Z');
  const overdue = tasks.filter(t => new Date(t.dueDate + 'T00:00:00Z') < today && t.status !== 'Done').length;
  const blocked = tasks.filter(t => t.status === 'Blocked').length;
  const nearDeadline = (new Date(project.dueDate + 'T00:00:00Z') - today) / 86400000 < 14 ? 12 : 0;
  return Math.min(98, 18 + blocked * 19 + overdue * 16 + (100 - project.progress) * .35 + nearDeadline);
}
function metrics() {
  const total = db.tasks.length;
  const done = db.tasks.filter(t => t.status === 'Done').length;
  const blocked = db.tasks.filter(t => t.status === 'Blocked').length;
  const overdue = db.tasks.filter(t => new Date(t.dueDate) < new Date('2026-08-28') && t.status !== 'Done').length;
  return { projects: db.projects.length, totalTasks: total, completedTasks: done, blockedTasks: blocked, overdueTasks: overdue, completion: total ? Math.round(done / total * 100) : 0 };
}
function assistant(question) {
  const q = String(question || '').toLowerCase();
  const blocked = db.tasks.filter(t => t.status === 'Blocked');
  const workload = Object.entries(db.tasks.reduce((a,t) => { if (t.status !== 'Done') a[t.assignee] = (a[t.assignee] || 0) + 1; return a; }, {})).sort((a,b) => b[1]-a[1]);
  const riskiest = [...db.projects].sort((a,b) => risk(b)-risk(a))[0];
  if (q.includes('workload') || q.includes('developer') || q.includes('overload')) return `${workload[0]?.[0] || 'No one'} has the highest active workload with ${workload[0]?.[1] || 0} tasks. Consider moving one lower-priority item before assigning more work.`;
  if (q.includes('priority') || q.includes('prioritize') || q.includes('next')) return `Prioritize ${blocked.map(t => t.title).join(' and ') || 'the highest-risk work'} first. Clearing these blockers unlocks dependent tasks and reduces delivery risk fastest.`;
  if (q.includes('summary') || q.includes('today') || q.includes('progress')) return `Today: ${metrics().totalTasks} tracked tasks, ${blocked.length} blocked, and ${metrics().overdueTasks} overdue. ${riskiest.name} needs attention: its current risk score is ${Math.round(risk(riskiest))}%.`;
  return `${riskiest.name} is the highest-risk project at ${Math.round(risk(riskiest))}%. The main drivers are ${blocked.length} blocked task(s), ${metrics().overdueTasks} overdue task(s), and its ${riskiest.progress}% completion level. Start by resolving ${blocked[0]?.title || 'the next critical dependency'}.`;
}
function json(res, status, value) { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8'}); res.end(JSON.stringify(value)); }
function body(req) { return new Promise((resolve, reject) => { let raw=''; req.on('data', c => raw += c); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Invalid JSON')); } }); }); }
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml' };
http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname === '/api/health') return json(res, 200, { status: 'ok' });
    if (url.pathname === '/api/dashboard') return json(res, 200, { metrics: metrics(), projects: db.projects.map(p => ({ ...p, risk: Math.round(risk(p)) })), tasks: db.tasks });
    if (url.pathname === '/api/projects' && req.method === 'GET') return json(res, 200, db.projects.map(p => ({ ...p, risk: Math.round(risk(p)) })));
    if (url.pathname === '/api/projects' && req.method === 'POST') { const p = await body(req); if (!p.name || !p.dueDate) return json(res, 400, { error: 'name and dueDate are required' }); const project = { id: crypto.randomUUID(), name:p.name, owner:p.owner || 'Unassigned', dueDate:p.dueDate, progress:0, budget:p.budget || '—', status:'On track' }; db.projects.push(project); save(); return json(res, 201, project); }
    if (url.pathname === '/api/tasks' && req.method === 'POST') { const t = await body(req); if (!t.title || !t.projectId || !t.dueDate) return json(res, 400, { error: 'title, projectId and dueDate are required' }); const task = { id:crypto.randomUUID(), title:t.title, projectId:t.projectId, assignee:t.assignee || 'Unassigned', dueDate:t.dueDate, status:t.status || 'Todo', priority:t.priority || 'Medium', dependency:t.dependency || '' }; db.tasks.push(task); save(); return json(res, 201, task); }
    if (url.pathname.startsWith('/api/tasks/') && req.method === 'PATCH') { const task = db.tasks.find(t => t.id === url.pathname.split('/').pop()); if (!task) return json(res,404,{error:'Task not found'}); Object.assign(task, await body(req)); save(); return json(res,200,task); }
    if (url.pathname === '/api/assistant' && req.method === 'POST') { const { question } = await body(req); return json(res, 200, { answer: assistant(question) }); }
    const safePath = path.normalize(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^([.][.][/\\])+/, '');
    const file = path.join(publicDir, safePath);
    if (!file.startsWith(publicDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return json(res, 404, { error:'Not found' });
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'}); fs.createReadStream(file).pipe(res);
  } catch (error) { json(res, 500, { error: error.message || 'Internal server error' }); }
}).listen(PORT, () => console.log(`Nexora AI running at http://localhost:${PORT}`));
