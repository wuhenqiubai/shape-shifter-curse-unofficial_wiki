# 更新日志 — NeoForge 版本

## NeoForge Dev.4

**内置 CCA 依赖，简化用户安装步骤。**

CCA（`cardinal-components-api`）现通过 Jar-in-Jar 内置在 SSC 中，用户无需单独安装。

### JiJ 打包

- `build.gradle`：为 `cardinal-components-base` 和 `cardinal-components-entity` 添加 `include`，通过 JiJ 打包
- `fabric.mod.json` `depends`：移除 CCA 外部依赖声明

### 兼容性

- Fabric：无变化（CCA 本就可从 Gradle classpath 获取）
- NeoForge + Connector：CCA 自动从 SSC Jar 的 `META-INF/jars/` 提取并由 Connector 加载
- 用户应删除 `.connector` 缓存目录以确保 Connector 正确处理嵌套 Jar

---

## NeoForge Dev.3

**修复两大启动崩溃问题。**

### Curios Mixin 崩溃

**症状**：游戏启动直接崩溃，日志显示 `MixinPreProcessorException: ClassNotFoundException`

**原因**：`ssc-misc.mixins.json` 中 `forge.*` 包下的 Mixin 引用旧版 Forge 类（`net.minecraftforge.*`），NeoForge 使用 `net.neoforged.*`，Mixin 应用时类加载失败。

**修复**：`MixinConfigPlugin` 运行时检测 NeoForge 环境，自动跳过所有不兼容的 Mixin，回退到 Trinkets 配件方案。

### CCA 依赖冲突

**症状**：NeoForge 启动提示 "requires cardinal-components-api"

**原因**：`fabric.mod.json` 的 `depends` 声明了 `cardinal-components` 为外部依赖，但 CCA 通过 JiJ 内置。Sinytra Connector 在元数据扫描阶段无法识别内置依赖。

**修复**：移除 `depends` 中的 CCA 声明，仅通过 `custom.cardinal-components` 元数据注册组件。

---

## NeoForge Dev.2

**NeoForge 兼容性修复：命名空间、粒子、进度。**

### 兼容性修复

- **战利品表**：替换 `random_chance_with_looting` 为 `random_chance`（NeoForge 未注册该条件类型）
- **进度**：修正 6 个通用形态层级进度的触发器引用
- **Apoli Power 命名空间**：为所有配置添加 `origins` → `apoli` 别名，解决初始化顺序导致的类型未注册
- **粒子参数格式**：修复 `minecraft:dust` 粒子参数以适配 1.21.1（字符串 → 复合对象）

---

## NeoForge Dev.1

**首个 NeoForge 预览版。**

基于 Sinytra Connector 运行，需要在 NeoForge 环境安装对应前置模组。

### 已知问题

- Jar-in-Jar 打包方案在 NeoForge/Connector 下存在问题
- 部分形态的 Power 失效（已知：Axolotl、SnowFox）

### 前置模组

- Additional Entity Attributes (NeoForge)
- Apoli 2.12.0-alpha.7+mc.1.21.x (patch1)
- AzureLib 3.0.19 (NeoForge)
- Cardinal Components API 6.1.3
- Cloth Config 15.0.140 (NeoForge)
- Player Ability Lib 1.10.0 (Forge)
- Pehkui
- Satin 2.0.0
- Forgified Fabric API 0.116.7+2.2.4+1.21.1
- Sinytra Connector 2.0.0-beta.14+1.21.1

> 完整变更：https://github.com/wuhenqiubai/Shape-Shifter-Curse_Unofficial-Port/commits/NeoForge_Dev.1
