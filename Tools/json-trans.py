import pandas as pd
import json
import numpy as np
import re
from configparser import ConfigParser

# 创建一个配置解析器
config = ConfigParser()
# 读取.ini文件
config.read('file_paths.ini')
# 获取New_en_us对应的路径
json_file = config.get('FILES', 'New_en_us')
# 从json_file中提取版本号
version = re.search(r'(\d+\.\d+\.\d+)', json_file).group(1)
# 创建新的文件名
new_json_file = f'zh_cn{version}.json'
# 设置csv_file和new_json_file的路径
csv_file = 'output.csv'

# 读取csv文件
df = pd.read_csv(csv_file)
df = df.fillna("")
# 将 DataFrame 的第一列和第二列转换为字典，用于查找和替换
replace_dict = df.set_index(df.columns[0])[df.columns[1]].to_dict()

# 读取json文件
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 遍历json数据的每一个键值对
for key, value in data.items():
    # 如果值在 replace_dict 中，那么替换它
    if value in replace_dict:
        data[key] = replace_dict[value]

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
