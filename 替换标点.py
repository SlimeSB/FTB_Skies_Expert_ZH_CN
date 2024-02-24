import json
import os

# 英文标点符号和中文标点符号的映射
punctuation_mapping = {
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
            for eng, chn in punctuation_mapping.items():
                value = value.replace(eng, chn)
            json_obj[key] = value
        elif isinstance(value, dict):
            convert_punctuation_in_values(value)
        elif isinstance(value, list):
            for i in range(len(value)):
                if isinstance(value[i], str):
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
                json.dump(converted_obj, f, ensure_ascii=False)

# 测试
directory = "C:/Users/Administrator/Desktop/新建文件夹 (3)"
convert_files_in_directory(directory)
