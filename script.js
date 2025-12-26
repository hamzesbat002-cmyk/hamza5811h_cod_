/**
 * CodeVision - محرر أكواد متقدم
 * الإصدار 1.0
 */

// التكوين العام
let editor;
let currentTheme = 'vs-dark';
let currentLanguage = 'javascript';
let currentFile = 'main.js';
let files = {
    'main.js': `// اكتب كود الجافاسكريبت هنا
console.log("مرحباً بك في CodeVision!");

function greet(name) {
    return \`مرحباً \${name}!\`;
}

// جرب استدعاء الدالة
console.log(greet("المطور"));

// مثال على كود متقدم
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n);
console.log("المربعات:", squares);`,

    'index.html': `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي الأول</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: 'Cairo', Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        h1 {
            color: #ffcc00;
            font-size: 3em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        button {
            background: #007acc;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1em;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Cairo', sans-serif;
        }
        button:hover {
            background: #005a9e;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>مرحباً بالعالم! 🌍</h1>
        <p>هذا موقع HTML بسيط تم إنشاؤه باستخدام CodeVision</p>
        <p>جرب الضغط على الزر أدناه</p>
        <button onclick="showMessage()">انقر هنا</button>
        <div id="message" style="margin-top: 20px;"></div>
    </div>

    <script>
        function showMessage() {
            const messages = [
                "أهلاً وسهلاً!",
                "مرحباً بك في CodeVision",
                "مبروك! لقد نجحت",
                "مبرمج المستقبل هنا",
                "ابدأ رحلتك البرمجية الآن"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            document.getElementById('message').innerHTML = '<h2 style="color: #4ec9b0;">' + randomMessage + '</h2>';
        }
        
        // عرض رسالة ترحيبية
        setTimeout(() => {
            showMessage();
        }, 1000);
    </script>
</body>
</html>`,

    'style.css': `/* أنماط CSS هنا */
body {
    margin: 0;
    padding: 0;
    font-family: 'Cairo', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header h1 {
    color: white;
    font-size: 2.5em;
    margin: 0;
}

.container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
}

.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    margin: 20px 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.button {
    background-color: #007acc;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Cairo', sans-serif;
    font-size: 1.1em;
}

.button:hover {
    background-color: #005a9e;
    transform: translateY(-2px);
}

/* تصميم متجاوب */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .card {
        padding: 20px;
    }
    
    .header h1 {
        font-size: 2em;
    }
}`
};

// تهيئة التطبيق
window.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
    setupEventListeners();
    loadFromLocalStorage();
    updateFileTree();
    updateStatus();
    showNotification('مرحباً بك في CodeVision!', 'info');
});

// تهيئة المحرر
function initializeEditor() {
    // تكوين Monaco Editor
    require.config({ 
        paths: { 
            vs: 'https://unpkg.com/monaco-editor@latest/min/vs' 
        } 
    });
    
    require(['vs/editor/editor.main'], function() {
        editor = monaco.editor.create(document.getElementById('editorContainer'), {
            value: files[currentFile],
            language: currentLanguage,
            theme: currentTheme,
            automaticLayout: true,
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 4,
            folding: true,
            lineHeight: 22,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderWhitespace: 'selection',
            formatOnSave: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on'
        });
        
        // تحديث موضع المؤشر
        editor.onDidChangeCursorPosition((e) => {
            const position = e.position;
            document.getElementById('cursorPosition').textContent = 
                `السطر ${position.lineNumber}، العمود ${position.column}`;
        });
        
        // تحديث المحتوى
        editor.onDidChangeModelContent(() => {
            updateStatus();
            autoSave();
            autoPreview();
        });
        
        // تحديث اللغة
        updateEditorLanguage();
        updatePreview();
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تبديل السمة
    document.getElementById('themeToggle').addEventListener('change', toggleTheme);
    
    // تشغيل الكود
    document.getElementById('runBtn').addEventListener('click', runCode);
    
    // حفظ الملف
    document.getElementById('saveBtn').addEventListener('click', saveFile);
    
    // ملف جديد
    document.getElementById('newFileBtn').addEventListener('click', createNewFile);
    
    // تنسيق الكود
    document.getElementById('formatBtn').addEventListener('click', formatCode);
    
    // تغيير اللغة
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateEditorLanguage();
        updateLanguageBadge();
        updatePreview();
    });
    
    // التبويبات
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // تحديث المعاينة
    document.getElementById('refreshPreview').addEventListener('click', updatePreview);
    
    // مسح وحدة التحكم
    document.getElementById('clearConsole').addEventListener('click', clearConsole);
    
    // نسخ وحدة التحكم
    document.getElementById('copyConsole').addEventListener('click', copyConsole);
    
    // شاشة كاملة
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    
    // إدارة الملفات
    document.getElementById('addFileBtn').addEventListener('click', () => {
        createNewFile();
    });
    
    document.getElementById('addFolderBtn').addEventListener('click', () => {
        showNotification('هذه الميزة قيد التطوير', 'info');
    });
    
    // تراجع وإعادة
    document.getElementById('undoBtn').addEventListener('click', () => editor.trigger('', 'undo'));
    document.getElementById('redoBtn').addEventListener('click', () => editor.trigger('', 'redo'));
    
    // اختصارات لوحة المفاتيح
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // منع Ctrl+S الافتراضي
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveFile();
        }
    });
}

// معالجة اختصارات لوحة المفاتيح
function handleKeyboardShortcuts(e) {
    // Ctrl+S لحفظ
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveFile();
    }
    
    // Ctrl+R لتشغيل
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        runCode();
    }
    
    // Ctrl+F لتنسيق
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        formatCode();
    }
    
    // Ctrl+Z لتراجع
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        editor.trigger('', 'undo');
    }
    
    // Ctrl+Y لإعادة
    if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        editor.trigger('', 'redo');
    }
    
    // F11 لشاشة كاملة
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
}

// تبديل السمة
function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle.checked) {
        currentTheme = 'vs-light';
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.fa-moon').style.opacity = '0.5';
        document.querySelector('.fa-sun').style.opacity = '1';
    } else {
        currentTheme = 'vs-dark';
        document.documentElement.removeAttribute('data-theme');
        document.querySelector('.fa-moon').style.opacity = '1';
        document.querySelector('.fa-sun').style.opacity = '0.5';
    }
    
    monaco.editor.setTheme(currentTheme);
    showNotification('تم تغيير السمة', 'success');
}

// تشغيل الكود
function runCode() {
    const code = editor.getValue();
    const language = document.getElementById('languageSelect').value;
    
    document.getElementById('runBtn').classList.add('running');
    updateStatusIndicator('جاري التشغيل...', 'warning');
    
    switch (language) {
        case 'javascript':
            runJavaScript(code);
            break;
        case 'html':
            runHTML(code);
            break;
        case 'css':
            showNotification('CSS يعمل في المعاينة فقط', 'info');
            updatePreview();
            break;
        case 'python':
            showNotification('Python يحتاج خادم backend', 'warning');
            break;
        case 'php':
            showNotification('PHP يحتاج خادم backend', 'warning');
            break;
        default:
            showNotification('اللغة غير مدعومة', 'error');
    }
    
    setTimeout(() => {
        document.getElementById('runBtn').classList.remove('running');
        updateStatusIndicator('جاهز', 'success');
    }, 1000);
}

// تشغيل JavaScript
function runJavaScript(code) {
    clearConsole();
    logToConsole('🚀 بدء تشغيل JavaScript...', 'info');
    
    try {
        // حفظ الدوال الأصلية
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;
        
        // استبدال console.log
        console.log = function(...args) {
            originalLog.apply(console, args);
            logToConsole(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '), 'log');
        };
        
        console.error = function(...args) {
            originalError.apply(console, args);
            logToConsole(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '), 'error');
        };
        
        console.warn = function(...args) {
            originalWarn.apply(console, args);
            logToConsole(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '), 'warning');
        };
        
        console.info = function(...args) {
            originalInfo.apply(console, args);
            logToConsole(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '), 'info');
        };
        
        // تنفيذ الكود بأمان
        const func = new Function(code);
        const result = func();
        
        if (result !== undefined) {
            logToConsole(`↪ النتيجة: ${JSON.stringify(result, null, 2)}`, 'success');
        }
        
        // استعادة الدوال الأصلية
        setTimeout(() => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            console.info = originalInfo;
        }, 100);
        
        logToConsole('✅ تم التشغيل بنجاح', 'success');
        
    } catch (error) {
        logToConsole(`❌ خطأ: ${error.message}`, 'error');
        logToConsole(`   الموقع: ${error.stack || 'غير معروف'}`, 'error');
    }
}

// تشغيل HTML
function runHTML(code) {
    updatePreview();
    logToConsole('📄 تم تحديث معاينة HTML', 'success');
}

// تسجيل في وحدة التحكم
function logToConsole(message, type = 'log') {
    const consoleOutput = document.getElementById('consoleOutput');
    const timestamp = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = `console-${type}`;
    logEntry.innerHTML = `<span class="timestamp">${timestamp}</span> ${message}`;
    
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// مسح وحدة التحكم
function clearConsole() {
    document.getElementById('consoleOutput').innerHTML = '';
    showNotification('تم مسح وحدة التحكم', 'success');
}

// نسخ وحدة التحكم
function copyConsole() {
    const consoleText = document.getElementById('consoleOutput').innerText;
    navigator.clipboard.writeText(consoleText)
        .then(() => {
            showNotification('تم نسخ وحدة التحكم', 'success');
        })
        .catch(err => {
            showNotification(`فشل النسخ: ${err}`, 'error');
        });
}

// حفظ الملف
function saveFile() {
    files[currentFile] = editor.getValue();
    saveToLocalStorage();
    updateStatusIndicator('تم الحفظ', 'success');
    showNotification('تم حفظ الملف', 'success');
}

// الحفظ التلقائي
function autoSave() {
    files[currentFile] = editor.getValue();
    saveToLocalStorage();
}

// حفظ في localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('codevision_files', JSON.stringify(files));
        localStorage.setItem('codevision_currentFile', currentFile);
        localStorage.setItem('codevision_theme', document.getElementById('themeToggle').checked ? 'light' : 'dark');
    } catch (error) {
        console.error('فشل الحفظ:', error);
    }
}

// تحميل من localStorage
function loadFromLocalStorage() {
    try {
        const savedFiles = localStorage.getItem('codevision_files');
        const savedFile = localStorage.getItem('codevision_currentFile');
        const savedTheme = localStorage.getItem('codevision_theme');
        
        if (savedFiles) {
            files = JSON.parse(savedFiles);
        }
        
        if (savedFile && files[savedFile]) {
            currentFile = savedFile;
        }
        
        if (savedTheme === 'light') {
            document.getElementById('themeToggle').checked = true;
            toggleTheme();
        }
    } catch (error) {
        console.error('فشل التحميل:', error);
    }
}

// إنشاء ملف جديد
function createNewFile() {
    const fileName = prompt('أدخل اسم الملف الجديد (مثال: script.js):', 'newfile.js');
    
    if (!fileName) return;
    
    if (files[fileName]) {
        showNotification('الملف موجود مسبقاً!', 'error');
        return;
    }
    
    // تحديد لغة الملف من الامتداد
    const ext = fileName.split('.').pop().toLowerCase();
    const langMap = {
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'py': 'python',
        'php': 'php',
        'json': 'json',
        'txt': 'text'
    };
    
    files[fileName] = getDefaultContent(ext);
    currentFile = fileName;
    currentLanguage = langMap[ext] || 'javascript';
    
    updateEditorContent();
    updateFileTree();
    updateLanguageSelect();
    showNotification(`تم إنشاء ${fileName}`, 'success');
}

// الحصول على محتوى افتراضي للامتداد
function getDefaultContent(ext) {
    const defaults = {
        'js': '// كود JavaScript جديد\nconsole.log("مرحباً بك في CodeVision!");\n\nfunction sayHello() {\n    return "Hello World!";\n}\n\n// جرب استدعاء الدالة\nconsole.log(sayHello());',
        'html': '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>صفحة جديدة</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            text-align: center;\n            padding: 50px;\n        }\n        h1 {\n            color: #007acc;\n        }\n    </style>\n</head>\n<body>\n    <h1>صفحة HTML جديدة</h1>\n    <p>ابدأ التصميم هنا</p>\n</body>\n</html>',
        'css': '/* أنماط CSS جديدة */\nbody {\n    margin: 0;\n    padding: 0;\n    font-family: Arial, sans-serif;\n}\n\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 20px;\n}',
        'py': '# Python كود جديد\nprint("Hello World!")\n\ndef greet(name):\n    return f"Hello {name}!"\n\n# جرب استدعاء الدالة\nprint(greet("المطور"))',
        'php': '<?php\n// PHP كود جديد\necho "Hello World!\\n";\n\nfunction greet($name) {\n    return "Hello " . $name . "!";\n}\n\n// جرب استدعاء الدالة\necho greet("المطور");\n?>',
        'json': '{\n  "name": "مشروع جديد",\n  "version": "1.0.0",\n  "description": "وصف المشروع"\n}',
        'txt': 'هذا ملف نصي جديد.\nيمكنك الكتابة هنا.'
    };
    
    return defaults[ext] || '// ملف جديد';
}

// تبديل الملف
function switchFile(fileName) {
    if (!files[fileName]) return;
    
    // حفظ الملف الحالي
    files[currentFile] = editor.getValue();
    
    // تحديث الملف النشط
    currentFile = fileName;
    
    // تحديث المحرر
    updateEditorContent();
    
    // تحديث واجهة المستخدم
    updateFileTree();
    updateLanguageSelect();
    updateStatus();
    updatePreview();
}

// تحديث محتوى المحرر
function updateEditorContent() {
    if (editor) {
        editor.setValue(files[currentFile] || '');
        updateEditorLanguage();
    }
}

// تحديث لغة المحرر
function updateEditorLanguage() {
    const ext = currentFile.split('.').pop().toLowerCase();
    const langMap = {
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'py': 'python',
        'php': 'php',
        'json': 'json'
    };
    
    currentLanguage = langMap[ext] || 'javascript';
    
    if (editor) {
        monaco.editor.setModelLanguage(editor.getModel(), currentLanguage);
    }
    
    // تحديث القائمة المنسدلة
    document.getElementById('languageSelect').value = currentLanguage;
    updateLanguageBadge();
}

// تحديث شارة اللغة
function updateLanguageBadge() {
    const badge = document.getElementById('languageBadge');
    const langNames = {
        'javascript': 'JS',
        'html': 'HTML',
        'css': 'CSS',
        'python': 'PY',
        'php': 'PHP',
        'json': 'JSON'
    };
    
    badge.textContent = langNames[currentLanguage] || 'TXT';
}

// تحديث شجرة الملفات
function updateFileTree() {
    const fileTree = document.getElementById('fileTree');
    fileTree.innerHTML = '';
    
    Object.keys(files).forEach(fileName => {
        const fileItem = document.createElement('div');
        fileItem.className = `file-item ${fileName === currentFile ? 'active' : ''}`;
        fileItem.setAttribute('data-file', fileName);
        
        const ext = fileName.split('.').pop().toLowerCase();
        const icon = getFileIcon(ext);
        
        fileItem.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${fileName}</span>
        `;
        
        fileItem.addEventListener('click', () => switchFile(fileName));
        fileTree.appendChild(fileItem);
    });
}

// الحصول على أيقونة الملف
function getFileIcon(ext) {
    const icons = {
        'js': 'fa-file-code',
        'html': 'fa-html5',
        'css': 'fa-css3-alt',
        'py': 'fa-python',
        'php': 'fa-php',
        'json': 'fa-file-code',
        'txt': 'fa-file-alt',
        'md': 'fa-file-alt'
    };
    
    return icons[ext] || 'fa-file';
}

// تحديث اختيار اللغة
function updateLanguageSelect() {
    document.getElementById('languageSelect').value = currentLanguage;
}

// تبديل التبويب
function switchTab(tabName) {
    // إزالة النشط من جميع التبويبات
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // تفعيل التبويب المختار
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // إذا كان تبويب المعاينة، قم بتحديثه
    if (tabName === 'preview' && currentLanguage === 'html') {
        updatePreview();
    }
}

// تحديث المعاينة التلقائية
function autoPreview() {
    const currentTab = document.querySelector('.tab.active').getAttribute('data-tab');
    if (currentTab === 'preview' && currentLanguage === 'html') {
        setTimeout(updatePreview, 500);
    }
}

// تحديث المعاينة
function updatePreview() {
    if (currentLanguage === 'html') {
        const htmlCode = editor.getValue();
        const previewFrame = document.getElementById('previewFrame');
        
        // إنشاء صفحة كاملة مع CSS إذا كان موجوداً
        let fullHTML = htmlCode;
        
        // إضافة CSS إذا كان موجوداً في الملفات
        if (files['style.css']) {
            const styleIndex = fullHTML.indexOf('</head>');
            if (styleIndex !== -1) {
                fullHTML = fullHTML.substring(0, styleIndex) + 
                          `<style>${files['style.css']}</style>` + 
                          fullHTML.substring(styleIndex);
            }
        }
        
        previewFrame.srcdoc = fullHTML;
    }
}

// تنسيق الكود
function formatCode() {
    const code = editor.getValue();
    let formattedCode = code;
    
    try {
        switch (currentLanguage) {
            case 'javascript':
                if (typeof js_beautify !== 'undefined') {
                    formattedCode = js_beautify(code, {
                        indent_size: 4,
                        indent_char: ' ',
                        max_preserve_newlines: 2,
                        preserve_newlines: true,
                        keep_array_indentation: false,
                        break_chained_methods: false,
                        indent_scripts: 'normal',
                        brace_style: 'collapse',
                        space_before_conditional: true,
                        unescape_strings: false,
                        jslint_happy: false,
                        end_with_newline: true,
                        wrap_line_length: 0,
                        indent_inner_html: false,
                        comma_first: false,
                        e4x: false,
                        indent_empty_lines: false
                    });
                }
                break;
            case 'html':
                if (typeof html_beautify !== 'undefined') {
                    formattedCode = html_beautify(code, {
                        indent_size: 4,
                        indent_char: ' ',
                        max_preserve_newlines: 2,
                        preserve_newlines: true,
                        keep_array_indentation: false,
                        break_chained_methods: false,
                        indent_scripts: 'normal',
                        brace_style: 'collapse',
                        space_before_conditional: true,
                        unescape_strings: false,
                        jslint_happy: false,
                        end_with_newline: true,
                        wrap_line_length: 0,
                        indent_inner_html: false,
                        comma_first: false,
                        e4x: false,
                        indent_empty_lines: false
                    });
                }
                break;
            case 'css':
                if (typeof css_beautify !== 'undefined') {
                    formattedCode = css_beautify(code, {
                        indent_size: 4,
                        indent_char: ' ',
                        selector_separator_newline: true,
                        end_with_newline: true,
                        newline_between_rules: true
                    });
                }
                break;
        }
        
        if (formattedCode !== code) {
            editor.setValue(formattedCode);
            showNotification('تم تنسيق الكود', 'success');
        }
    } catch (error) {
        showNotification('فشل تنسيق الكود', 'error');
        console.error('Format error:', error);
    }
}

// تبديل وضع الشاشة الكاملة
function toggleFullscreen() {
    const elem = document.querySelector('.container');
    const icon = document.getElementById('fullscreenBtn').querySelector('i');
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        icon.className = 'fas fa-compress';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        icon.className = 'fas fa-expand';
    }
}

// تحديث شريط الحالة
function updateStatus() {
    if (!editor) return;
    
    const content = editor.getValue();
    const lines = content.split('\n').length;
    const chars = content.length;
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    
    document.getElementById('lineCount').textContent = `${lines} سطر`;
    document.getElementById('fileSize').textContent = `${chars} حرف`;
    document.getElementById('fileName').textContent = currentFile;
}

// تحديث مؤشر الحالة
function updateStatusIndicator(message, type = 'info') {
    const indicator = document.getElementById('statusIndicator');
    const icon = indicator.querySelector('i');
    const text = indicator.querySelector('.status-text');
    
    if (text) {
        text.textContent = message;
    }
    
    // تحديث اللون حسب النوع
    const colors = {
        'success': '#4ec9b0',
        'warning': '#ffcc00',
        'error': '#f44747',
        'info': '#cccccc'
    };
    
    icon.style.color = colors[type] || '#cccccc';
}

// عرض إشعار
function showNotification(message, type = 'info') {
    // إزالة الإشعارات القديمة
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(notification => notification.remove());
    
    // إنشاء إشعار جديد
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// معالجة وضع الشاشة الكاملة
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const icon = document.getElementById('fullscreenBtn').querySelector('i');
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        icon.className = 'fas fa-expand';
    }
}

// تهيئة عند التحميل
window.addEventListener('load', () => {
    // تحديث المعاينة إذا كان ملف HTML
    if (currentLanguage === 'html') {
        updatePreview();
    }
});