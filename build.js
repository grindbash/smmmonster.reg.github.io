const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...');

// Читаем переменные окружения
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Проверяем, что переменная установлена
if (!WEBHOOK_URL) {
    console.error('❌ ERROR: WEBHOOK_URL environment variable is not set');
    console.error('Please set WEBHOOK_URL in your Render.com environment variables');
    process.exit(1);
}

console.log('✅ WEBHOOK_URL found:', WEBHOOK_URL.replace(/(\/webhook-test\/)(.+)/, '$1***')); // Скрываем часть URL для безопасности

// Пути к файлам
const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'index.html');

// Проверяем существование шаблона
if (!fs.existsSync(templatePath)) {
    console.error('❌ ERROR: index.template.html not found');
    process.exit(1);
}

// Читаем шаблон
console.log('📖 Reading template...');
let template = fs.readFileSync(templatePath, 'utf8');

// Заменяем плейсхолдеры
console.log('🔄 Replacing placeholders...');
template = template.replace(/{{WEBHOOK_URL}}/g, WEBHOOK_URL);

// Сохраняем результат
console.log('💾 Writing index.html...');
fs.writeFileSync(outputPath, template);

console.log('✅ Build completed successfully!');
console.log('📁 Generated: index.html');