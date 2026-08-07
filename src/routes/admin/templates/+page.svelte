<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { LayoutTemplate, Send, Sparkles, Edit, Trash2 } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  
  let templates = $derived(data.templates || []);

  let templateName = $state('Order Confirmation');
  let triggerEvent = $state('order_placed');
  let editingId = $state<string | null>(null);
  
  let editorContainer: HTMLElement;
  let quill: any;
  let rawHtml = $state('<p>Thank you for your order! Your order #{{order_id}} has been confirmed.</p>');
  let saving = $state(false);

  onMount(async () => {
    if (browser) {
      const Quill = (await import('quill')).default;
      quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        },
        placeholder: 'Design your transactional template here. Use {{tags}} for dynamic content...'
      });
      
      quill.root.innerHTML = rawHtml;
      
      quill.on('text-change', () => {
        rawHtml = quill.root.innerHTML;
      });
    }
  });

  function generateEmailHTML(innerHtml: string) {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
  .email-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .content { padding: 32px; color: #374151; line-height: 1.6; }
  .footer { background-color: #F05139; color: #ffffff; padding: 24px; text-align: center; font-size: 12px; }
  .footer a { color: #ffffff; text-decoration: underline; font-weight: 600; }
</style>
</head>
<body>
  <div class="email-container">
    <div class="content">
      ${innerHtml}
    </div>
    <div class="footer">
      <p>Meni Inc. • 123 Fashion Ave, New York, NY 10001</p>
      <p>This is a transactional email. <a href="https://meni.com/support">Contact Support</a></p>
    </div>
  </div>
</body>
</html>`;
  }

  async function saveTemplate() {
    if (!templateName || !triggerEvent || !rawHtml || rawHtml === '<p><br></p>') {
      alert("Please fill in all template details and body.");
      return;
    }
    
    saving = true;
    
    // Only wrap the HTML if it's not already wrapped. 
    // Since we are loading existing rawHtml for editing, it might already contain the skeleton.
    let finalHtml = rawHtml;
    if (!rawHtml.includes('<div class="email-container">')) {
      finalHtml = generateEmailHTML(rawHtml);
    }
    
    const url = editingId ? `/api/admin/templates/${editingId}` : '/api/admin/templates';
    const method = editingId ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)admin_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
        },
        body: JSON.stringify({
          name: templateName,
          trigger_event: triggerEvent,
          channel: "email",
          template_body: finalHtml
        })
      });
      
      if (res.ok) {
        alert(`Template ${editingId ? 'updated' : 'saved'} successfully!`);
        
        if (!editingId) {
          const newTemplate = await res.json();
          templates = [newTemplate, ...templates];
        } else {
          const updatedTemplate = await res.json();
          templates = templates.map(t => t.ID === editingId ? updatedTemplate : t);
        }
        
        // Reset
        cancelEdit();
      } else {
        alert(`Failed to save template. The backend might not support ${method} yet.`);
      }
    } catch (e) {
      alert("Error saving template");
    } finally {
      saving = false;
    }
  }

  function editTemplate(t: any) {
    editingId = t.ID;
    templateName = t.Name;
    triggerEvent = t.TriggerEvent;
    rawHtml = t.TemplateBody || '';
    if (quill) {
      quill.root.innerHTML = rawHtml;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    editingId = null;
    templateName = '';
    triggerEvent = '';
    rawHtml = '';
    if (quill) {
      quill.root.innerHTML = '';
    }
  }

  async function deleteTemplate(id: string) {
    if (!confirm("Are you sure you want to delete this template?")) return;
    
    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)admin_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
        }
      });
      
      if (res.ok) {
        templates = templates.filter(t => t.ID !== id);
        alert("Template deleted successfully.");
      } else {
        alert("Failed to delete template. The backend might not support DELETE yet.");
      }
    } catch (e) {
      alert("Error deleting template.");
    }
  }
</script>

<svelte:head>
  <title>Admin | Templates</title>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class="marketing-container">
  <!-- Header -->
  <div class="page-header">
    <h1>Transactional Templates</h1>
  </div>

  <div class="premium-container">
    <div class="header-section">
      <div>
        <h2 class="title"><Sparkles size={24} class="icon-sparkle" /> Template Builder</h2>
        <p class="subtitle">Design beautiful transactional emails (OTPs, Receipts, Confirmations).</p>
      </div>
      <div class="header-actions">
        {#if editingId}
          <button class="btn-glass" onclick={cancelEdit}>Cancel</button>
        {/if}
        <button class="btn-primary" onclick={saveTemplate} disabled={saving}>
          {#if saving} Saving... {:else} <Send size={16} /> {editingId ? 'Update Template' : 'Save Template'} {/if}
        </button>
      </div>
    </div>

    <!-- Studio Layout -->
    <div class="studio-layout">
      <!-- Left: Settings -->
      <div class="studio-settings">
        <div class="glass-card">
          <h3><LayoutTemplate size={20} /> Template Settings</h3>
          
          <div class="form-group">
            <label>Template Name</label>
            <input type="text" bind:value={templateName} class="premium-input" placeholder="e.g. Order Confirmation" />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Trigger Event</label>
              <input type="text" bind:value={triggerEvent} class="premium-input" placeholder="e.g. order_placed" />
            </div>
          </div>

          <div class="form-group mb-0">
            <label>Template Body (Rich Text)</label>
            <div class="quill-wrapper">
              <div bind:this={editorContainer} class="premium-quill"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Live Preview -->
      <div class="studio-preview">
        <div class="preview-device">
          <div class="device-header">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">mail.google.com</div>
          </div>
          <div class="device-body">
            <div class="email-envelope">
              <div class="env-header">
                <div class="env-avatar">M</div>
                <div>
                  <div class="env-sender">MENI <span class="env-email">&lt;no-reply@meni.com&gt;</span></div>
                  <div class="env-subject">{templateName || 'New Template'}</div>
                </div>
              </div>
              
              <div class="env-content">
                <div class="email-p">{@html rawHtml}</div>
              </div>
              
              <div class="env-footer">
                <p>Meni Inc. • 123 Fashion Ave, New York, NY 10001</p>
                <p>This is a transactional email. <a href="#">Contact Support</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Templates Table -->
    <div class="glass-card mt-6" style="margin-bottom: 24px;">
      <div class="table-header mb-4">
        <h3><LayoutTemplate size={20} /> Existing Templates</h3>
      </div>
      
      <div class="table-responsive">
        <table class="premium-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Trigger Event</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#if templates.length === 0}
              <tr>
                <td colspan="3" class="text-center">No templates created yet.</td>
              </tr>
            {/if}
            {#each templates as t}
              <tr>
                <td class="font-bold">{t.Name}</td>
                <td><span class="badge bg-blue-soft text-blue">{t.TriggerEvent}</span></td>
                <td class="text-right">
                  <div class="action-buttons">
                    <button class="action-btn text-blue" onclick={() => editTemplate(t)} aria-label="Edit"><Edit size={16} /></button>
                    <button class="action-btn text-red" onclick={() => deleteTemplate(t.ID)} aria-label="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>

<style>
  .marketing-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-body);
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
  }

  /* Base & Premium Aesthetic */
  .premium-container {
    font-family: 'Inter', system-ui, sans-serif;
    color: #1f2937;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .title {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .icon-sparkle { color: #3b82f6; }
  .subtitle { margin: 0; color: #6b7280; font-size: 15px; }

  .header-actions { display: flex; gap: 16px; }
  
  .btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white; border: none; padding: 12px 24px; border-radius: 12px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    transition: all 0.2s ease;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); }

  /* Studio Layout */
  .studio-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
  }
  .glass-card h3 {
    margin: 0 0 24px 0; font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #111827;
  }

  .mt-6 { margin-top: 24px; }

  /* Premium Forms */
  .form-group { margin-bottom: 24px; }
  .form-group label { display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .premium-input {
    width: 100%; padding: 14px 16px;
    background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;
    font-size: 15px; color: #111827; outline: none; transition: all 0.2s;
  }
  .premium-input:focus {
    background: white; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .mb-0 { margin-bottom: 0; }
  
  /* Quill Overrides */
  .quill-wrapper { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
  :global(.ql-toolbar) { border: none !important; border-bottom: 1px solid #e5e7eb !important; background: white; padding: 12px !important; }
  :global(.ql-container) { border: none !important; font-family: 'Inter', system-ui, sans-serif !important; font-size: 15px !important; color: #111827; }
  :global(.ql-editor) { min-height: 200px; padding: 16px; }
  :global(.ql-editor:focus) { box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.1); }

  /* Live Preview */
  .studio-preview { display: flex; justify-content: center; }
  .preview-device {
    width: 100%; max-width: 500px;
    background: white; border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid #e5e7eb;
    overflow: hidden;
    display: flex; flex-direction: column;
  }
  .device-header {
    background: #f9fafb; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;
    display: flex; align-items: center; gap: 16px;
  }
  .browser-dots { display: flex; gap: 6px; }
  .browser-dots span { width: 10px; height: 10px; border-radius: 50%; background: #e5e7eb; }
  .browser-dots span:nth-child(1) { background: #ff5f56; }
  .browser-dots span:nth-child(2) { background: #ffbd2e; }
  .browser-dots span:nth-child(3) { background: #27c93f; }
  .browser-url { flex: 1; background: white; border-radius: 6px; padding: 4px 12px; font-size: 12px; color: #9ca3af; text-align: center; border: 1px solid #f3f4f6; }
  
  .device-body { background: white; flex: 1; padding: 0; }
  .env-header { padding: 16px 24px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 16px; }
  .env-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
  .env-sender { font-weight: 700; font-size: 14px; color: #111827; }
  .env-email { color: #6b7280; font-weight: 400; font-size: 12px; }
  .env-subject { font-size: 18px; font-weight: 700; color: #111827; margin-top: 4px; }
  
  .env-content { padding: 24px; }
  
  .email-p { font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0; }
  
  .env-footer { background-color: #F05139; color: #ffffff; padding: 24px; text-align: center; font-size: 12px; }
  .env-footer a { color: #ffffff; text-decoration: underline; font-weight: 600; }
  .env-footer p { margin: 0 0 8px 0; }
  .env-footer p:last-child { margin: 0; }
  
  /* Table Styles */
  .mb-4 { margin-bottom: 16px; }
  .table-responsive { overflow-x: auto; }
  .premium-table { width: 100%; border-collapse: collapse; text-align: left; }
  .premium-table th { padding: 16px; font-size: 12px; font-weight: 700; color: #6b7280; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; }
  .premium-table td { padding: 16px; font-size: 14px; color: #374151; border-bottom: 1px solid #f3f4f6; }
  .premium-table tr:hover td { background: #f9fafb; }
  .font-bold { font-weight: 700; }
  .badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-block; }
  .bg-blue-soft { background: #eff6ff; } .text-blue { color: #3b82f6; }
  .bg-purple-soft { background: #f5f3ff; } .text-purple { color: #8b5cf6; }
  .text-red { color: #ef4444; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  
  .action-buttons { display: flex; gap: 8px; justify-content: flex-end; }
  .action-btn { background: transparent; border: none; padding: 6px; cursor: pointer; border-radius: 6px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .action-btn:hover { background: #f3f4f6; }
  .action-btn.text-blue:hover { background: #eff6ff; }
  .action-btn.text-red:hover { background: #fef2f2; }
</style>
