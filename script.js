/* ==========================================================================
   CodeMaster Pro - محرر الأكواد الاحترافي
   تم التطوير بواسطة: حمزة
   ========================================================================== */

:root {
    --primary-dark: #0f172a;
    --secondary-dark: #1e293b;
    --accent-blue: #3b82f6;
    --accent-green: #10b981;
    --accent-red: #ef4444;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --border-color: #334155;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Cairo', Tahoma, sans-serif;
}

body {
    background-color: var(--primary-dark);
    color: var(--text-primary);
    height: 100vh;
    overflow: hidden;
}

/* Layout */
.app-container {
    display: flex;
    height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 280px;
    background-color: var(--secondary-dark);
    border-left: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}

.sidebar-header {
    padding: 25px;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
}

.sidebar-header h2 {
    color: var(--accent-blue);
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.developer {
    color: var(--accent-green);
    font-size: 0.9rem;
}

.sidebar-nav {
    flex: 1;
    padding: 20px 0;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 25px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    border-right: 3px solid transparent;
    cursor: pointer;
}

.nav-item:hover, .nav-item.active {
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--accent-blue);
    border-right-color: var(--accent-blue);
}

.nav-item i {
    width: 20px;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid var(--border-color);
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Header */
.header {
    height: 70px;
    background-color: var(--secondary-dark);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-icon {
    color: var(--accent-blue);
    font-size: 1.8rem;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(90deg, var(--accent-blue), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header-controls {
    display: flex;
    gap: 15px;
}

/* Toolbar */
.toolbar {
    height: 60px;
    background-color: var(--secondary-dark);
    border-bottom: 1px solid var(--border-color);
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.toolbar-btn {
    padding: 8px 16px;
    background-color: rgba(59, 130, 246, 0.2);
    color: var(--accent-blue);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.toolbar-btn:hover {
    background-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-2px);
}

.toolbar-btn.reset {
    background-color: rgba(239, 68, 68, 0.2);
    color: var(--accent-red);
}

/* Editor Area */
.editor-area {
    flex: 1;
    display: flex;
    overflow: hidden;
}

/* Code Editor */
.code-editor-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    border-left: 1px solid var(--border-color);
}

.editor-header {
    padding: 15px 20px;
    background-color: var(--secondary-dark);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.editor-title {
    display: flex;
    align-items: center;
    gap: 10px;
}

.editor-icon {
    font-size: 1.2rem;
}

.html-icon { color: #e34c26; }

.editor-actions {
    display: flex;
    gap: 10px;
}

.editor-action-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.editor-action-btn:hover {
    color: var(--accent-blue);
    background-color: rgba(59, 130, 246, 0.1);
}

.editor-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
}

.CodeMirror {
    height: 100% !important;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 14px;
    direction: ltr;
}

/* Preview Panel */
.preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background-color: white;
}

.preview-header {
    padding: 15px 20px;
    background-color: var(--secondary-dark);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.preview-title {
    display: flex;
    align-items: center;
    gap: 10px;
}

.preview-icon {
    color: var(--accent-green);
}

.preview-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
}

#preview-frame {
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
}

/* Stats Panel */
.stats-panel {
    background-color: rgba(30, 41, 59, 0.9);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    border-top: 1px solid var(--border-color);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        transform: translateX(100%);
        z-index: 1000;
    }
    
    .sidebar.active {
        transform: translateX(0);
    }
    
    .editor-area {
        flex-direction: column;
    }
    
    .preview-panel {
        height: 40%;
    }
    
    .toolbar-btn span {
        display: none;
    }
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--secondary-dark);
}

::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--accent-blue);
}
