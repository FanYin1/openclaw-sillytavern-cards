# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-11

### Added
- 初始版本发布
- 完整支持 SillyTavern Character Card V1/V2/V3 规范
- PNG 格式导入/导出（带 tEXt chunk 嵌入数据）
- JSON 格式导入/导出
- 自动格式检测和版本识别
- 格式转换功能（V1→V2→V3）
- 数据验证和完整性检查
- 世界书（character_book）支持
- UTF-8 多语言支持（中文、日文等）
- 详细的错误提示和警告
- 完整的 API 文档和使用示例
- 单元测试覆盖

### Features
- 从 PNG 提取嵌入的角色卡数据
- 解析 JSON 格式的角色卡
- 导出为 PNG（嵌入 JSON 到 tEXt chunk）
- 导出为 JSON
- 规范化数据结构
- 验证必需字段和数据类型
- 格式化显示角色信息
- 支持大文件处理（< 10 MB JSON, < 15 MB 图片）

### Documentation
- 完整的 README.md
- SKILL.md 技能定义
- 使用示例和代码示例
- API 参考文档
- 故障排除指南

### Security
- 无硬编码凭证
- 仅请求必要的文件系统权限
- 输入验证和大小限制
- 安全的文件路径处理

## [Unreleased]

### Planned
- 批量处理功能
- 图形界面支持
- 更多格式支持（YAML, TOML）
- 角色卡模板库
- 在线角色卡市场集成
- 性能优化（流式处理大文件）
- 更多测试用例
