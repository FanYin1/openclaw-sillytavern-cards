#!/usr/bin/env node

/**
 * 从用户提供的角色卡图片中提取信息
 *
 * 使用方法：
 * 1. 将角色卡图片保存到本地
 * 2. 运行: node import-card.js /path/to/character.png
 */

const utils = require('./skills/tavern-card/utils');

async function importCard(imagePath) {
  console.log('🎭 导入 SillyTavern 角色卡\n');
  console.log(`📁 文件: ${imagePath}\n`);

  try {
    // 导入角色卡
    const result = await utils.importCharacterCard(imagePath);

    console.log('✅ 导入成功！\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 显示角色信息
    console.log(utils.formatCharacterInfo(result.data));

    // 显示验证结果
    if (result.validation.errors.length > 0) {
      console.log('\n❌ 验证错误:');
      result.validation.errors.forEach(e => console.log(`  - ${e}`));
    }

    if (result.validation.warnings.length > 0) {
      console.log('\n⚠️  警告:');
      result.validation.warnings.forEach(w => console.log(`  - ${w}`));
    }

    // 显示技术信息
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📊 技术信息:');
    console.log(`  文件格式: ${result.format.toUpperCase()}`);
    console.log(`  规范版本: ${result.data.spec} ${result.data.spec_version}`);
    console.log(`  验证状态: ${result.validation.valid ? '✅ 通过' : '❌ 失败'}`);

    // 显示数据结构
    const cardData = result.data.data;
    console.log('\n📦 数据字段:');
    const fields = Object.keys(cardData).filter(k => cardData[k]);
    fields.forEach(field => {
      const value = cardData[field];
      if (typeof value === 'string') {
        const preview = value.length > 50 ? value.substring(0, 50) + '...' : value;
        console.log(`  • ${field}: "${preview}"`);
      } else if (Array.isArray(value)) {
        console.log(`  • ${field}: [${value.length} 项]`);
      } else if (typeof value === 'object') {
        console.log(`  • ${field}: {对象}`);
      }
    });

    // 提供导出选项
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 后续操作:');
    console.log(`  导出为 JSON: node example.js export "${imagePath}" output.json`);
    console.log(`  转换为 V3:   node example.js convert "${imagePath}" v3`);
    console.log(`  验证数据:    node example.js validate "${imagePath}"`);

  } catch (error) {
    console.error(`\n❌ 导入失败: ${error.message}`);
    console.error('\n可能的原因:');
    console.error('  1. 文件不存在或路径错误');
    console.error('  2. 不是有效的 PNG 或 JSON 文件');
    console.error('  3. PNG 中没有嵌入角色卡数据');
    console.error('  4. JSON 格式错误');
    process.exit(1);
  }
}

// 获取命令行参数
const imagePath = process.argv[2];

if (!imagePath) {
  console.log('🎭 SillyTavern 角色卡导入工具\n');
  console.log('使用方法:');
  console.log('  node import-card.js <角色卡文件路径>\n');
  console.log('示例:');
  console.log('  node import-card.js /path/to/character.png');
  console.log('  node import-card.js /path/to/character.json\n');
  console.log('支持的格式:');
  console.log('  • PNG 格式（带嵌入的 JSON 数据）');
  console.log('  • JSON 格式（纯文本）');
  console.log('  • V1/V2/V3 规范自动识别\n');
  process.exit(0);
}

importCard(imagePath);
