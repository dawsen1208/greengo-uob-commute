# GreenGo：第5周桌面研究与现有方案评审

方向更新v0.2：以“课表→校外通勤→校园步行→具体教室”的完整任务为主，见 `04-revised-project-brief.md`。原有文献支持通勤研究背景，不能直接证明跨应用切换是问题或证明整合方案有效。新增研究重点：课程地点如何解释、在哪些阶段切换信息源、重复输入和错误的实际后果。竞品T1–T4可保留为子任务，但应增加课表和教室确认环节。

版本：0.1；检索日期：2026-10-31。用途：课程探索性设计研究，不是系统综述。以下未包含本组问卷或访谈结果。

## 研究范围与问题

目标用户：需要从校外住处前往 University of Birmingham Edgbaston 校区的成年学生，包含不同交通方式、不同校园熟悉程度的学生。不要只招募现有原型偏好的公交／火车用户。

研究问题：RQ1 学生目前如何安排从住处到具体教学楼的通勤？RQ2 如何决定出发时间及处理不确定性？RQ3 校外与校内信息衔接有什么困难？RQ4 哪些条件影响其选择较低碳方式？RQ5 现有工具已解决什么、仍有哪些未满足需求？

## 检索记录与局限

检索词包括 university student commuting sustainable transport barriers、departure time choice travel time reliability、student campus participation transport，以及 Google Maps / University of Birmingham / TfWM / National Rail 官方功能说明。学术来源优先期刊出版页和大学机构库；产品能力优先官方帮助页。

本轮是有限范围的初步检索，未进行数据库全覆盖、双人筛选或质量评分。不同国家、大学、年份及研究方法不能直接等同于伯明翰学生。未访问到全文的文章仅作为摘要级线索，不引用未核验的结果或因果结论。最终报告中需按课程要求统一引用格式，并补齐作者、年份、DOI等信息。

## 证据摘要与设计启示

### S1：学生通勤与可持续出行

Roknaldin, A., Kruke, L., Qiao, A., John, R. S. & von Winterfeldt, D. (2025). *Reducing carbon emissions from student commuting in higher education*. Environment Systems and Decisions, 45, article 5. Online publication 31 December 2024. https://doi.org/10.1007/s10669-024-09996-5

核验层级：开放获取出版页及摘要、部分正文。研究结合文献回顾、大学可持续交通方案和 USC 研究生焦点小组。摘要指出时间、安全与便利性可能压过采用替代方式的动机，并强调理解学生选择原因。限制：不属于伯明翰样本，不能证明碳排反馈能改变本地学生行为。

本组推论：先了解可行性障碍，再考虑环保激励；不应把不选择步行理解为缺乏环保意识。对应问卷 Q6、Q11、Q13、Q14。

### S2：出发时间与可靠性

Noland, R. B. & Small, K. A. (1995). *Travel-Time Uncertainty, Departure Time Choice, and the Cost of the Morning Commute*. UC Irvine Institute of Transportation Studies Working Paper Series. https://escholarship.org/uc/item/5417r5t2

核验层级：机构库元数据与摘要。该研究通过模型分析不确定通勤时间、提前出发余量以及早到／迟到成本。限制：理论模型及早期通勤背景，不是当前英国学生实验。

本组推论：问“如何决定出发时间”和“通常预留多少余量”，而非仅问最快路线；研究是否需要可解释缓冲，不宣称固定10分钟最佳。对应 Q7–Q10。

### S3：学生通勤方式转换（待全文核验线索）

*Students’ home-university commuting patterns: A shift towards more sustainable modes of transport* (2022). Publication page: https://www.sciencedirect.com/science/article/pii/S2213624X2200061X

核验层级：检索返回的出版方摘要信息；本次全文页请求受限。摘要描述葡萄牙 Minho 大学686名学生的问卷及两种方式转换情境。不能将样本量、情境估算或环境收益转写为本项目结果，也不据此估计伯明翰减排量。作者、卷期、DOI待图书馆全文核验。

本组推论：比较实际方式和在不同条件下愿意考虑的方式，区分意愿与实际转换。对应 Q5、Q6、Q14。

### S4：通勤与校园参与（待全文核验线索）

*How time-use and transportation barriers limit on-campus participation of university students*. Publication page: https://www.sciencedirect.com/science/article/pii/S2214367X18300267

核验层级：出版方检索摘要；正文访问受限。摘要描述 Greater Toronto Area 七个校区的2015年学生出行调查，并研究通勤与课程选择、校园活动参与等关系。本轮不报告统计效应或因果结果；作者、年份及书目信息需进一步核验。

本组推论：研究困难的后果，不局限于迟到，可在访谈追问是否影响选课和参加活动。对应 Q12 和访谈追问。

## 现有方案：基于文档的初评

这是功能范围评审，不是已执行的可用性测试；“待验证”不等于“不支持”。

| 方案与官方来源 | 官方描述的能力 | 与本项目的关系／待测试点 |
|---|---|---|
| Google Maps：https://support.google.com/maps/answer/144339?hl=en | 多种出行方式路线与替代路线；当地公共交通可用性取决于运营商信息 | 已覆盖大量跨城通勤任务。需实测建筑入口匹配、不同工具切换、出发余量理解，不能宣称它只能导航到大学站 |
| UoB Campus Map：https://www.birmingham.ac.uk/contact/campus-map | 建筑间导航、学习空间、服务开放信息和实时出行信息；另链接 AccessAble 建筑无障碍资料 | 与项目高度重叠，是核心比较对象。潜在差异必须靠任务测试证实，不能把“校园导航”本身当作创新 |
| TfWM：https://www.tfwm.org.uk/plan-your-journey/ | 区域公共交通行程规划 | 测试从住处到校园的跨方式规划及最后一段步行信息。我们调用API失败不代表其面向乘客的规划器不可用 |
| National Rail：https://www.nationalrail.co.uk/help-and-assistance/how-to-use-live-departures-and-arrivals/ | 实时到发、途经站点、晚点及服务中断信息 | 适合铁路运行核验；与具体教室入口和公交衔接的体验需实测。不能因范围不同就给低分 |

## 一致任务评审协议（待执行）

T1：从一个公共地点出发，在指定工作日09:50前到 Arts Building R16，记录工具如何识别目的地与步行段。

T2：从 University Station 到 Computer Science Y9，比较入口、方向指示和距离／时间依据。

T3：出发前发现班次异常，找到确认异常及替代方案的途径。无真实异常时使用明确标注的研究情境，不声称发生了实际取消。

T4：查询有无台阶或建筑入口资料，记录来源与缺失信息；未核验时不得评为“可无障碍通行”。

每个工具记录：版本/设备/日期、输入地点和日期、操作步骤、是否完成、实际用时、错误或帮助、截图编号、来源标签、研究者解释。功能不适用填N/A；没测填“未测试”。可用性主张必须有观察支持。

| 工具 | 任务 | 是否完成 | 时间 | 操作／问题 | 截图 | 证据或推论 |
|---|---|---|---|---|---|---|
| 待填写 | T1–T4 | 未测试 | — | — | — | — |

## 当前假设，不是结论

H1：学生可能在城市通勤和校园找楼之间切换多个工具。
H2：部分学生可能更在意到达可靠性而非最短耗时。
H3：环保信息可能只有在费用、时间和安全可接受时才影响选择。
H4：部分学生可能已被现有工具充分支持，不需要新应用。

设计机会暂定：解释从住处到建筑的完整到达计划，清楚表达信息新鲜度与不确定性。是否需要独立应用、是否需要提醒，应由第6周研究决定。
