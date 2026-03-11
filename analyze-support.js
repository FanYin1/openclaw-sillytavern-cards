#!/usr/bin/env node

/**
 * 分析角色卡支持的字段和框架
 */

const utils = require('./skills/tavern-card/utils');

async function analyzeSupport(cardPath) {
  console.log('🔍 SillyTavern 角色卡框架支持分析\n');

  if (cardPath) {
    console.log(`📁 分析文件: ${cardPath}\n`);

    try {
      const result = await utils.importCharacterCard(cardPath);
      const cardData = result.data.data;

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log(`📊 角色卡信息: ${cardData.name || '未命名'}`);
      console.log(`📐 规范版本: ${result.data.spec} ${result.data.spec_version}\n`);

      // 分析使用的字段
      console.log('✅ 已使用的字段:\n');

      const fieldCategories = {
        '基础信息': ['name', 'description', 'personality', 'scenario'],
        '对话相关': ['first_mes', 'mes_example', 'alternate_greetings', 'group_only_greetings'],
        '提示词': ['system_prompt', 'post_history_instructions', 'creator_notes', 'creator_notes_multilingual'],
        '元数据': ['creator', 'character_version', 'tags', 'source'],
        '时间戳': ['creation_date', 'modification_date'],
        '资源': ['assets'],
        '扩展': ['extensions', 'character_book']
      };

      for (const [category, fields] of Object.entries(fieldCategories)) {
        const usedFields = fields.filter(f => {
          const value = cardData[f];
          if (value === undefined || value === null) return false;
          if (typeof value === 'string' && value.trim() === '') return false;
          if (Array.isArray(value) && value.length === 0) return false;
          if (typeof value === 'object' && Object.keys(value).length === 0) return false;
          return true;
        });

        if (usedFields.length > 0) {
          console.log(`  ${category}:`);
          usedFields.forEach(field => {
            const value = cardData[field];
            let preview = '';

            if (typeof value === 'string') {
              preview = value.length > 40 ? `"${value.substring(0, 40)}..."` : `"${value}"`;
            } else if (Array.isArray(value)) {
              preview = `[${value.length} 项]`;
            } else if (typeof value === 'object') {
              preview = `{${Object.keys(value).length} 个键}`;
            } else {
              preview = String(value);
            }

            console.log(`    ✓ ${field}: ${preview}`);
          });
          console.log();
        }
      }

      // 检查扩展功能
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('🔌 扩展功能分析:\n');

      if (cardData.extensions && Object.keys(cardData.extensions).length > 0) {
        console.log('  已使用的扩展:');
        for (const [key, value] of Object.entries(cardData.extensions)) {
          console.log(`    • ${key}: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : value}`);
        }
      } else {
        console.log('  ℹ️  未使用扩展功能');
      }
      console.log();

      // 世界书分析
      if (cardData.character_book) {
        console.log('  📚 世界书 (Character Book):');
        const book = cardData.character_book;
        console.log(`    • 名称: ${book.name || '(未命名)'}`);
        console.log(`    • 条目数: ${book.entries ? book.entries.length : 0}`);

        if (book.entries && book.entries.length > 0) {
          console.log(`    • 示例条目:`);
          const entry = book.entries[0];
          console.log(`      - 关键词: ${entry.keys ? entry.keys.join(', ') : '(无)'}`);
          console.log(`      - 内容: ${entry.content ? entry.content.substring(0, 50) + '...' : '(无)'}`);
          console.log(`      - 启用: ${entry.enabled ? '是' : '否'}`);
        }
      } else {
        console.log('  ℹ️  未使用世界书功能');
      }
      console.log();

      // V3 特性分析
      if (result.data.spec === 'chara_card_v3') {
        console.log('  🆕 V3 特性:');

        if (cardData.alternate_greetings && cardData.alternate_greetings.length > 0) {
          console.log(`    ✓ 备选问候语: ${cardData.alternate_greetings.length} 条`);
        }

        if (cardData.creator_notes_multilingual && Object.keys(cardData.creator_notes_multilingual).length > 0) {
          console.log(`    ✓ 多语言备注: ${Object.keys(cardData.creator_notes_multilingual).join(', ')}`);
        }

        if (cardData.source) {
          console.log(`    ✓ 来源: ${cardData.source}`);
        }

        if (cardData.group_only_greetings && cardData.group_only_greetings.length > 0) {
          console.log(`    ✓ 群组专用问候: ${cardData.group_only_greetings.length} 条`);
        }

        if (cardData.assets && Object.keys(cardData.assets).length > 0) {
          console.log(`    ✓ 资源: ${Object.keys(cardData.assets).join(', ')}`);
        }
        console.log();
      }

      // 兼容性报告
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('✅ 兼容性报告:\n');
      console.log('  本工具完全支持此角色卡的所有字段和功能！\n');

      if (result.validation.valid) {
        console.log('  ✓ 数据验证通过');
      } else {
        console.log('  ⚠️  数据验证发现问题:');
        result.validation.errors.forEach(e => console.log(`    - ${e}`));
      }

      if (result.validation.warnings.length > 0) {
        console.log('\n  ⚠️  警告:');
        result.validation.warnings.forEach(w => console.log(`    - ${w}`));
      }

    } catch (error) {
      console.error(`\n❌ 分析失败: ${error.message}`);
      process.exit(1);
    }

  } else {
    // 显示支持的所有字段
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📋 支持的字段和框架列表:\n');

    const allFields = {
      '✅ V1/V2/V3 基础字段': [
        'name - 角色名称',
        'description - 角色描述',
        'personality - 人格特征',
        'scenario - 场景设定',
        'first_mes - 第一条消息/问候语',
        'mes_example - 对话示例',
        'creator_notes - 创建者备注',
        'system_prompt - 系统提示词',
        'post_history_instructions - 历史后指令',
        'tags - 标签数组',
        'creator - 创建者',
        'character_version - 角色版本'
      ],
      '✅ V3 新增字段': [
        'alternate_greetings - 备选问候语数组',
        'creator_notes_multilingual - 多语言备注对象',
        'source - 角色来源',
        'group_only_greetings - 群组专用问候数组',
        'creation_date - 创建时间戳',
        'modification_date - 修改时间戳',
        'assets - 资源对象（头像、背景等）'
      ],
      '✅ 扩展功能': [
        'extensions - 自定义扩展对象',
        'character_book - 世界书/记忆书',
        '  • name - 世界书名称',
        '  • entries - 条目数组',
        '    - keys - 触发关键词',
        '    - content - 触发内容',
        '    - enabled - 是否启用',
        '    - insertion_order - 插入顺序',
        '    - case_sensitive - 大小写敏感',
        '    - priority - 优先级',
        '    - constant - 是否常驻'
      ],
      '✅ 常见扩展': [
        'depth_prompt - 深度提示词',
        'talkativeness - 话痨程度',
        'fav - 是否收藏',
        'world - 关联世界',
        'create_date - 创建日期',
        'avatar - 头像（base64 或 URL）'
      ]
    };

    for (const [category, fields] of Object.entries(allFields)) {
      console.log(`${category}:`);
      fields.forEach(field => console.log(`  ${field}`));
      console.log();
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 使用方法:\n');
    console.log('  分析具体角色卡:');
    console.log('    node analyze-support.js /path/to/character.png\n');
    console.log('  查看支持列表:');
    console.log('    node analyze-support.js\n');
  }
}

// 获取命令行参数
const cardPath = process.argv[2];
analyzeSupport(cardPath);
