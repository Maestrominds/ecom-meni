<script lang="ts">
  import { Send, Image as ImageIcon, Bold, Italic, Underline, Link } from 'lucide-svelte';
  
  let subject = $state('');
  let campaignName = $state('');
  let htmlContent = $state('<p>Start typing your email campaign here...</p>');
  let editorRef: HTMLDivElement;
  let isSending = $state(false);

  // ExecCommand helper for formatting
  function format(command: string, value?: string) {
    document.execCommand(command, false, value);
    if (editorRef) {
      editorRef.focus();
      updateHtml();
    }
  }

  function addImage() {
    const url = prompt('Enter the public URL of the image (e.g. from AWS S3):');
    if (url) format('insertImage', url);
  }

  function addLink() {
    const url = prompt('Enter link URL:');
    if (url) format('createLink', url);
  }

  function addVariable() {
    const varName = prompt('Enter variable name (e.g. user_name):');
    if (varName) {
      format('insertText', `{{${varName}}}`);
    }
  }

  function updateHtml() {
    if (editorRef) {
      htmlContent = editorRef.innerHTML;
    }
  }

  async function handleDispatch(e: Event) {
    e.preventDefault();
    if (!campaignName || !subject || !htmlContent) {
      alert("Please fill out all fields.");
      return;
    }

    isSending = true;

    // Construct the final HTML with the footer (Dumb Pipe Architecture)
    const finalHtml = `
      <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
        ${htmlContent}
        <br><br>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
        <div style="text-align: center; font-size: 12px; color: #888;">
          <p>Meni Skin & Hair Wellness</p>
          <p><a href="https://meni.com/unsubscribe?user={{user_id}}" style="color: #888; text-decoration: underline;">Unsubscribe from these emails</a></p>
        </div>
      </div>
    `;

    try {
      const res = await fetch('/api/admin/marketing/email-campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_name: campaignName,
          subject: subject,
          html_body: finalHtml
        })
      });

      if (res.ok) {
        alert('Campaign successfully dispatched to Brevo/SES!');
        campaignName = '';
        subject = '';
        htmlContent = '';
        if(editorRef) editorRef.innerHTML = '';
      } else {
        alert('Failed to dispatch campaign.');
      }
    } catch(err) {
      console.error(err);
      alert('Network error while sending campaign.');
    } finally {
      isSending = false;
    }
  }
</script>

<svelte:head>
  <title>Admin | Email Studio</title>
</svelte:head>

<div class="dashboard-header">
  <div>
    <h1>Email Campaign Studio</h1>
    <p>Design and dispatch rich marketing emails directly to your audience.</p>
  </div>
</div>

<div class="studio-grid">
  <div class="card editor-card">
    <div class="card-header">
      <h2>Campaign Details</h2>
    </div>
    
    <div class="card-body">
      <form onsubmit={handleDispatch}>
        <div class="form-group">
          <label for="campaignName">Internal Campaign Name</label>
          <input type="text" id="campaignName" bind:value={campaignName} placeholder="e.g. Diwali Mega Sale 2026" required />
        </div>
        
        <div class="form-group">
          <label for="subject">Email Subject Line</label>
          <input type="text" id="subject" bind:value={subject} placeholder="Don't miss our biggest sale of the year!" required />
        </div>

        <div class="form-group">
          <label>Email Body (Rich Text)</label>
          
          <div class="editor-toolbar">
            <button type="button" class="toolbar-btn" onclick={() => format('bold')} title="Bold"><Bold size={16} /></button>
            <button type="button" class="toolbar-btn" onclick={() => format('italic')} title="Italic"><Italic size={16} /></button>
            <button type="button" class="toolbar-btn" onclick={() => format('underline')} title="Underline"><Underline size={16} /></button>
            <div class="divider"></div>
            <button type="button" class="toolbar-btn" onclick={addLink} title="Add Link"><Link size={16} /></button>
            <button type="button" class="toolbar-btn" onclick={addImage} title="Add Image URL"><ImageIcon size={16} /></button>
            <div class="divider"></div>
            <button type="button" class="toolbar-btn text-btn" onclick={addVariable}>+ Add Variable</button>
          </div>

          <div 
            class="rich-editor" 
            bind:this={editorRef} 
            contenteditable="true" 
            oninput={updateHtml}
            role="textbox"
            tabindex="0"
          >
            {@html htmlContent}
          </div>
          <p class="help-text">An unsubscribe link and standard footer will be automatically appended to your email.</p>
        </div>

        <button type="submit" class="btn btn-primary" disabled={isSending}>
          <Send size={18} />
          {isSending ? 'Dispatching...' : 'Dispatch Campaign'}
        </button>
      </form>
    </div>
  </div>

  <div class="card preview-card">
    <div class="card-header">
      <h2>Live Preview</h2>
    </div>
    <div class="card-body">
      <div class="email-preview">
        <div class="preview-header">
          <strong>Subject:</strong> {subject || '(No subject)'}
        </div>
        <div class="preview-body">
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            {@html htmlContent}
            <br><br>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
            <div style="text-align: center; font-size: 12px; color: #888;">
              <p>Meni Skin & Hair Wellness</p>
              <p><a href="#" style="color: #888; text-decoration: underline;">Unsubscribe from these emails</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard-header {
    margin-bottom: 32px;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 8px;
  }

  .dashboard-header p {
    color: var(--text-muted);
  }

  .studio-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 24px;
  }

  .card {
    background: white;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    overflow: hidden;
  }

  .card-header {
    padding: 24px;
    border-bottom: 1px solid var(--border-light);
    background: #FAFAFA;
  }

  .card-header h2 {
    font-size: 1.25rem;
  }

  .card-body {
    padding: 32px 24px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  input[type="text"] {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    font-size: 1rem;
  }

  /* Editor Styles */
  .editor-toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    background: #FAFAFA;
    border: 1px solid var(--border-light);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }

  .toolbar-btn {
    background: transparent;
    border: none;
    padding: 6px;
    border-radius: 4px;
    color: #4B5563;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar-btn:hover {
    background: #E5E7EB;
    color: #111827;
  }

  .text-btn {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 6px 12px;
  }

  .divider {
    width: 1px;
    height: 20px;
    background: #D1D5DB;
    margin: 0 8px;
  }

  .rich-editor {
    width: 100%;
    min-height: 250px;
    padding: 16px;
    border: 1px solid var(--border-light);
    border-radius: 0 0 8px 8px;
    font-size: 1rem;
    line-height: 1.6;
    outline: none;
    background: white;
    overflow-y: auto;
  }

  .rich-editor:focus {
    border-color: var(--primary);
  }

  .help-text {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 8px;
  }

  /* Buttons */
  .btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }
  
  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Preview */
  .email-preview {
    border: 1px solid var(--border-light);
    border-radius: 8px;
    background: #f9fafb;
  }

  .preview-header {
    padding: 16px;
    border-bottom: 1px solid var(--border-light);
    background: white;
    border-radius: 8px 8px 0 0;
    font-size: 0.95rem;
  }

  .preview-body {
    padding: 32px 16px;
    background: white;
    min-height: 400px;
  }

  @media (max-width: 1100px) {
    .studio-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
