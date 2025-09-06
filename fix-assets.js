import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归处理目录中的所有markdown文件
function processMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      processMarkdownFile(filePath);
    }
  });
}

// 处理单个markdown文件
function processMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 修复图片路径 - 将相对路径转换为绝对路径
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (src.startsWith('./') || src.startsWith('../')) {
      // 计算相对于docs目录的路径
      const relativePath = path.relative('docs', path.dirname(filePath));
      const newSrc = '/' + path.join(relativePath, src).replace(/\\/g, '/');
      modified = true;
      return `![${alt}](${newSrc})`;
    }
    return match;
  });
  
  // 修复HTML img标签
  content = content.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, src) => {
    if (src.startsWith('./') || src.startsWith('../')) {
      const relativePath = path.relative('docs', path.dirname(filePath));
      const newSrc = '/' + path.join(relativePath, src).replace(/\\/g, '/');
      modified = true;
      return match.replace(src, newSrc);
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`已处理: ${filePath}`);
  }
}

// 开始处理
console.log('开始处理Markdown文件中的资源路径...');
processMarkdownFiles('docs');
console.log('处理完成！');
