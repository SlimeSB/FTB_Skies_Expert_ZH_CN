#在json文件中查找具有“\\\"clickEvent\\\"”键值对，并将其写入“代码合并.json”
import json
import os

# 指定JSON文件的路径
json_file_path = "D:/translate-project/FTB_Skies_Expert_ZH_CN/Package/kubejs/assets/ftbquests/lang/zh_cn.json"

# 指定输出文件的路径
output_file_path = "D:/translate-project/FTB_Skies_Expert_ZH_CN/FTBQ_lang/代码合并.json"

# 读取JSON文件
with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

# 查找具有 "\\\"clickEvent\\\"" 的键值对
click_event_data = {}
for key, value in data.items():
    if "\\\"clickEvent\\\"" in str(value) or "reward_tables" in key:
        click_event_data[key] = value

# 将点击事件数据写入输出文件
with open(output_file_path, "w", encoding="utf-8") as output_file:
    json.dump(click_event_data, output_file, ensure_ascii=False, indent=4)
    output_file.write('\n')