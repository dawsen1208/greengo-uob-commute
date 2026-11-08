# 常用公交路线本地快照

获取日期：2026-11-08。样本运营日期：2026-11-08（周日）、2026-11-09（周一）。

| 线路 | 官方常规说明 | 本地方向站序 |
|---|---|---|
| X20 | Birmingham–Bromsgrove，途经 QE Hospital、Northfield、Longbridge、Rednal、Rubery、Catshill | 入城73站／出城71站 |
| X21 | Birmingham–Bartley Green，途经 Birmingham University、Selly Oak、Weoley Castle；部分周日延长到 Merry Hill | 入城83站／出城79站，含延长或短线的合并站序 |
| X22 | Birmingham–Bartley Green，途经 Birmingham University、California、Woodgate、Kitwell | 入城44站／出城42站 |

站数为保存的方向合并列表条数，不表示每个班次都停全部站点。方向分别获取，未简单反转。站名、站点ID、坐标、部分班次标志保存在 `dist/data/bus-routes.js`；没有保存或展示实时信息及街道几何。网站中的“完整站序”指保存列表的完整内容，不能代表全部日期、临时改道和所有分支均已覆盖。

原型支持本地切换 X20、X21、X22 和方向，选择上下车站，检查上下车顺序，并将下车站衔接至所选教学楼的外部步行导航。线路选择保存在当前浏览器，可在重新打开时恢复。

TransportAPI 请求：本次0次；展示、展开站序、切换线路和方向均0次。仅首次页面加载读取项目自身的静态文件。点击运营商链接会打开外部网页，不消耗本项目 TransportAPI 额度。

## 来源与获取方法

官方页面：
- https://nxbus.co.uk/west-midlands/services-timetables/x20-birmingham-bromsgrove
- https://westmidlandsbus.co.uk/west-midlands/services-timetables/x21-birmingham-bartley-green
- https://westmidlandsbus.co.uk/west-midlands/services-timetables/x22-birmingham-bartley-green

官方嵌入页面：https://timetables-embed.nxbus.co.uk/BCAX020_BCAX021_BCAX022

使用该页面公开调用的 `route/getByPrivateCode` 和 `timetable/getByRoute`，主机 `nxbus-embed-api.utrackapps.com/tts-nxbus/api/`。保留 `masters.stops` 的事实性站点字段，按站点ID序列去重，舍弃班次时间和其他内容。此公开端点并非 GreenGo 可依赖的稳定 API 合约；原型运行时不访问它。线路有变时需人工核对并重新生成快照。
