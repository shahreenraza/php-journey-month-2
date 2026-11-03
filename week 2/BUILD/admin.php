
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'config.php';
requireLogin();

$items = getEnquiries();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Enquiry Dashboard</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body{background:#f4f6f9}
.card{border:0}
.skeleton{height:22px;background:#ddd;border-radius:5px;margin:10px 0;animation:pulse 1s infinite alternate}
@keyframes pulse{to{opacity:.4}}
</style>
</head>
<body>
<div class="container py-4">
<div class="d-flex justify-content-between mb-4">
<h2>Enquiry Dashboard</h2>
<a href="logout.php" class="btn btn-outline-danger">Logout</a>
</div>

<div class="row g-3 mb-4">
<?php foreach (getDashboardStats($items) as $key=>$value): ?>
<div class="col-md-4"><div class="card p-3">
<?= e(ucwords(str_replace('_',' ',$key))) ?>
<h3><?= e((string)$value) ?></h3>
</div></div>
<?php endforeach; ?>
</div>

<input id="search" class="form-control mb-3" placeholder="Search name or email...">
<div id="notice"></div>
<div class="table-responsive">
<table class="table table-bordered bg-white align-middle">
<thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Action</th></tr></thead>
<tbody id="rows">
<tr><td colspan="5"><div class="skeleton"></div><div class="skeleton"></div></td></tr>
</tbody>
</table>
</div>
</div>

<div class="modal fade" id="confirmDelete" tabindex="-1">
<div class="modal-dialog"><div class="modal-content p-3">
<h5>Delete enquiry?</h5>
<p>This action cannot be undone.</p>
<div class="text-end">
<button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
<button class="btn btn-danger" id="confirmBtn">Delete</button>
</div>
</div></div>
</div>

<div id="toast" class="toast-container position-fixed bottom-0 end-0 p-3">
<div class="toast"><div class="toast-body" id="toastText"></div></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
const rows = document.getElementById('rows');
const search = document.getElementById('search');
let timer, deleteId;

function toast(message) {
    document.getElementById('toastText').textContent = message;
    bootstrap.Toast.getOrCreateInstance(document.querySelector('.toast')).show();
}

async function api(action, data = {}) {
    const response = await fetch('ajax-admin.php', {
        method: 'POST',
        body: new URLSearchParams({action, ...data})
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Request failed');
    return result;
}

async function load() {
    rows.innerHTML = '<tr><td colspan="5"><div class="skeleton"></div><div class="skeleton"></div></td></tr>';
    try {
        const items = await api('load', {search: search.value});
        rows.innerHTML = '';
        if (!items.length) {
            rows.innerHTML = '<tr><td colspan="5">No enquiries found.</td></tr>';
            return;
        }
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(item.name)}</td>
                <td>${escapeHtml(item.email)}</td>
                <td>${escapeHtml(item.service)}</td>
                <td><select class="form-select status">
                    ${['New','Contacted','Converted','Closed'].map(s =>
                        `<option ${item.status===s?'selected':''}>${s}</option>`).join('')}
                </select></td>
                <td><button class="btn btn-sm btn-danger delete">Delete</button></td>`;
            const select = tr.querySelector('select');
            select.addEventListener('change', async () => {
                const old = item.status, next = select.value;
                item.status = next;
                try {
                    const r = await api('status', {id:item.id, status:next});
                    if (!r.success) throw new Error();
                    toast('Status updated');
                } catch {
                    item.status = old;
                    select.value = old;
                    toast('Update failed; restored old status');
                }
            });
            tr.querySelector('.delete').onclick = () => {
                deleteId = item.id;
                bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmDelete')).show();
            };
            rows.appendChild(tr);
        });
    } catch {
        rows.innerHTML = '<tr><td colspan="5">Could not load enquiries.</td></tr>';
    }
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c =>
        ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.getElementById('confirmBtn').onclick = async () => {
    try {
        const r = await api('delete', {id:deleteId});
        if (!r.success) throw new Error();
        bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmDelete')).hide();
        toast('Enquiry deleted');
        load();
    } catch {
        toast('Delete failed');
    }
};

search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(load, 350);
});

load();
</script>
</body>
</html>