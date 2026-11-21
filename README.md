# 纸间 · Paperlog

用来整理读书笔记和日常思考的中文静态网站。支持按类型筛选，点击卡片可阅读正文。初始三篇文章均为示例，可以替换或删除。

## 写一篇笔记

在 [`journal.js`](./journal.js) 顶部的 `notes` 数组中复制一条记录。`type` 填 `reading`（读书笔记）或 `thinking`（思考手记），`date` 使用 `YYYY-MM-DD`；列表按日期从新到旧排列。

`title` 和 `intro` 分别是标题与摘要，`body` 数组中每个字符串显示为一段正文。`cover` 和 `author` 是封面上的短标题和署名，`theme` 可选 `mint`、`peach` 或 `violet`。无需修改页面模板或安装依赖。

## 预览与发布

本地直接用浏览器打开 `index.html` 即可预览。

在仓库的 [Settings → Pages](https://github.com/BATTERIA/Reading-and-Thinking/settings/pages) 中，将 **Source** 设为 **Deploy from a branch**，选择包含本站文件的分支和 **/ (root)**，然后保存。若选择 `main`，请先将本站修改合入该分支。以后向发布分支提交笔记后，GitHub Pages 会自动更新。

发布成功后访问：<https://batteria.github.io/Reading-and-Thinking/>。