import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SUMMARY.md中列出的文件
const summaryFiles = [
  // 工作记录
  'record/standard_record/std_record.md',
  'record/standard_record/develop_record.md',
  'record/standard_record/on_site_issuse.md',
  'record/standard_record/meeting.md',
  'record/standard_record/rack_filter.md',
  'record/standard_record/test_oba_avoid_2.0.md',
  'record/standard_record/avoid_obstacle_3.0.md',
  'record/standard_record/2D_lidar_install.md',
  'record/standard_record/RobotDockingRelated_report.md',
  'record/akb_Record/linux.md',
  'record/akb_Record/cartographer.md',
  'record/akb_Record/git.md',
  
  // 知识库
  'repository/book.md',
  'repository/book_note.md',
  'repository/github.md',
  'repository/mooc_pointclouds.md',
  'repository/sensor_dev.md',
  'repository/resume.md',
  'repository/test.md',
  
  // 工具库
  'repository/toolkit.md',
  'repository/isaac-sim-.md',
  'repository/visualize.md'
];

console.log('检查SUMMARY.md中列出的文件...\n');

let missingFiles = [];
let existingFiles = [];

summaryFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    existingFiles.push(file);
    console.log(`✅ ${file}`);
  } else {
    missingFiles.push(file);
    console.log(`❌ ${file} - 文件不存在`);
  }
});

console.log(`\n📊 统计结果:`);
console.log(`✅ 存在的文件: ${existingFiles.length}/${summaryFiles.length}`);
console.log(`❌ 缺失的文件: ${missingFiles.length}/${summaryFiles.length}`);

if (missingFiles.length > 0) {
  console.log(`\n⚠️  缺失的文件列表:`);
  missingFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log(`\n🎉 所有SUMMARY.md中列出的文件都存在！`);
}
