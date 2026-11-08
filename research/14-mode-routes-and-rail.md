# 出行方式关联路线与火车时刻表

2026-11-08 更新。Travel & weather 的 Check route 根据已选方式展示主要内容：步行为直接导航；公交为原有 Saved bus routes 和 Bus stop map；火车为计划时刻表；公交＋火车同时保留两段。骑行及出租车仍保留原有衔接示意。

## 铁路数据

- 官方来源：Network Rail，National Rail Timetable，Table 070，London North West Route。
- 原表：https://sacuksprodnrdigital0001.blob.core.windows.net/electronic-national-rail-timetable/electronic%20National%20Rail%20Timetable/01.%20May%202026%20timetable%20documents/London%20North%20West%20Route/Table%20070.pdf
- 官方目录：https://www.networkrail.co.uk/industry-and-commercial/the-timetable/electronic-national-rail-timetable/
- 适用期：2026-05-17 至 2026-12-12；获取日期：2026-11-08。
- 仅提取向 University 方向、在 Birmingham New Street 和 University 均有时刻的列。Five Ways 路线进一步筛选该站有时刻的班次，因此不会把直达、跳站列车列入 Five Ways。
- 保存 108 条工作日、104 条周六、63 条周日记录。包括运营商代码、原表页码和注释代码；不含反向班次。University 原表部分为出发时间，作为到站参考，不是精确进站时间预测。
- `scripts/extract-rail.py` 从官方 PDF 按列提取；`dist/data/rail-timetable.js` 为前端本地快照。脚本依赖 pypdf；PDF 为本地研究留档，不随网页发布。
- 常规时刻并不保证具体日期运行。工程、节假日、特殊运行日期与临时变更须通过每行原表链接和 National Rail 核对；原表附注仍适用。
- 页面超出适用期不显示班次。切换站点、日期和时间不请求 TransportAPI；不自动更新、不轮询，也不声明实时站台、延误或取消信息。
- 选择班次只标记当前计划候选，不直接覆盖原型示例出发建议或宣称完成真实行程优化。

## 验证

### 日期与时间筛选补充

默认不限定时间，列出所选日期全天的保存班次。可在时刻表内直接选择日期（与通勤日期同步），并按上车站出发时间设置起止区间；只填开始或结束时间也可。支持“显示全天”清空时间条件。没有符合班次、未选日期、结束早于开始和超出快照适用期均提供提示。跨日需分别查询两个日期，不自动推断第二天。浏览器验证工作日 08:00–09:00 的筛选结果、周日同区间空结果、错误区间提示和重置后工作日首班 05:43；无脚本错误。所有筛选均为本地操作，不新增 API 请求。

浏览器核对了火车与公交互斥展示、Five Ways 过滤、步行导航链接、过期日期空表与提示、班次选择、无页面脚本错误。原表工作日 08:15→08:23、Five Ways 08:19→08:23 等列与快照核对一致。此为功能验证，尚非真实用户评估。
