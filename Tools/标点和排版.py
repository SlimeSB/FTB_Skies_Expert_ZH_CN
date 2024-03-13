# 自动查找同一目录json
import json
import os
import re

# 英文标点符号和中文标点符号的映射
punctuation_mapping = {
    "...": "…",
    ",": "，",
    ".": "。",
    "?": "？",
    "!": "！",
    ":": "：",
    ";": "；",
    "(": "（",
    ")": "）"
}

def convert_punctuation_in_values(json_obj):
    for key, value in json_obj.items():
        if isinstance(value, str):
            # 如果字符串中存在反斜杠，就跳过这一行
            if "\\" not in value:
                for eng, chn in punctuation_mapping.items():
                    value = value.replace(eng, chn)
                json_obj[key] = value
        elif isinstance(value, dict):
            convert_punctuation_in_values(value)
        elif isinstance(value, list):
            for i in range(len(value)):
                if isinstance(value[i], str):
                    # 如果字符串中存在反斜杠，就跳过这一行
                    if "\\" not in value[i]:
                        for eng, chn in punctuation_mapping.items():
                            value[i] = value[i].replace(eng, chn)
                elif isinstance(value[i], dict):
                    convert_punctuation_in_values(value[i])
    return json_obj

def convert_files_in_directory(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as f:
                json_obj = json.load(f)
            converted_obj = convert_punctuation_in_values(json_obj)
            with open(os.path.join(directory, filename), 'w', encoding='utf-8') as f:
                json.dump(converted_obj, f, ensure_ascii=False, indent=4)  # 添加 indent 参数

# 测试
directory = os.getcwd()
convert_files_in_directory(directory)
