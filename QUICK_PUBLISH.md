# 🚀 快速发布指南

## 📋 发布前准备

### 1. 完成必填信息

编辑 `claw.json`，填写以下信息：

```json
{
  "author": "your-clawhub-username",  // ← 改为你的 ClawHub 用户名
  "homepage": "https://github.com/your-username/openclaw-sillytavern-cards",  // ← 改为你的仓库
  "repository": {
    "url": "https://github.com/your-username/openclaw-sillytavern-cards.git"  // ← 改为你的仓库
  }
}
```

编辑 `LICENSE`，填写你的名字：

```
Copyright (c) 2026 [Your Name]  // ← 改为你的名字
```

### 2. 创建 GitHub 仓库（可选但推荐）

```bash
# 在 GitHub 上创建新仓库：openclaw-sillytavern-cards

# 初始化 git（如果还没有）
cd /home/myuser/.openclaw/extensions/sillytavern-cards
git init
git add .
git commit -m "feat: initial release of SillyTavern character card extension"

# 关联远程仓库
git remote add origin https://github.com/your-username/openclaw-sillytavern-cards.git
git branch -M main
git push -u origin main
```

### 3. 创建技能图标（可选）

在扩展根目录创建 `icon.svg` 或 `icon.png`：
- 尺寸：256x256 或 512x512
- 主题：角色卡/SillyTavern 相关
- 简洁清晰的设计

## 🔍 验证和测试

### 步骤 1：验证技能结构

```bash
openclaw skill validate /home/myuser/.openclaw/extensions/sillytavern-cards
```

**预期输出：**
```
✅ Skill structure is valid
✅ All required files present
✅ Manifest (claw.json) is valid
✅ No security issues detected
```

### 步骤 2：本地测试

```bash
openclaw skill test /home/myuser/.openclaw/extensions/sillytavern-cards --verbose
```

**预期输出：**
```
Running tests for sillytavern-cards...
✅ Import PNG test passed
✅ Import JSON test passed
✅ Export PNG test passed
✅ Export JSON test passed
✅ Format conversion test passed
✅ Validation test passed

All tests passed! (6/6)
```

### 步骤 3：模拟安装

```bash
openclaw skill install /home/myuser/.openclaw/extensions/sillytavern-cards --local
```

## 📤 发布到 ClawHub

### 步骤 1：登录 ClawHub

```bash
openclaw auth login
```

这会打开浏览器，让你通过 GitHub 或邮箱登录 ClawHub。

**首次发布需要身份验证：**
- GitHub 账号验证（推荐）
- 或邮箱验证

### 步骤 2：发布技能

```bash
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards
```

**发布过程：**
1. 上传文件到 ClawHub
2. 自动 VirusTotal 安全扫描
3. 验证清单和权限
4. 生成技能页面

**预期输出：**
```
📦 Packaging skill...
🔐 Verifying identity...
🔍 Running security scan...
✅ Security scan passed
📤 Publishing to ClawHub...

✅ Successfully published sillytavern-cards v1.0.0!

🌐 View on ClawHub: https://clawhub.ai/skills/sillytavern-cards
📊 Install command: openclaw skill install sillytavern-cards
```

### 步骤 3：检查发布状态

```bash
openclaw skill status sillytavern-cards
```

**预期输出：**
```
Skill: sillytavern-cards
Version: 1.0.0
Status: Published ✅
Downloads: 0
Rating: N/A
Last updated: 2026-03-11

ClawHub URL: https://clawhub.ai/skills/sillytavern-cards
```

## 🔄 发布后更新

### 修复 Bug（补丁版本）

```bash
# 修改代码...

# 更新版本号（1.0.0 → 1.0.1）
openclaw skill version patch

# 重新发布
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards
```

### 添加新功能（次要版本）

```bash
# 添加新功能...

# 更新版本号（1.0.1 → 1.1.0）
openclaw skill version minor

# 更新 CHANGELOG.md
# 重新发布
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards
```

### 破坏性更改（主要版本）

```bash
# 进行破坏性更改...

# 更新版本号（1.1.0 → 2.0.0）
openclaw skill version major

# 更新 CHANGELOG.md 和文档
# 重新发布
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards
```

## 📊 监控和维护

### 查看统计信息

```bash
openclaw skill stats sillytavern-cards
```

### 查看用户反馈

访问 ClawHub 技能页面查看：
- 用户评分
- 评论和反馈
- 问题报告
- 功能请求

### 响应用户

- 及时回复评论
- 修复报告的 bug
- 考虑功能请求
- 定期更新文档

## ⚠️ 常见问题

### 发布失败：身份验证错误

```bash
# 重新登录
openclaw auth logout
openclaw auth login
```

### 发布失败：安全扫描未通过

检查代码中是否有：
- 硬编码的凭证或密钥
- 可疑的网络请求
- 混淆的代码
- 不必要的权限请求

### 发布失败：清单验证错误

检查 `claw.json`：
- 所有必需字段都已填写
- 版本号符合语义化版本规范
- 权限列表正确
- 标签和关键词合适

### 技能未出现在市场

- 等待 1-3 个工作日（如果进入人工审核）
- 检查发布状态：`openclaw skill status sillytavern-cards`
- 联系 ClawHub 支持

## 🎉 发布成功！

发布成功后，你的技能将：
- 出现在 ClawHub 市场
- 可通过 `openclaw skill install sillytavern-cards` 安装
- 被搜索引擎索引
- 获得下载统计和用户反馈

**分享你的技能：**
- 在社交媒体上宣传
- 写一篇博客文章
- 在相关社区分享
- 添加到你的作品集

---

**需要帮助？**
- ClawHub 文档：https://docs.clawhub.ai/
- OpenClaw 社区：https://community.openclaw.ai/
- GitHub Issues：https://github.com/openclaw/openclaw/issues
