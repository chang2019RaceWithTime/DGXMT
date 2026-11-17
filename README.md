# DGXMT 校园小程序

## 界面预览

![DGXMT 首页](docs/home-preview.jpg)

## 使用方法

### 微信小程序

1. 在 `miniprogram` 目录执行 `npm install`。
2. 用微信开发者工具导入仓库根目录，然后选择「工具 → 构建 npm」。
3. 点击「编译」打开模拟器。

联调时，在开发者工具中填写自己的 AppID，在 `miniprogram/utils/config.js` 中设置后端 HTTPS 地址和云环境。微信后台需登记对应的请求域名。使用云功能时，还需准备数据库、存储及 `login` 云函数。

### Python 后端

在仓库根目录执行：

```bash
python -m pip install -r requirements.txt
python app.py
```

浏览器访问 `http://127.0.0.1:5000/` 可检查服务是否启动。联调教务或邮件功能前，在运行后端的终端中设置对应的环境变量。

| 环境变量 | 用途 |
|---|---|
| `DGXMT_JW_LOGIN_URL` | 教务登录地址模板，包含 `{username}` 和 `{password_md5}` 占位符 |
| `DGXMT_JW_TIMETABLE_URL` | 课表查询地址模板，可包含 `{week}` 占位符 |
| `DGXMT_JW_GRADES_URL`、`DGXMT_JW_EXAM_URL` | 成绩及考试查询地址 |
| `DGXMT_SMTP_HOST`、`DGXMT_SMTP_PORT` | SMTP 服务地址和端口，端口默认 465 |
| `DGXMT_SMTP_USER`、`DGXMT_SMTP_PASSWORD`、`DGXMT_MAIL_TO` | 发件邮箱、授权码和收件地址 |
| `DGXMT_DATA_DIR` | 本地数据目录，默认使用仓库内的 `data/` |

使用采编表或年级通知时，将 `采编会.xlsx` 或 `17.txt` 至 `20.txt` 放入数据目录。联调教务功能时，填写可用的教务地址并确认页面格式与后端解析逻辑匹配。
