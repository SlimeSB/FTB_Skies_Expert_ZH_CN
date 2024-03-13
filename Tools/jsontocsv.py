import json
import pandas as pd

# 定义 JSON 文件路径
file_a_path = 'en_us1.3.3.json'
file_b_path = 'zh_cn1.3.3.json'

# 读取 A.json 和 B.json 文件
with open(file_a_path,'r',encoding='utf-8') as file_a:
    data_a = json.load(file_a)

with open(file_b_path,'r',encoding='utf-8') as file_b:
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
