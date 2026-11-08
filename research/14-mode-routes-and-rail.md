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

浏览器核对了火车与公交互斥展示、Five Ways 过滤、步行导航链接、过期日期空表与提示、班次选择、无页面脚本错误。原表工作日 08:15→08:23、Five Ways 08:19→08:23 等列与快照核对一致。此为功能验证，尚非真实用户评估。
