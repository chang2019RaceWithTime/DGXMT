import ast
import os
from pathlib import Path
from flask import Flask, request, abort
from werkzeug.utils import secure_filename
import requests
import pandas as pd
from datetime import datetime
import hashlib
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
def flitter(n):
    data=True
    a=list()
    for i in range(30):
        a.append(str(i))
    if n in a:
        data=False
    return data
DATA_DIR = Path(os.environ.get("DGXMT_DATA_DIR", Path(__file__).resolve().parent / "data"))


def configured(name):
    value = os.environ.get(name)
    if not value:
        abort(503, description=f"Missing configuration: {name}")
    return value


def local_data(filename):
    path = DATA_DIR / filename
    if not path.is_file():
        abort(503, description=f"Missing data file: {filename}")
    return path


def send_email(notes):
    host = configured("DGXMT_SMTP_HOST")
    sender = configured("DGXMT_SMTP_USER")
    recipient = configured("DGXMT_MAIL_TO")
    password = configured("DGXMT_SMTP_PASSWORD")
    message = MIMEMultipart("related")
    message.attach(MIMEText(notes, "plain", "utf-8"))
    message["From"] = sender
    message["To"] = recipient
    message["Subject"] = "建议"
    port = int(os.environ.get("DGXMT_SMTP_PORT", "465"))
    with smtplib.SMTP_SSL(host, port, timeout=15) as client:
        client.login(sender, password)
        client.sendmail(sender, [item.strip() for item in recipient.split(",")], message.as_string())


def pandas(df,dt):
    df_isnull = df.isnull()
    a = list()
    week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    for index in range(5):
        for day in range(7):
            if df_isnull.loc[index, week[day]] == False:
                data = dict()
                data['week'] = day + 1
                data['rank'] = index + 1
                ban = df.loc[index, week[day]]
                res1 = filter(flitter, list(ban))
                res2 = list(res1)
                res3 = ''.join(res2)
                res4 = res3.replace('(周)', '').replace('-', '').replace(' ', '').replace(',','')
                data['class']=res4
                print(data['class'])
                l = dt.loc[dt['课程名称'] == data['class'],]
                l.index = range(len(l))
                place = str(l.loc[0, '地点']).split(',')[0]
                data['place']=place.replace('nan','')
                a.append(data)
    return_data = dict()
    return_data['data'] = a
    return return_data

def get_class(username,password,zc):
    ii=str(zc)
    ses = requests.session()
    hl = hashlib.md5()
    hl.update(password.encode(encoding='utf-8'))
    password_md5 = hl.hexdigest().swapcase()
    url = configured("DGXMT_JW_LOGIN_URL").format(username=username, password_md5=password_md5)
    ses.get(url=url, timeout=1000)  # ses已经获得了cookies
    cookies = ses.cookies.get_dict()  # 获得临时的cookies
    cookies = str(cookies).replace("{", '').replace("'", '').replace(":", '=').replace('}', '').replace(",", ";")
    cookies = cookies.replace(" ", '')
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36",
        "Cookie": cookies,

    }
    url2 = configured("DGXMT_JW_TIMETABLE_URL")
    url_kbweek = url2.format(week=ii)
    a = requests.get(url_kbweek, headers=headers)
    kbtable = pd.read_html(a.text)[0]
    dt=pd.read_html(a.text)[1]
    zzz = pandas(kbtable,dt)
    print(zzz)
    return zzz
def get_grades(username,password):
    ses = requests.session()
    hl = hashlib.md5()
    hl.update(password.encode(encoding='utf-8'))
    password_md5 = hl.hexdigest().swapcase()
    url = configured("DGXMT_JW_LOGIN_URL").format(username=username, password_md5=password_md5)
    ses.get(url=url, timeout=1000)  # ses已经获得了cookies
    cookies = ses.cookies.get_dict()  # 获得临时的cookies
    cookies = str(cookies).replace("{", '').replace("'", '').replace(":", '=').replace('}', '').replace(",", ";")
    cookies = cookies.replace(" ", '')
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36",
        "Cookie": cookies,

    }
    a = requests.get(configured("DGXMT_JW_GRADES_URL"), headers=headers, timeout=15)
    grades = pd.read_html(a.text)[0]
    a = list()
    for i in range(len(grades)):
        data = dict()
        data['name'] = grades.loc[i, '课程名称']
        data['number'] = grades.loc[i, '成绩']
        data['xuefen'] = grades.loc[i, '学分']
        data['shuxing'] = grades.loc[i, '课程属性']
        a.append(data)
    return_data=dict()
    return_data['data']=a
    return return_data
def get_exam(username,password):
    ses = requests.session()
    hl = hashlib.md5()
    hl.update(password.encode(encoding='utf-8'))
    password_md5 = hl.hexdigest().swapcase()
    url = configured("DGXMT_JW_LOGIN_URL").format(username=username, password_md5=password_md5)
    ses.get(url=url, timeout=1000)  # ses已经获得了cookies
    cookies = ses.cookies.get_dict()  # 获得临时的cookies
    cookies = str(cookies).replace("{", '').replace("'", '').replace(":", '=').replace('}', '').replace(",", ";")
    cookies = cookies.replace(" ", '')
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36",
        "Cookie": cookies,

    }
    a = requests.get(configured("DGXMT_JW_EXAM_URL"), headers=headers, timeout=15)
    exam = pd.read_html(a.text)[0]
    a = list()
    for i in range(len(exam)):
        data = dict()
        data['name'] = exam.loc[i, '课程名称']
        data['time'] = exam.loc[i, '考试时间']
        data['kaochang'] = exam.loc[i, '考场']
        data['zuoweihao'] = exam.loc[i, '座位号']
        a.append(data)
    return_data=dict()
    return_data['data']=a
    return return_data
def get_excel():
    a=list()
    df = pd.read_excel(local_data("采编会.xlsx"))
    for i in range(len(df)):
        data=dict()
        data['zhuti'] = df.loc[i,'主题']
        data['neirong'] = df.loc[i, '内容']
        data['shijian'] = df.loc[i, '时间']
        data['renyuan'] = df.loc[i, '人员安排']
        a.append(data)
    return_data=dict()
    return_data['data']=a
    return  return_data




app = Flask(__name__)
app.config['JSON_AS_ASCII'] =False
@app.route('/')
def hello_world():
    return 'helloword'


@app.route('/kbtable', methods=['POST'])
def kbtable():
    name=request.form['name']
    password=request.form.get('password')
    zc=request.form.get('zc')
    kb_tody=get_class(name,password,zc)
    return kb_tody
@app.route('/grades', methods=['POST'])
def grades():
    name=request.form['name']
    password=request.form.get('password')
    grades=get_grades(name,password)
    return grades
@app.route('/exam', methods=['POST'])
def exam():
    name=request.form['name']
    password=request.form.get('password')
    exam=get_exam(name,password)
    return exam
@app.route('/excel', methods=['POST'])
def excel():
    excel=get_excel()
    return excel
@app.route('/upload', methods=['POST'])
def upload():
    f = request.files['file']
    name = request.form['name']
    number = request.form["number"]
    data = secure_filename(name + number) + ".jpg"
    if data == ".jpg":
        abort(400)
    upload_dir = DATA_DIR / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    f.save(upload_dir / data)
    return '上传成功'
@app.route('/email', methods=['POST'])
def email():
    note = request.form['note']
    send_email(note)
    return '上传成功'
@app.route('/jiwang17', methods=['POST'])
def jiwang17():
    with local_data("17.txt").open(encoding="utf-8-sig") as f:
        a = f.read()
        b = ast.literal_eval(a)
    data=dict()
    data['data']=b
    return data
@app.route('/jiwang18', methods=['POST'])
def jiwang18():
    with local_data("18.txt").open(encoding="utf-8-sig") as f:
        a = f.read()
        b = ast.literal_eval(a)
    data=dict()
    data['data']=b
    return data
@app.route('/jiwang19', methods=['POST'])
def jiwang19():
    with local_data("19.txt").open(encoding="utf-8-sig") as f:
        a = f.read()
        b = ast.literal_eval(a)
    data=dict()
    data['data']=b
    return data
@app.route('/jiwang20', methods=['POST'])
def jiwang20():
    with local_data("20.txt").open(encoding="utf-8-sig") as f:
        a = f.read()
        b = ast.literal_eval(a)
    data=dict()
    data['data']=b
    return data
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000)

