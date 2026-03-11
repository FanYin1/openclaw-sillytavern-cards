#!/usr/bin/env node

/**
 * SillyTavern Character Card 快速使用示例
 *
 * 使用方法：
 * node example.js import /path/to/character.png
 * node example.js export /path/to/character.json /path/to/output.png
 * node example.js convert /path/to/character.json v3
 */

const fs = require('fs');
const path = require('path');
const utils = require('./skills/tavern-card/utils');

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

async function main() {
  try {
    switch (command) {
      case 'import': {
        if (!arg1) {
          console.error('❌ 请提供文件路径');
          console.log('用法: node example.js import /path/to/character.png');
          process.exit(1);
        }

        console.log(`📥 导入角色卡: ${arg1}\n`);
        const result = await utils.importCharacterCard(arg1);

        console.log('✅ 导入成功！\n');
        console.log(utils.formatCharacterInfo(result.data));

        if (result.validation.warnings.length > 0) {
          console.log('\n⚠️  警告:');
          result.validation.warnings.forEach(w => console.log(`  - ${w}`));
        }
        break;
      }

      case 'export': {
        if (!arg1 || !arg2) {
          console.error('❌ 请提供输入和输出路径');
          console.log('用法: node example.js export /path/to/input.json /path/to/output.png');
          process.exit(1);
        }

        console.log(`📤 导出角色卡\n`);
        console.log(`  输入: ${arg1}`);
        console.log(`  输出: ${arg2}\n`);

        // 读取输入文件
        const imported = await utils.importCharacterCard(arg1);

        // 根据输出文件扩展名选择格式
        const ext = path.extname(arg2).toLowerCase();
        let result;

        if (ext === '.png') {
          result = await utils.exportCharacterCardPNG(imported.data, arg2);
        } else if (ext === '.json') {
          result = await utils.exportCharacterCardJSON(imported.data, arg2);
        } else {
          throw new Error('不支持的输出格式，请使用 .png 或 .json');
        }

        console.log('✅ 导出成功！\n');
        console.log(`  路径: ${result.path}`);
        console.log(`  大小: ${(result.size / 1024).toFixed(2)} KB`);
        console.log(`  格式: ${result.format}`);
        console.log(`  规范: ${result.spec}`);
        break;
      }

      case 'convert': {
        if (!arg1 || !arg2) {
          console.error('❌ 请提供文件路径和目标版本');
          console.log('用法: node example.js convert /path/to/character.json v3');
          process.exit(1);
        }

        const targetVersion = arg2.toLowerCase();
        if (targetVersion !== 'v2' && targetVersion !== 'v3') {
          console.error('❌ 目标版本必须是 v2 或 v3');
          process.exit(1);
        }

        console.log(`🔄 格式转换: ${arg1} → ${targetVersion.toUpperCase()}\n`);

        // 读取输入文件
        const imported = await utils.importCharacterCard(arg1);
        console.log(`  原始格式: ${imported.data.spec}`);

        // 转换
        let converted;
        if (targetVersion === 'v3') {
          converted = utils.upgradeToV3(imported.data);
        } else {
          converted = utils.normalizeCharacterCard(imported.data);
        }

        console.log(`  目标格式: ${converted.spec}\n`);

        // 保存
        const outputPath = arg1.replace(/\.(json|png)$/, `_${targetVersion}.$1`);
        const ext = path.extname(arg1).toLowerCase();

        let result;
        if (ext === '.png') {
          result = await utils.exportCharacterCardPNG(converted, outputPath);
        } else {
          result = await utils.exportCharacterCardJSON(converted, outputPath);
        }

        console.log('✅ 转换成功！\n');
        console.log(`  输出: ${result.path}`);
        console.log(`  大小: ${(result.size / 1024).toFixed(2)} KB`);
        break;
      }

      case 'validate': {
        if (!arg1) {
          console.error('❌ 请提供文件路径');
          console.log('用法: node example.js validate /path/to/character.json');
          process.exit(1);
        }

        console.log(`🔍 验证角色卡: ${arg1}\n`);

        const imported = await utils.importCharacterCard(arg1);
        const validation = imported.validation;

        if (validation.valid) {
          console.log('✅ 验证通过！\n');
          console.log(`  规范: ${imported.data.spec}`);
          console.log(`  角色名: ${imported.data.data.name}`);
        } else {
          console.log('❌ 验证失败！\n');
          console.log('错误:');
          validation.errors.forEach(e => console.log(`  - ${e}`));
        }

        if (validation.warnings.length > 0) {
          console.log('\n⚠️  警告:');
          validation.warnings.forEach(w => console.log(`  - ${w}`));
        }
        break;
      }

      case 'info': {
        if (!arg1) {
          console.error('❌ 请提供文件路径');
          console.log('用法: node example.js info /path/to/character.png');
          process.exit(1);
        }

        const imported = await utils.importCharacterCard(arg1);
        console.log(utils.formatCharacterInfo(imported.data));
        break;
      }

      default:
        console.log('🎭 SillyTavern Character Card 工具\n');
        console.log('用法:');
        console.log('  node example.js import <file>              - 导入角色卡');
        console.log('  node example.js export <input> <output>    - 导出角色卡');
        console.log('  node example.js convert <file> <v2|v3>     - 格式转换');
        console.log('  node example.js validate <file>            - 验证角色卡');
        console.log('  node example.js info <file>                - 显示角色信息');
        console.log('\n示例:');
        console.log('  node example.js import character.png');
        console.log('  node example.js export character.json output.png');
        console.log('  node example.js convert character.json v3');
        console.log('  node example.js validate character.png');
        console.log('  node example.js info character.json');
    }
  } catch (error) {
    console.error(`\n❌ 错误: ${error.message}`);
    process.exit(1);
  }
}

main();
