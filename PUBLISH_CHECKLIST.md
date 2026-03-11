# 发布前检查清单

## ✅ 必需文件

- [x] `claw.json` - ClawHub 市场清单
- [x] `README.md` - 项目文档
- [x] `package.json` - npm 包信息
- [x] `openclaw.plugin.json` - OpenClaw 插件配置
- [x] `skills/tavern-card/SKILL.md` - 技能定义
- [x] `skills/tavern-card/utils.js` - 核心功能
- [x] `examples/basic-usage.md` - 使用示例
- [ ] `LICENSE` - 许可证文件
- [ ] `CHANGELOG.md` - 变更日志
- [ ] `icon.svg` 或 `icon.png` - 技能图标

## ✅ 代码质量

- [x] 代码已测试（test.js 通过）
- [x] 支持 V1/V2/V3 规范
- [x] 错误处理完善
- [x] UTF-8 编码支持
- [ ] 添加更多边缘情况测试
- [ ] 性能优化（大文件处理）

## ✅ 文档完整性

- [x] README 包含安装说明
- [x] README 包含使用示例
- [x] README 包含 API 文档
- [x] README 包含故障排除
- [x] SKILL.md 包含详细说明
- [x] 提供代码示例

## ✅ 安全要求

- [x] 无硬编码凭证
- [x] 仅请求必要权限（filesystem:read, filesystem:write）
- [x] 输入验证完善
- [x] 文件大小限制
- [ ] 添加更严格的路径验证
- [ ] 添加文件类型白名单

## ✅ 元数据

- [x] 语义化版本号（1.0.0）
- [x] 清晰的描述
- [x] 适当的标签
- [x] 兼容模型列表
- [ ] 填写真实的 author 信息
- [ ] 创建 GitHub 仓库
- [ ] 添加 homepage URL

## ✅ 测试

- [x] 本地测试通过
- [ ] 在干净环境中测试安装
- [ ] 测试所有示例场景
- [ ] 测试错误处理
- [ ] 测试大文件处理

## 📝 待完成项

1. **创建 LICENSE 文件**
   ```bash
   # MIT License 模板
   ```

2. **创建 CHANGELOG.md**
   ```markdown
   # Changelog

   ## [1.0.0] - 2026-03-11
   ### Added
   - 初始版本发布
   - 支持 V1/V2/V3 规范
   - PNG 和 JSON 导入/导出
   - 格式转换功能
   - 数据验证
   ```

3. **创建技能图标**
   - 尺寸：256x256 或 512x512
   - 格式：SVG（推荐）或 PNG
   - 主题：角色卡/SillyTavern 相关

4. **创建 GitHub 仓库**
   - 初始化仓库
   - 推送代码
   - 添加 README
   - 设置 topics/tags

5. **填写真实信息**
   - 在 claw.json 中填写你的 ClawHub 用户名
   - 在 claw.json 中填写 GitHub 仓库 URL
   - 在 package.json 中填写 author 信息

## 🚀 发布步骤

完成上述检查后，执行以下命令：

```bash
# 1. 验证技能结构
openclaw skill validate /home/myuser/.openclaw/extensions/sillytavern-cards

# 2. 本地测试
openclaw skill test /home/myuser/.openclaw/extensions/sillytavern-cards --verbose

# 3. 登录 ClawHub
openclaw auth login

# 4. 发布到市场
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards

# 5. 检查发布状态
openclaw skill status sillytavern-cards
```

## 📊 发布后

- 监控下载量和反馈
- 及时响应用户问题
- 定期更新和维护
- 收集功能请求
- 修复 bug

## 🔄 更新版本

```bash
# 补丁版本（bug 修复）
openclaw skill version patch

# 次要版本（新功能）
openclaw skill version minor

# 主要版本（破坏性更改）
openclaw skill version major

# 重新发布
openclaw skill publish /home/myuser/.openclaw/extensions/sillytavern-cards
```
