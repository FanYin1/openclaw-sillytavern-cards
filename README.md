# 🎭 SillyTavern Character Card Extension for OpenClaw

完美兼容 SillyTavern 角色卡的 OpenClaw 扩展，支持 V1/V2/V3 规范。

## 📦 安装

扩展已安装在：
```
~/.openclaw/extensions/sillytavern-cards/
```

## 🚀 快速开始

### 1. 重启 OpenClaw Gateway

```bash
# 重启 gateway 以加载新技能
openclaw gateway --force
```

### 2. 验证技能已加载

```bash
openclaw skills list | grep tavern
openclaw skills info tavern-card
```

### 3. 运行测试

```bash
cd ~/.openclaw/extensions/sillytavern-cards
node test.js
```

## 📖 使用方法

### 在 OpenClaw 对话中使用

当你通过 OpenClaw 与 AI 对话时，可以直接请求处理 SillyTavern 角色卡：

**示例 1：导入角色卡**
```
你：导入这个角色卡 /path/to/character.png
AI：[自动使用 tavern-card 技能读取和解析角色卡]
```

**示例 2：查看角色信息**
```
你：显示这个角色的详细信息
AI：[格式化显示角色的所有属性]
```

**示例 3：导出角色卡**
```
你：把这个角色导出为 PNG 格式
AI：[生成带嵌入数据的 PNG 文件]
```

**示例 4：格式转换**
```
你：把这个 V1 格式的角色卡转换为 V3
AI：[自动转换并添加 V3 特有字段]
```

## 🎯 功能特性

### ✅ 支持的格式

- **PNG 格式**：带嵌入式 JSON 数据的 PNG 图片
- **JSON 格式**：纯 JSON 角色卡文件
- **V1/V2/V3 规范**：自动检测和转换

### ✅ 核心功能

1. **导入**
   - 从 PNG 提取嵌入的角色卡数据
   - 解析 JSON 格式的角色卡
   - 自动检测文件格式
   - 验证数据完整性

2. **解析**
   - 支持 V1/V2/V3 规范
   - 自动规范化数据结构
   - UTF-8 多语言支持
   - 世界书（character_book）支持

3. **导出**
   - 导出为 PNG（嵌入 JSON 到 tEXt chunk）
   - 导出为 JSON
   - 自动选择合适的规范版本
   - 保留所有扩展数据

4. **验证**
   - 检查必需字段
   - 验证数据类型
   - 数据大小检查
   - 提供详细的错误信息

## 📐 角色卡规范

### V2 格式（推荐）

```json
{
  "spec": "chara_card_v2",
  "spec_version": "2.0",
  "data": {
    "name": "角色名",
    "description": "角色描述",
    "personality": "人格特征",
    "scenario": "场景设定",
    "first_mes": "第一条消息",
    "mes_example": "对话示例",
    "creator_notes": "创建者备注",
    "system_prompt": "系统提示词",
    "post_history_instructions": "历史后指令",
    "tags": ["标签1", "标签2"],
    "creator": "创建者",
    "character_version": "1.0",
    "extensions": {}
  }
}
```

### V3 格式（最新）

在 V2 基础上增加：
- `alternate_greetings`: 备选问候语数组
- `creator_notes_multilingual`: 多语言备注对象
- `source`: 角色来源
- `group_only_greetings`: 群组专用问候
- `creation_date`: 创建时间戳
- `modification_date`: 修改时间戳
- `assets`: 资源对象（头像、背景等）

## 🔧 编程接口

### 导入角色卡

```javascript
const utils = require('~/.openclaw/extensions/sillytavern-cards/skills/tavern-card/utils');

// 导入 PNG 或 JSON
const result = await utils.importCharacterCard('/path/to/character.png');
console.log(result.data);        // 角色卡数据
console.log(result.validation);  // 验证结果
console.log(result.format);      // 文件格式
```

### 导出角色卡

```javascript
// 导出为 PNG
await utils.exportCharacterCardPNG(
  characterData,
  '/path/to/output.png',
  '/path/to/avatar.png'  // 可选
);

// 导出为 JSON
await utils.exportCharacterCardJSON(
  characterData,
  '/path/to/output.json'
);
```

### 格式转换

```javascript
// V1 → V2
const v2Data = utils.normalizeCharacterCard(v1Data);

// V2 → V3
const v3Data = utils.upgradeToV3(v2Data);
```

### 数据验证

```javascript
const validation = utils.validateCharacterCard(characterData);
if (validation.valid) {
  console.log('验证通过');
} else {
  console.log('错误:', validation.errors);
  console.log('警告:', validation.warnings);
}
```

### 格式化显示

```javascript
const info = utils.formatCharacterInfo(characterData);
console.log(info);
```

## 📝 测试文件

运行测试后会生成两个示例文件：

1. **test_character.json** - JSON 格式的角色卡
2. **test_character.png** - PNG 格式的角色卡（带嵌入数据）

这两个文件可以直接导入到 SillyTavern 中测试兼容性。

## 🔍 技术细节

### PNG 数据嵌入

角色卡数据存储在 PNG 的 `tEXt` chunk 中：
- **关键字**: `chara`
- **编码**: base64
- **位置**: IEND chunk 之前

### 数据提取流程

1. 验证 PNG 签名（89 50 4E 47 0D 0A 1A 0A）
2. 遍历所有 chunk
3. 查找 `tEXt` 或 `iTXt` chunk
4. 检查关键字是否为 `chara`
5. 提取并 base64 解码数据
6. 解析 JSON

### 字符编码

- **PNG chunk**: UTF-8
- **JSON 数据**: UTF-8 → base64
- **多字节字符**: 完整支持中文、日文等

## ⚠️ 注意事项

1. **文件路径**：必须使用绝对路径
2. **数据大小**：建议角色卡 JSON < 10 MB
3. **头像图片**：建议 < 15 MB（base64 编码）
4. **PNG 格式**：导出时头像必须是 PNG 格式

## 🐛 故障排除

### 技能未加载

```bash
# 重启 OpenClaw Gateway
openclaw gateway --force

# 检查技能状态
openclaw skills check
```

### 导入失败

- 检查文件是否存在
- 验证文件格式（PNG 或 JSON）
- 确认 PNG 中包含 chara 数据
- 检查 JSON 语法是否正确

### 导出失败

- 确认输出目录存在
- 检查磁盘空间
- 验证角色卡数据完整性

## 📚 相关资源

- [SillyTavern 官方文档](https://docs.sillytavern.app/)
- [Character Card Spec V2](https://github.com/malfoyslastname/character-card-spec-v2)
- [PNG 文件格式规范](http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html)
- [OpenClaw 文档](https://docs.openclaw.ai/)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**提示**：这个扩展提供了完整的 SillyTavern 角色卡处理能力，可以无缝集成到你的 OpenClaw 工作流中！
