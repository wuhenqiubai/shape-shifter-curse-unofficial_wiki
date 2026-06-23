# 更新日志 — Fabric 版本

## 1.9.2-dev.18+mc.1.21.1

**动画管线重构：完全移除 PAL 依赖，重写 GeckoLib 动画驱动层。**

本次更新彻底重构了形态动画系统，不再依赖 Player Animation Library，改为由 Mixin 注入 + processAnimation 驱动的纯 GeckoLib 方案。

### 动画系统

- **新增** `PlayerEntityModelAnimMixin`：取代 PAL 的 `PlayerModelMixin`，在 `setAngles` 阶段重置 ModelPart 并注入关键帧动画
- **新增** `PlayerRendererBodyRootMixin`：取代 PAL 的 `PlayerRendererMixin`，在 `setupTransforms` 阶段应用 bodyRoot 矩阵变换（实现全身旋转）
- **分离** body/torso 动画数据：`body → bodyRoot`（矩阵变换，影响全部骨骼），`torso → bipedBody`（骨骼动画），修复爬行时身体旋转异常
- **支持** GeckoLib `EasingType` 关键帧缓动（EASE_IN_OUT_QUAD 等），提升动画节奏感
- **禁用** GeckoLib AnimationController（因 `adjustTick=0` 导致动画卡帧，由 `processAnimation` 完全接管）
- **修复** 合并动画文件 `anim.length()` 返回天文数字导致骨骼飞散的问题
- **修复** 合并动画文件中 body/torso 覆盖逻辑错误（爬行动画丢失 90° 俯身旋转）

### 模型修复

- 更新 axolotl 系列模型为正确骨骼层级结构（腿/脚/尾节独立子骨骼）
- 更新 snow_fox_2/3 模型为正确骨骼层级结构

### Bug 修复

- 修复 `PlayerClipAtLedgeMixin` 适配 1.21.1 API 重构
- 修复 feral 形态披风角度异常
- 修复 `undead_group` power 类型（`origins:entity_group` → `apoli:modify_type_tag`）

### 移除

- PAL 依赖（`com.zigythebird.playeranim`）
- 80 个独立的 PAL 源动画文件（已合并为 GeckoLib 格式 `form_animations.animation.json`）

### 已知问题

- 动画切换存在 1 帧缓存延迟（首次播放闪一下原版姿态）
- 动画过渡（fade）暂未复刻，当前为硬切换

## 1.9.2-dev.17+mc.1.21.1

**1.21.1 配方/进度兼容性修复。**

### 兼容性修复

- 修复 1.21.1 配方/进度目录名及 advancement JSON 格式适配
- 统一版本号命名规范

## 1.9.2-dev.16+mc.1.21.1

**渲染引擎迁移：AzureLib → GeckoLib 4.8.4。**

### 引擎迁移

- 所有形态模型由 AzureLib 迁移至 GeckoLib 4.8.4
- 动画系统仍由 PAL 驱动，GeckoLib 仅负责模型加载与渲染
- 优化 CI/CD workflow 流程
- Cloth Config 兼容性修复

## v1.9.2-dev+build.15

**功能冻结版，多项功能完善与修复。**

### 功能完善

- PAL 迁移完成（PlayerAnimator → PAL 1.1.4）
- 35 种缓动曲线按动画类别分发
- Axolotl 2/3 爬行动画 skipFade 跳过过渡，解决右臂翻转
- EMF 暂停 + FPM 兼容
- 调色菜单实体渲染修复 + 背景模糊修复
- 尾巴链骨权重衰减 + 插值平滑
- 上游合并（新形态变形系统 / Skin / Flag 系统）

## v1.9.2-dev+build.13-hotfix

**紧急修复：配件系统闪退问题。**

### 修复

- 修复未安装 Trinkets 时因 `NoClassDefFoundError` 导致游戏崩溃（AccessoryItem 不再继承 TrinketItem）

### 恢复

- TrinketSlotMixin 恢复（由 MixinConfigPlugin 保护，仅 Trinkets 安装时加载）

## v1.9.2-dev+build.13

**多项 API 兼容性修复，上游合并。**

### Bug 修复

- 护甲限制正确阻止非形态缩放阶段的装备穿戴
- Trinkets 可通过右键和背包快捷装备
- 锻造台配方正确加载
- 配方 JSON 格式更新适配 1.21.1
- Power 类型命名空间迁移（`origins:` → `apoli:`）
- 合并上游 master（模型重映射、统一 Criterion 类）

### 已知问题

- 打包 Jar 内数据包 Tag 加载异常，护甲使用硬编码物品 ID 作为临时方案

## v1.9.2-dev+build.12

**配方修复，基本功能恢复。**

### 配方与功能恢复

- 绕过数据包加载修复配方失效
- 基本游戏功能恢复完毕

## v1.9.2-dev+build.10

**破坏性更新：移除内嵌的 AzureLib 与 PlayerAnimator。**

### 依赖重构

- 基于 SSC 官方仓库 eb60649 commit
- 移除内嵌的 AzureLib 3.0.19 和 PlayerAnimator 1.0.2，改为外部依赖
- PlayerAnimator 已支持 2.x 版本

## build.1 ~ build.6 版本存档

首个 Unofficial Port 构建版本。

### 初始移植

- 库独立拆分，项目重组
- build.6 以前的包仅作为存档，不推荐使用
- CurseForge / Modrinth / MC百科 链接稍后更新
