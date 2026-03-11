#!/usr/bin/env node

/**
 * SillyTavern Character Card 测试脚本
 */

const fs = require('fs');
const path = require('path');
const utils = require('./skills/tavern-card/utils');

console.log('🎭 SillyTavern Character Card 工具测试\n');

// 测试 1: 创建测试角色卡数据
console.log('📝 测试 1: 创建测试角色卡数据');
const testCharacter = {
  name: '艾莉娅',
  description: '艾莉娅是一位来自精灵王国的年轻魔法师，拥有强大的自然魔法能力。她善良、好奇，热爱学习新事物。',
  personality: '善良、好奇、热爱学习、有点害羞但勇敢',
  scenario: '在一个充满魔法的世界中，艾莉娅正在寻找失落的古代魔法书。',
  first_mes: '你好！我是艾莉娅，很高兴认识你！你也是来寻找古代魔法书的吗？',
  mes_example: '<START>\n{{user}}: 你会什么魔法？\n{{char}}: 我擅长自然魔法，可以让植物生长，召唤小动物，还能治愈伤口呢！\n<START>\n{{user}}: 你为什么要寻找魔法书？\n{{char}}: 那本书记载着失传已久的自然魔法，我想学习它来保护我们的森林。',
  creator_notes: '这是一个友善的精灵魔法师角色，适合冒险和魔法主题的对话。',
  system_prompt: '你是艾莉娅，一位善良的精灵魔法师。',
  tags: ['精灵', '魔法', '友善', '冒险'],
  creator: '测试用户',
  character_version: '1.0'
};

console.log('✅ 测试角色卡数据创建成功\n');

// 测试 2: 规范化为 V2 格式
console.log('📝 测试 2: 规范化为 V2 格式');
const v2Character = utils.normalizeCharacterCard(testCharacter);
console.log(`✅ 规范化成功: ${v2Character.spec} ${v2Character.spec_version}\n`);

// 测试 3: 升级到 V3 格式
console.log('📝 测试 3: 升级到 V3 格式');
const v3Character = utils.upgradeToV3(v2Character);
v3Character.data.alternate_greetings = [
  '嗨！我注意到你也在寻找魔法书，要不要一起合作？',
  '啊，你好！你看起来像是个冒险者，需要我的帮助吗？'
];
v3Character.data.creator_notes_multilingual = {
  'zh-CN': '这是一个友善的精灵魔法师角色，适合冒险和魔法主题的对话。',
  'en-US': 'A friendly elf mage character, suitable for adventure and magic-themed conversations.'
};
v3Character.data.source = 'OpenClaw Test';
console.log(`✅ 升级成功: ${v3Character.spec} ${v3Character.spec_version}\n`);

// 测试 4: 验证数据
console.log('📝 测试 4: 验证角色卡数据');
const validation = utils.validateCharacterCard(v3Character);
if (validation.valid) {
  console.log('✅ 数据验证通过');
} else {
  console.log('❌ 数据验证失败:');
  validation.errors.forEach(err => console.log(`  - ${err}`));
}
if (validation.warnings.length > 0) {
  console.log('⚠️  警告:');
  validation.warnings.forEach(warn => console.log(`  - ${warn}`));
}
console.log();

// 测试 5: 格式化显示
console.log('📝 测试 5: 格式化显示角色信息');
console.log(utils.formatCharacterInfo(v3Character));
console.log();

// 测试 6-9: 异步测试
(async () => {
  // 测试 6: 导出为 JSON
  console.log('📝 测试 6: 导出为 JSON');
  const jsonPath = path.join(__dirname, 'test_character.json');
  try {
    const jsonResult = await utils.exportCharacterCardJSON(v3Character, jsonPath);
    console.log(`✅ JSON 导出成功:`);
    console.log(`  路径: ${jsonResult.path}`);
    console.log(`  大小: ${(jsonResult.size / 1024).toFixed(2)} KB`);
    console.log(`  格式: ${jsonResult.format}`);
    console.log(`  规范: ${jsonResult.spec}\n`);
  } catch (error) {
    console.log(`❌ JSON 导出失败: ${error.message}\n`);
  }

  // 测试 7: 导出为 PNG（使用最小 PNG）
  console.log('📝 测试 7: 导出为 PNG（最小图片）');
  const pngPath = path.join(__dirname, 'test_character.png');
  try {
    const pngResult = await utils.exportCharacterCardPNG(v3Character, pngPath);
    console.log(`✅ PNG 导出成功:`);
    console.log(`  路径: ${pngResult.path}`);
    console.log(`  大小: ${(pngResult.size / 1024).toFixed(2)} KB`);
    console.log(`  格式: ${pngResult.format}`);
    console.log(`  规范: ${pngResult.spec}\n`);
  } catch (error) {
    console.log(`❌ PNG 导出失败: ${error.message}\n`);
  }

  // 测试 8: 从 PNG 导入
  console.log('📝 测试 8: 从 PNG 导入角色卡');
  if (fs.existsSync(pngPath)) {
    try {
      const imported = await utils.importCharacterCard(pngPath);
      console.log(`✅ PNG 导入成功:`);
      console.log(`  文件: ${imported.filePath}`);
      console.log(`  格式: ${imported.format}`);
      console.log(`  规范: ${imported.data.spec}`);
      console.log(`  角色名: ${imported.data.data.name}`);
      console.log(`  验证: ${imported.validation.valid ? '通过' : '失败'}\n`);
    } catch (error) {
      console.log(`❌ PNG 导入失败: ${error.message}\n`);
    }
  }

  // 测试 9: 从 JSON 导入
  console.log('📝 测试 9: 从 JSON 导入角色卡');
  if (fs.existsSync(jsonPath)) {
    try {
      const imported = await utils.importCharacterCard(jsonPath);
      console.log(`✅ JSON 导入成功:`);
      console.log(`  文件: ${imported.filePath}`);
      console.log(`  格式: ${imported.format}`);
      console.log(`  规范: ${imported.data.spec}`);
      console.log(`  角色名: ${imported.data.data.name}`);
      console.log(`  验证: ${imported.validation.valid ? '通过' : '失败'}\n`);
    } catch (error) {
      console.log(`❌ JSON 导入失败: ${error.message}\n`);
    }
  }

  console.log('🎉 所有测试完成！');
  console.log('\n生成的测试文件:');
  console.log(`  - ${jsonPath}`);
  console.log(`  - ${pngPath}`);
  console.log('\n你可以将这些文件导入到 SillyTavern 中测试兼容性。');
})();
