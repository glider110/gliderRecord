import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 根据SUMMARY.md生成正确的URL
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

console.log('根据Jekyll permalink配置生成的URL:\n');
console.log('permalink: /:path.html\n');

summaryFiles.forEach(file => {
  // 移除.md扩展名，添加.html
  const urlPath = file.replace('.md', '');
  const fullUrl = `https://glider110.github.io/gliderRecord/${urlPath}.html`;
  console.log(`${file} -> ${fullUrl}`);
});

console.log('\n测试特定URL:');
console.log('https://glider110.github.io/gliderRecord/repository/visualize.html');
