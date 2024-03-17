import os
from configparser import ConfigParser

# 文件路径列表
file_paths = []

print("请依次拖入新旧版本语言文件。")

# 提示用户输入文件路径
for i in range(3):
    if i == 0:
        print("请拖入旧版本英语语言文件。")
    elif i == 1:
        print("请拖入旧版本中文语言文件。")
    elif i == 2:
        print("请拖入新版本英语文件。")

    file_path = input(f"请输入第{i+1}个文件的路径：")
    if os.path.isfile(file_path):
        file_paths.append(file_path)
    else:
        print("文件路径无效，请重新输入。")
        i -= 1

# 保存文件路径到.ini文件
config = ConfigParser()
config['FILES'] = {'Old_en_us': file_paths[0],
                   'Old_zh_cn': file_paths[1],
                   'New_en_us': file_paths[2]}
with open('file_paths.ini', 'w') as configfile:
    config.write(configfile)

print("文件路径已保存到file_paths.ini文件。")

# 确认或取消
confirmation = input("是否启动更新程序？(Y/N): ")
if confirmation.lower() == "y":
    # 执行jsontocsv.py
    os.system("python jsontocsv.py")
    # 执行json-trans.py
    os.system("python json-trans.py")
else:
    print("操作已取消。")