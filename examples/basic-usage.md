# SillyTavern Character Card 使用示例

## 示例 1：导入 PNG 格式角色卡

```
用户：导入这个角色卡 /path/to/character.png
AI：正在读取角色卡...
    [自动使用 tavern-card 技能解析]

    ✅ 成功导入角色卡！

    📋 角色信息：
    - 名称：艾莉娅
    - 规范：V2
    - 创建者：某某
    - 标签：幻想、精灵、魔法
```

## 示例 2：查看角色详细信息

```
用户：显示这个角色的详细信息
AI：📖 角色卡详细信息

    基本信息：
    - 名称：艾莉娅
    - 描述：一位来自古老森林的精灵法师...
    - 人格：聪明、好奇、善良...

    场景设定：
    在一个魔法森林的深处...

    第一条消息：
    "你好，旅行者。我是艾莉娅..."
```

##示例 3：格式转换（V2 → V3）

```
用户：把这个 V2 格式的角色卡升级到 V3
AI：正在转换格式...

    ✅ 已升级到 V3 格式！

    新增字段：
    - alternate_greetings: 3 个备选问候语
    - creation_date: 2026-03-10
    - assets: 头像和背景图
```

## 示例 4：导出为 JSON

```
用户：把这个角色导出为 JSON 格式
AI：正在导出...

    ✅ 已导出到：/path/to/output.json

    文件大小：15.2 KB
    格式：V3
    包含：角色数据 + 世界书
```

## 示例 5：验证角色卡数据

```
用户：验证这个角色卡的数据完整性
AI：正在验证...

    ✅ 验证通过！

    检查项：
    - 必需字段：完整 ✓
    - 数据类型：正确 ✓
    - 文件大小：8.5 MB (正常) ✓
    - 字符编码：UTF-8 ✓

    ⚠️ 警告：
    - 缺少 creator_notes 字段（可选）
```

## 示例 6：批量处理

```
用户：把 /cards/ 目录下的所有 V1 角色卡转换为 V3 并导出
AI：正在批量处理...

    处理进度：
    [████████████████████] 100% (12/12)

    ✅ 完成！
    - 成功：11 个
    - 失败：1 个（character_old.png - 数据损坏）

    输出目录：/cards/v3_export/
```

## 编程接口示例

### JavaScript/Node.js

```javascript
const utils = require('~/.openclaw/extensions/sillytavern-cards/skills/tavern-card/utils');

// 导入角色卡
const result = await utils.importCharacterCard('/path/to/character.png');
console.log(result.data.name);  // "艾莉娅"

// 验证数据
const validation = utils.validateCharacterCard(result.data);
if (validation.valid) {
  console.log('✅ 数据有效');
}

// 导出为 PNG
await utils.exportCharacterCardPNG(
  result.data,
  '/path/to/output.png',
  '/path/to/avatar.png'
);
```

## 常见场景

### 场景 1：从 SillyTavern 迁移角色

1. 从 SillyTavern 导出角色（PNG 格式）
2. 使用本技能导入并验证
3. 根据需要转换格式
4. 导出到新系统

### 场景 2：创建新角色

1. 准备角色数据（JSON）
2. 使用本技能验证数据
3. 导出为 PNG（带头像）
4. 导入到 SillyTavern 测试

### 场景 3：角色卡维护

1. 定期验证角色卡完整性
2. 升级到最新规范版本
3. 备份为多种格式
4. 检查数据一致性
