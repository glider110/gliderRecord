#!/bin/bash

# 部署脚本 - 将文档部署到GitHub Pages

echo "🚀 开始部署 Glider Record 文档网站..."

# 检查是否在git仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误: 当前目录不是git仓库"
    echo "请先运行: git init"
    exit 1
fi

# 添加所有文件
echo "📁 添加文件到git..."
git add .

# 检查是否有变更
if git diff --staged --quiet; then
    echo "ℹ️  没有新的变更需要提交"
else
    # 提交变更
    echo "💾 提交变更..."
    git commit -m "更新文档内容 - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 推送到远程仓库
echo "🌐 推送到GitHub..."
git push origin main

echo "✅ 部署完成！"
echo ""
echo "📖 您的网站将在以下地址可用："
echo "   https://your-username.github.io/48rmw7nb2q"
echo ""
echo "⚠️  请将 'your-username' 替换为您的GitHub用户名"
echo ""
echo "🔧 如果这是第一次部署，请："
echo "   1. 在GitHub仓库设置中启用Pages"
echo "   2. 选择 'Deploy from a branch'"
echo "   3. 选择 'main' 分支和 '/ (root)' 文件夹"
echo ""
echo "📚 详细说明请查看 deploy.md 文件"
