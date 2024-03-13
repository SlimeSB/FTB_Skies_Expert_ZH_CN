import pandas as pd
import json
import numpy as np

# 定义文件名
csv_file = 'C:/Users/Administrator/Desktop/TEMP/output.csv'
json_file = 'C:/Users/Administrator/Desktop/TEMP/en_us1.4.json'
new_json_file = 'C:/Users/Administrator/Desktop/TEMP/zh_cn1.4.json'

# 读取csv文件
df = pd.read_csv(csv_file)

# 添加一个新列，表示每行查找字符串的长度
df['length'] = df.iloc[:, 0].str.len()

# 按照字符串长度从长到短排序
df = df.sort_values('length', ascending=False)

# 读取json文件
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 遍历csv文件的每一行
for index, row in df.iterrows():
    # 查找字符串
    find_str = str(row[0])
    # 替换字符串
    replace_str = str(row[1]) if pd.notnull(row[1]) else find_str

    # 在json数据中查找并替换字符串
    data_str = json.dumps(data)
    # 使用字符串的replace方法进行替换
    data_str = data_str.replace(find_str, replace_str)
    data = json.loads(data_str)

# 将修改后的json数据写入新的文件，添加缩进，保留非ASCII字符
with open(new_json_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
