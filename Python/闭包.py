def outer(num: int):

    def innerCount(num2: int):
        nonlocal num # nonlocal声明后可以修改外部函数变量的值
        num += num2
        print(f"{num}")

    return innerCount


fn = outer(1)
fn(2)
fn(3)
