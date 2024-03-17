import json
import pandas as pd
from configparser import ConfigParser

# 创建一个配置解析器
config = ConfigParser()

# 读取.ini文件
config.read('file_paths.ini')

# 获取Old_en_us和Old_zh_cn对应的路径
old_en_us_path = config.get('FILES', 'Old_en_us')
old_zh_cn_path = config.get('FILES', 'Old_zh_cn')

# 读取 A.json 和 B.json 文件
with open(old_en_us_path,'r',encoding='utf-8') as file_a:
    data_a = json.load(file_a)

with open(old_zh_cn_path,'r',encoding='utf-8') as file_b:
    data_b = json.load(file_b)

# 创建一个空的 DataFrame
df = pd.DataFrame(columns=['Key', 'A.json Value', 'B.json Value'])

# 遍历 A.json 和 B.json 的键
for key in set(data_a.keys()) | set(data_b.keys()):
    value_a = data_a.get(key, '')
    value_b = data_b.get(key, '')
    df = pd.concat([df, pd.DataFrame({'Key': [key], 'A.json Value': [value_a], 'B.json Value': [value_b]})], ignore_index=True)

# 提取非第一行和第一列
df = df.iloc[:, 1:]

# 将 DataFrame 保存为 CSV 文件
df.to_csv('output.csv', index=False, encoding='utf-8', header=False, quoting=1)

print("CSV 文件已生成：output.csv")
