
# num = 200

# def test_1():
#     print(f"test_1: {num}")


# def test_2():
#     """
#     这里的num又会变成局部变量
#     """
#     num = 500
#     print(f"test_2: {num}")

# test_1()
# test_2()
# print(f"最后输出:{num}")

# golbal关键字定义全局变量
num = 200
def test_a():
    print(f"test_1: {num}")


def test_b():
    global num
    num = 500
    print(f"test_2: {num}")

test_a()
test_b()
print(f"最后输出:{num}")


