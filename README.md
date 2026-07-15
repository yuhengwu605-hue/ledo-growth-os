[README_Ledo_Growth_OS.md](https://github.com/user-attachments/files/30030685/README_Ledo_Growth_OS.md)
# Frontend

Sprint0 frontend foundation for Ledo Growth OS.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm format:check
```

## Active Scope
# Ledo Growth OS

> AI Marketing Operating System Prototype for Automotive Sales Teams

## 项目简介

Ledo Growth
OS（乐道增长系统）是一套面向汽车销售顾问、区域营销团队和企业总部的 AI
营销操作系统产品原型（Prototype）。

本项目围绕汽车营销全流程设计，覆盖
**销售人设、客户画像、内容生产、营销方案、增长分析、总部运营**
六大核心能力，验证 AI 在汽车营销业务中的应用价值。

**在线 Demo：**

https://frontend-eight-hazel-zr0e7o02xl.vercel.app/

------------------------------------------------------------------------

## 项目背景

当前汽车销售普遍存在：

-   内容创作效率低
-   营销经验难复制
-   缺乏数据驱动运营
-   总部策略难快速落地

Ledo Growth OS 希望构建一个 AI Marketing Operating System，将 AI
能力嵌入汽车营销工作流，实现：

**总部策略 → AI分析 → 内容生成 → 销售执行 → 数据复盘 → 持续优化**

------------------------------------------------------------------------

## 核心功能

-   AI 销售人设
-   客户画像生成
-   内容工厂（AI Content Factory）
-   营销方案生成器
-   增长大脑（Growth Brain）
-   AI 营销仪表盘
-   总部后台
-   深色 / 浅色主题切换

------------------------------------------------------------------------

## 技术方案

当前版本定位为 **产品原型（Prototype）**：

-   前端：React / Next.js（Demo）
-   AI 架构：AI Service Layer
-   Prompt：基于 GPT 工作流设计
-   数据：Mock Data
-   部署：Vercel

> 当前 Demo 使用模拟数据验证业务流程，未接入真实企业 CRM
> 或大模型推理服务。未来可接入 OpenAI、DeepSeek 等模型及企业业务系统。

------------------------------------------------------------------------

## 项目亮点

-   面向汽车行业的 AI 营销操作系统
-   覆盖完整营销业务闭环
-   企业级 SaaS 产品界面
-   易于扩展至真实商业化系统

------------------------------------------------------------------------

## 未来规划

1.  接入真实大语言模型
2.  接入企业 CRM
3.  建立汽车行业知识库
4.  构建 AI 营销 SaaS 平台

------------------------------------------------------------------------

## 作者

个人参赛作品（企业命题赛）

项目创意：吴宇恒

产品设计：吴宇恒

AI 原型开发：Codex + ChatGPT + Prompt Engineering

Demo：

https://frontend-eight-hazel-zr0e7o02xl.vercel.app/

This frontend currently contains the application frame only:

- Layout shell
- Sidebar
- Navbar
- Theme provider
- Dark/light theme tokens
- shadcn/ui-compatible Button and Card primitives
- Placeholder route surfaces

Business modules are reserved for later sprints.
