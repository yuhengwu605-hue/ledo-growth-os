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
<img width="1267" height="701" alt="屏幕截图 2026-07-15 091043" src="https://github.com/user-attachments/assets/fa7ec7ac-ab3f-4a78-9222-c291ba106525" />
<img width="1266" height="701" alt="屏幕截图 2026-07-15 091031" src="https://github.com/user-attachments/assets/e986a578-5ce5-488a-9129-d3e8f9499fa2" />
<img width="1270" height="699" alt="屏幕截图 2026-07-15 091017" src="https://github.com/user-attachments/assets/7fd3840a-7f54-4ef5-91ed-cbca1ff8e957" />
<img width="1273" height="702" alt="屏幕截图 2026-07-15 091003" src="https://github.com/user-attachments/assets/53424782-ab67-4cf5-863a-11d053539c7e" />
<img width="1259" height="700" alt="屏幕截图 2026-07-15 091321" src="https://github.com/user-attachments/assets/f5ad97b9-8930-4f82-9cc4-22e3590b9a77" />
<img width="1270" height="700" alt="屏幕截图 2026-07-15 091306" src="https://github.com/user-attachments/assets/210c1940-bcc5-45b1-bef3-60eb1ea771a9" />
<img width="1264" height="700" alt="屏幕截图 2026-07-15 091248" src="https://github.com/user-attachments/assets/be58f240-3f00-4a21-a502-7912b137315a" />
<img width="1260" height="700" alt="屏幕截图 2026-07-15 091239" src="https://github.com/user-attachments/assets/54940b92-620f-4eb9-b0b3-114bc29b3733" />
<img width="1265" height="702" alt="屏幕截图 2026-07-15 091232" src="https://github.com/user-attachments/assets/46dfc831-2087-48f2-a68d-6d399b619709" />
<img width="1262" height="701" alt="屏幕截图 2026-07-15 091216" src="https://github.com/user-attachments/assets/eba88cea-0495-4580-ad77-2271a9745628" />
<img width="1259" height="697" alt="屏幕截图 2026-07-15 091208" src="https://github.com/user-attachments/assets/12fc9c8a-df37-4234-9886-2403350ad272" />
<img width="1271" height="703" alt="屏幕截图 2026-07-15 091200" src="https://github.com/user-attachments/assets/205a5f36-6606-4c9c-bd5c-9f5ba5040fe4" />
<img width="1265" height="705" alt="屏幕截图 2026-07-15 091147" src="https://github.com/user-attachments/assets/7b9776ea-8a54-4176-8779-b4022fea4241" />
<img width="1267" height="698" alt="屏幕截图 2026-07-15 091136" src="https://github.com/user-attachments/assets/169093f0-b054-451e-8e75-b604cf306f6c" />
<img width="1268" height="701" alt="屏幕截图 2026-07-15 091126" src="https://github.com/user-attachments/assets/9378bdc3-6f38-4f68-940a-245baaf67801" />
<img width="1271" height="698" alt="屏幕截图 2026-07-15 091110" src="https://github.com/user-attachments/assets/f9c81bb3-e36a-471e-afb2-d84289a94644" />
<img width="1267" height="701" alt="屏幕截图 2026-07-15 091053" src="https://github.com/user-attachments/assets/c596133f-296b-49d3-bf13-73e4cd6f23b5" />

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
