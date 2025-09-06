import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = __dirname;

function fixImagePaths(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // 跳过temp_backup目录
            if (file !== 'temp_backup' && file !== 'node_modules') {
                fixImagePaths(filePath);
            }
        } else if (file.endsWith('.md')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;
            
            // 修复图片路径
            content = content.replace(/!\[(.*?)\]\((?!https?:\/\/)(.*?)\)/g, (match, alt, imagePath) => {
                // 如果路径包含.assets，确保路径正确
                if (imagePath.includes('.assets/')) {
                    // 确保路径以/开头
                    if (!imagePath.startsWith('/')) {
                        const relativeToRoot = path.relative(path.dirname(filePath), path.resolve(docsPath, imagePath));
                        const newPath = '/' + relativeToRoot.replace(/\\/g, '/');
                        console.log(`Fixing image path in ${file}: ${imagePath} -> ${newPath}`);
                        modified = true;
                        return `![${alt}](${newPath})`;
                    }
                }
                return match;
            });
            
            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
            }
        }
    });
}

console.log('开始修复图片路径...');
fixImagePaths(docsPath);
console.log('图片路径修复完成！');