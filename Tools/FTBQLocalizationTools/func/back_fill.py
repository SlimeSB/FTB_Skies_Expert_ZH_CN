from func.base import *


def get_lang(input_path: Path) -> dict:
    with open(input_path, 'r', encoding="utf-8") as fin:
        lang = fin.read()
        try:
            lang = json.loads(lang)  # 转化为json格式并读取
            return lang
        except TypeError:
            print(TextStyle.RED, 'lang文件读取出错，可能是所读取的json文件格式错误或其它问题！', TextStyle.RESET)


def dict_replace(text, dic):
    for key, value in dic.items():
        text = text.replace('{' + key + '}', str(value))
    return text


def fill_back_file(lang: dict, input_path: Path, output_path: Path):
    print('读取成功，正在回填lang文件:', TextStyle.LIGHT_YELLOW, input_path, TextStyle.RESET)

    with open(input_path, 'r', encoding="utf-8") as fin:
        quest = fin.read()
        with open(output_path, 'w', encoding="utf-8") as fout:
            fout.write(dict_replace(quest, lang))


def make_output_path(path: Path) -> Path:
    """
    生成输出目录，为原文件夹+back
    :param path:输入目录路径
    :return:自动生成的输出目录路径
    """
    # 将输入路径转换为字符串
    path_str = str(path)
    # 分割路径
    parts = path_str.split(os.sep)
    # 找到"quests"部分的索引
    quests_indices = [i for i, part in enumerate(parts) if part == "quests"]
    if not quests_indices:
        raise ValueError(f"路径中未包含quests文件夹：{path}")
    quests_index = quests_indices[0]
    # 在"quests"后添加"-back"
    parts[quests_index] = parts[quests_index] + "-back"
    # 重新组合路径
    new_path_str = os.sep.join(parts)
    # 将新路径字符串转换回Path对象
    output_path = Path(new_path_str)
    # 创建对应的目录
    output_path.parent.mkdir(parents=True, exist_ok=True)
    return output_path


def back_fill():
    get_config()
    BACK_FILL_PATH = global_var.get_value('BACK_FILL_PATH')
    BACK_FILL_LANG_PATH = global_var.get_value('BACK_FILL_LANG_PATH')
    file_path = Path(BACK_FILL_PATH)  # 要回填的任务目录
    lang_path = Path(BACK_FILL_LANG_PATH)  # 要回填的lang文件地址
    lang = get_lang(lang_path)
    for input_path in file_path.rglob("*.snbt"):
        output_path = make_output_path(input_path)  # 生成输出目录路径
        fill_back_file(lang, input_path, output_path)
    print(TextStyle.CYAN, "你可以在zh_cn.json的同级目录下的-back文件夹中找到回填后的snbt文件.", TextStyle.RESET)
    print("************lang文件回填完成************")
