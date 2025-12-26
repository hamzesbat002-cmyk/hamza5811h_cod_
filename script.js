
// التكوين العام
let editor;
let currentTheme = 'vs-dark';
let currentLanguage = 'javascript';
let currentFile = 'main.js';
let files = {
    'main.js': '// اكتب كود الجافاسكريبت هنا\nconsole.log("مرحباً بك في CodeVision!");\n\nfunction greet(name) {\n    return `مرحباً ${name}!`;\n}\n\n// جرب استدعاء الدالة\nconsole.log(greet("المطور"));',
    'index.html': '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>موقعي</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            text-align: center;\n            padding: 50px;\n            background: #f0f0f0;\n        }\n        h1 {\n            color: #007acc;\n        }\n    </style>\n</head>\n<body>\n    <h1>مرحباً بالعالم! 🌍</h1>\n    <p>هذا موقع HTML بسيط</p>\n    <button onclick="alert(\'أهلاً!\')">انقر هنا</button>\n</body>\n</html>',
    'style.css': '/* أنماط CSS هنا */\nbody {\n    margin: 0;\n    padding: 0;\n    font-family: Arial, sans-serif;\n}\n\n.header {\n    background: linear-gradient(135deg, #007acc, #005a9e);\n    color: white;\n    padding: 20px;\n    text-align: center;\n}\n\n.button {\n    background-color: #007acc;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    transition: background 0.3s;\n}\n\n.button:hover {\n    background-color: #005a9e;\n}'
};

// تهيئة Monaco Editor
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.43.0/min/vs' } });

require(['vs/editor/editor.main'], function() {
    initializeEditor();
    setupEventListeners();
    updateFileTree();
    updateStatus();
});

// تهيئة المحرر
function initializeEditor() {
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
        suggestOnTriggerCharacters: true,
        tabSize: 4,
        folding: true,
        lineHeight: 22,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on'
    });
    
    // تحديث موضع المؤشر
    editor.onDidChangeCursorPosition((e) => {
        const position = e.position;
        document.getElementById('cursorPosition').textContent = 
            `السطر ${position.lineNumber}، العمود ${position.column}`;
    });
    
    // تحديث عدد الأسطر
    editor.onDidChangeModelContent(() => {
        updateStatus();
        autoPreview();
    });
    
    // تحديث لغة المحرر عند تغيير الملف
    updateEditorLanguage();
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
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const fileName = item.getAttribute('data-file');
            switchFile(fileName);
        });
    });
    
    // إضافة ملف جديد من التبويب
    document.getElementById('addFileBtn').addEventListener('click', () => {
        const fileName = prompt('أدخل اسم الملف (مع الامتداد):', 'newfile.js');
        if (fileName && !files[fileName]) {
            files[fileName] = '// ملف جديد\n';
            updateFileTree();
            switchFile(fileName);
        }
    });
    
    // تراجع وإعادة
    document.getElementById('undoBtn').addEventListener('click', () => editor.trigger('', 'undo'));
    document.getElementById('redoBtn').addEventListener('click', () => editor.trigger('', 'redo'));
    
    // اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
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
    });
}

// تبديل السمة
function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle.checked) {
        currentTheme = 'vs';
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        currentTheme = 'vs-dark';
        document.documentElement.removeAttribute('data-theme');
    }
    
    monaco.editor.setTheme(currentTheme);
    updateStatusIndicator('تم تغيير السمة');
}

// تشغيل الكود
function runCode() {
    const code = editor.getValue();
    const language = document.getElementById('languageSelect').value;
    
    document.getElementById('runBtn').classList.add('running');
    updateStatusIndicator('جاري التشغيل...', 'warning');
    
    // اعتماداً على اللغة
    switch (language) {
        case 'javascript':
            runJavaScript(code);
            break;
        case 'html':
            runHTML(code);
            break;
        case 'python':
            // للبايثون تحتاج خادم backend
            logToConsole('تحتاج خادم backend لتشغيل Python', 'error');
            break;
        default:
            logToConsole(`تشغيل ${language} غير مدعوم محلياً`, 'info');
    }
    
    setTimeout(() => {
        document.getElementById('runBtn').classList.remove('running');
        updateStatusIndicator('تم التشغيل', 'success');
    }, 1000);
}

// تشغيل JavaScript
function runJavaScript(code) {
    clearConsole();
    logToConsole('🚀 بدء تشغيل JavaScript...', 'info');
    
    try {
        // استبدال console.log للتقاط المخرجات
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            logToConsole(args.join(' '), 'log');
        };
        
        console.error = function(...args) {
            originalError.apply(console, args);
            logToConsole(args.join(' '), 'error');
        };
        
        // تنفيذ الكود
        const result = eval(code);
        
        if (result !== undefined) {
            logToConsole(`↪ النتيجة: ${result}`, 'success');
        }
        
        // إعادة console.log الأصلي
        setTimeout(() => {
            console.log = originalLog;
            console.error = originalError;
        }, 100);
        
    } catch (error) {
        logToConsole(`❌ خطأ: ${error.message}`, 'error');
    }
}

// تشغيل HTML
function runHTML(code) {
    updatePreview();
    logToConsole('📄 تم تحديث معاينة HTML', 'success');
}

// تحديث المعاينة التلقائية
function autoPreview() {
    const currentTab = document.querySelector('.tab.active').getAttribute('data-tab');
    if (currentTab === 'preview' && currentLanguage === 'html') {
        updatePreview();
    }
}

// تحديث المعاينة
function updatePreview() {
    if (currentLanguage === 'html') {
        const htmlCode = editor.getValue();
        const previewFrame = document.getElementById('previewFrame');
        previewFrame.srcdoc = htmlCode;
    }
}

// تسجيل في وحدة التحكم
function logToConsole(message, type = 'log') {
    const consoleOutput = document.getElementById('consoleOutput');
    const timestamp = new Date().toLocaleTimeString();
    const typeIcon = {
        'log': '📄',
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    }[type];
    
    const logEntry = document.createElement('div');
    logEntry.className = `console-${type}`;
    logEntry.innerHTML = `<span class="timestamp">${timestamp}</span> ${typeIcon} ${message}`;
    
    consoleOutput.appendChild(logEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// مسح وحدة التحكم
function clearConsole() {
    document.getElementById('consoleOutput').innerHTML = '';
}

// نسخ وحدة التحكم
function copyConsole() {
    const consoleText = document.getElementById('consoleOutput').innerText;
    navigator.clipboard.writeText(consoleText)
        .then(() => {
            updateStatusIndicator('تم نسخ وحدة التحكم', 'success');
        })
        .catch(err => {
            logToConsole(`❌ فشل النسخ: ${err}`, 'error');
        });
}

// حفظ الملف
function saveFile() {
    files[currentFile] = editor.getValue();
    updateStatusIndicator('تم الحفظ', 'success');
    
    // حفظ في localStorage (محاكاة)
    localStorage.setItem(`codevision_${currentFile}`, editor.getValue());
}

// إنشاء ملف جديد
function createNewFile() {
    const fileName = prompt('أدخل اسم الملف الجديد (مع الامتداد):', 'newfile.js');
    if (fileName) {
        if (files[fileName]) {
            alert('الملف موجود مسبقاً!');
            return;
        }
        
        // تحديد لغة الملف من الامتداد
        const ext = fileName.split('.').pop();
        const langMap = {
            'js': 'javascript',
            'html': 'html',
            'css': 'css',
            'py': 'python',
            'java': 'java',
            'cs': 'csharp',
            'cpp': 'cpp',
            'php': 'php',
            'ts': 'typescript'
        };
        
        files[fileName] = getDefaultContent(ext);
        currentFile = fileName;
        currentLanguage = langMap[ext] || 'javascript';
        
        updateEditorContent();
        updateFileTree();
        updateLanguageSelect();
        updateStatusIndicator(`تم إنشاء ${fileName}`, 'success');
    }
}

// الحصول على محتوى افتراضي للامتداد
function getDefaultContent(ext) {
    const defaults = {
        'js': '// كود JavaScript جديد\nconsole.log("مرحباً!");',
        'html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>صفحة جديدة</title>\n</head>\n<body>\n    <h1>صفحة HTML جديدة</h1>\n</body>\n</html>',
        'css': '/* أنماط CSS جديدة */\nbody {\n    margin: 0;\n    padding: 0;\n}',
        'py': '# Python كود جديد\nprint("Hello World!")',
        'java': '// Java كود جديد\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}',
        'cs': '// C# كود جديد\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World!");\n    }\n}'
    };
    
    return defaults[ext] || '// ملف جديد';
}

// تبديل الملف
function switchFile(fileName) {
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
}

// تحديث محتوى المحرر
function updateEditorContent() {
    editor.setValue(files[currentFile] || '');
    updateEditorLanguage();
}

// تحديث لغة المحرر
function updateEditorLanguage() {
    const ext = currentFile.split('.').pop();
    const langMap = {
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'py': 'python',
        'java': 'java',
        'cs': 'csharp',
        'cpp': 'cpp',
        'php': 'php',
        'ts': 'typescript'
    };
    
    currentLanguage = langMap[ext] || 'javascript';
    monaco.editor.setModelLanguage(editor.getModel(), currentLanguage);
    
    // تحديث القائمة المنسدلة
    document.getElementById('languageSelect').value = currentLanguage;
    updateLanguageBadge();
}

// تحديث شارة اللغة
function updateLanguageBadge() {
    const badge = document.getElementById('languageBadge');
    const langNames = {
        'javascript': 'JS',
        'typescript': 'TS',
        'html': 'HTML',
        'css': 'CSS',
        'python': 'PY',
        'java': 'JAVA',
        'csharp': 'C#',
        'cpp': 'C++',
        'php': 'PHP'
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
        
        const ext = fileName.split('.').pop();
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
        'html': 'fa-file-code',
        'css': 'fa-file-code',
        'py': 'fa-file-code',
        'java': 'fa-file-code',
        'cs': 'fa-file-code',
        'cpp': 'fa-file-code',
        'php': 'fa-file-code',
        'ts': 'fa-file-code',
        'json': 'fa-file-code',
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

// تنسيق الكود
function formatCode() {
    const code = editor.getValue();
    let formattedCode = code;
    
    switch (currentLanguage) {
        case 'javascript':
            formattedCode = js_beautify(code);
            break;
        case 'html':
            formattedCode = html_beautify(code);
            break;
        case 'css':
            formattedCode = css_beautify(code);
            break;
    }
    
    if (formattedCode !== code) {
        editor.setValue(formattedCode);
        updateStatusIndicator('تم تنسيق الكود', 'success');
    }
}

// تبديل وضع الشاشة الكاملة
function toggleFullscreen() {
    const elem = document.querySelector('.container');
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-expand"></i>';
    }
}

// تحديث شريط الحالة
function updateStatus() {
    const content = editor.getValue();
    const lines = content.split('\n').length;
    const chars = content.length;
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    
    document.getElementById('lineCount').textContent = `${lines} سطر`;
    document.getElementById('fileSize').textContent = `${chars} حرف، ${words} كلمة`;
    document.getElementById('fileName').textContent = currentFile;
}

// تحديث مؤشر الحالة
function updateStatusIndicator(message, type = 'info') {
    const indicator = document.getElementById('statusIndicator');
    const icon = indicator.querySelector('i');
    
    indicator.innerHTML = `<i class="fas fa-circle"></i> ${message}`;
    
    // تحديث اللون حسب النوع
    const colors = {
        'success': '#4ec9b0',
        'warning': '#ffcc00',
        'error': '#f44747',
        'info': '#cccccc'
    };
    
    icon.style.color = colors[type] || '#cccccc';
    
    // إعادة تعيين بعد 3 ثوان
    setTimeout(() => {
        indicator.innerHTML = '<i class="fas fa-circle"></i> جاهز';
        icon.style.color = '#4ec9b0';
    }, 3000);
}

// معالجة وضع الشاشة الكاملة
document.addEventListener('fullscreenchange', () => {
    const icon = document.getElementById('fullscreenBtn').querySelector('i');
    if (!document.fullscreenElement) {
        icon.className = 'fas fa-expand';
    }
});