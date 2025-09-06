#!/bin/bash

# 构建指定文件的脚本
echo "开始构建指定文件..."

# 创建临时构建目录
mkdir -p _temp_build

# 复制必要的文件
echo "复制配置文件..."
cp _config.yml _temp_build/
cp -r _layouts _temp_build/ 2>/dev/null || true
cp -r assets _temp_build/ 2>/dev/null || true

# 复制指定的md文件
echo "复制Markdown文件..."
cp index.md _temp_build/

# 复制record目录中的指定文件
if [ -d "record" ]; then
    cp -r record _temp_build/
fi

# 复制repository目录中的指定文件
if [ -d "repository" ]; then
    cp -r repository _temp_build/
fi

# 复制life_management目录中的指定文件
if [ -d "life_management" ]; then
    cp -r life_management _temp_build/
fi

# 进入临时目录构建
cd _temp_build
echo "开始Jekyll构建..."
bundle exec jekyll build

# 复制构建结果回主目录
echo "复制构建结果..."
cp -r _site/* ../_site/ 2>/dev/null || true

# 清理临时目录
cd ..
rm -rf _temp_build

echo "构建完成！"
