## 一：对象模块。
### 一.初始化
1.对this.super,构造函数，构造代码块，静态代码块总结。
this：代表当前对象，也就是所在函数所属对象的引用。
this对象后面加.调用的是对象的成员变量和方法。（this.say()）;
this对象后面加()，调用的是本类中对应参数的构造函数。

super：代表父类，也就是当前类的父类。
使用方式与this类似。

构造函数：用于当对对象初始化时调用的特殊函数，只在执行一次。
在构造函数中使用this或者super，必须定义在构造函数的第一行。如果没有用到，那么构造函数的第一句会默认的加上super（）;
构造代码块：是给所有的对象进行初始化，也就是，所有的对象都会调用的一个代码块，只要对象一建，就会调用这个代码块，用于给不同对象的共性初始化，优先于构造函数执行。
格式：{
代码。。。。。。
}
静态代码块：一个用static关键字标示的一个代码块区域，定义在类中。可以完成类的初始化，静态代码块会随着类的加载而执行一次（new多个对象也是只执行一次）。如果和主函数在同一个类中，优先于主函数执行。
格式：static{
代码。。。。。
}
三种初始化的执行顺序: 静态代码块--->构造代码块------>构造函数。

## 二.继承(extends)：
### 1.重写和重载
重写：覆盖父类已有的方法，子父类方法必须一模一样。(包括返回值，子类复写父类方法时访问权限必须比父类大或者同级。方法要么都静态，要么都不静态)。
重载：只在本类中的多个方法，只看同名函数的参数列表。
子类初始化时，先初始化父类的方法和变量，在初始化自己的。
## 三.接口(implements)
### 1.实现
接口可以被多实现，类继承只能单继承。
接口与接口之间存在着继承关系，接口可以多继承接口。

## 四.多态
体现：父类或者接口的引用指向自己的子类对象。（注意：在使用多态时，要访问子类的方法，要求父类中必须对该方法进行了声明或者定义）。
多态在子父类中的成员上的体现的特点：
成员变量：
编译时期：参考的引用类型变量所属的类中是否有调用的成员。（编译时期不产生对象，只检查语法错误）。
运行时期：也是参考引用类型变量所属的类中是否有调用的成员。
简单总结：成员变量——编译运行都看 = 左边。

非静态成员函数：
编译时期：参考引用类型变量所属的类中是否有调用的方法。
运行时期：参考的是对象所属的类中是否有调用的方法。
原因：因为在子父类的非晶态成员函数中有一个特性：重写（覆盖）。
简单总结：成员函数——编译看 = 左边，  运行看 = 右边。 
静态函数：
编译时期：参考引用类型变量所属的类中是否有调用的方法。
运行时期：参考的是引用类型所属的类中是否有调用的方法。
原因：因为是静态方法，所以是不属于对象的，而是属于该方法所在的类。
简单总结：成员函数——编译运行看 = 左边，


## 五：内部类。
特点：内部类可以直接访问外部类中的成员，而外部类想要访问内部类，必须要建立内部类的对象。
```java
class Outer{
int num = 4;
class Inner {
void show(){
System.out.println("inner show run" + num);
}
}
public void method(){
Inner in = new Inner();//创建内部类的对象
in.show();//调用内部类的方法
}
```
当内部类定义在外部类的成员变量位置。可以使用一些成员修饰符进行修饰默认,private,static.

### 1.默认修饰符。
直接访问内部类格式：外部类名.内部类名 变量名 =  new 外部类对象.内部类对象；
Outer.Inner in = new Quter.new Inner();
上面这种方式比较少见，因为内部类本来就是为了封装，想要获取内部类对象通常都是通过外部类的方法来获取，这样可以对内部类对象进行控制。

### 2.private修饰符。
通常内部类被封装，都会被私有化。

### 3.静态修饰符。
如果内部类被静态修饰，相当于外部类，会出现访问局限性，只能访问外部类中的静态成员。

注意：如果内部类中定义了静态成员，那么该内部类必须是静态的。
     当外部类的静态方法访问内部类时，内部类也必须是静态的。
外部其他类中，直接访问static内部类的非静态成员：New Outer.Inner().show();
外部其他类中，直接访问static内部类的静态成员：Outer.Inner.show();

一般内部类经过编译后文件名为：“外部类名$内部类名.class”;

当内部类被定义在局部位置上时。
1.不可以被成员修饰符修饰（例如：static，static是修饰成员的）

2.可以访问外部类中成员，因为还持有外部类中的引用，（外部内.this）,但不可以访问它所在的局部中的变量，只能访问被final修饰的局部变量。

### 匿名内部类：
意义：没有名字的内部类，是内部类的简化形式，一般内部类只用一次的话就可以用这种形式。匿名内部类其实就是一个匿名子类对象，想要定义匿名内部类：需要前提，内部类必须实现一个接口或者继承一个类。
匿名内部类的格式：new 父类名&接口名（）{定义子类成员或者覆盖父类方法}.方法
case：
```java
new Object(){
void show(){
System.out.prinlt("show run");
}
} .show();
```
## 六：异常。
### 1、
使用throws来在方法上标识（声明），方法可能会出现异常，当调用者检查到有标识时有必须要进行处理，要么接着抛，要么try。否则会出现编译失败
声明格式：throws 异常类，异常类。。。。。并不是所有的异常都需要声明，RuntimeException（运行时异常）类及其子类可以不用声明。

### 2、
捕获异常try{}catch(){}块来捕捉时，要注意有多个catch时，如果有父类的Exception语句块，一定要放在下面.

### 3.throw用于抛出异常对象。

异常，在子父类进行覆盖时，有以下特点：
1.当子类覆盖父类的方法时，如果父类的方法抛出了异常，那么子类的方法要么不抛出异常，要么就抛出父类异常或者该异常的子类，不能抛出其他异常。如果父类没有抛出异常，那么子类只能try不能throws.
2.如果父类抛出了多个异常，那么子类在覆盖时只能抛出父类异常的子集。
3.如果这个异常子类无法处理，已经影响了子类方法的具体运算，这时可以在子类方法中，通过throw抛出RuntimeException异常或者其子类，这样，子类方法就不需要throws进行声明。
注意：throw下面不能写语句，因为执行不到（会出现编译错误，和return,break后面不能写代码类似），但是注意如果是分支结构，也就是说if语句内写是可以的。
## 七：多线程。
### 1.相关概念。
进程：正在进行中的程序，就是一个应用程序运行时的内存分配空间
线程：进程中一个程序的执行控制单元，一条执行路径。
进程负责的是应用程序的空间的标示，线程负责的是应用程序的执行顺序。

cpu随机性原理：因为cpu的快速切换造成，那个线程获取到了CPU的执行权，那个线程就执行。

### 2.线程的几种状态：
被创建：start()。
运行：具备执行资格，同时具备执行权。
冻结：sleep（time）,wait()-----notify()唤醒，线程冻结（沉睡），释放了执行权，同时释放了执行资格。
临时阻塞状态：线程具备cpu的执行资格，没有cpu的执行权。
消亡：stop();


### 3.两种线程的创建方式
#### 第一种方式：继承Thread,由子类复写run方法。
步骤：1.定义类继承Thread类。
2.目的是复写run方法，将要让线程运行的代码都存储到run方法中。
3.通过创建Thread类的子类对象，创建线程对象。
4.调用线程的start方法，开启线程，并执行run方法。

#### 第二种方式：实现一个Runable接口。
步骤：1.定义类实现Runnable接口。
2.覆盖接口中的run方法。（用于封装线程要运行的代码）。
3.通过Thread类创建线程对象。
4.将实现了Runnable接口的子类作为实际参数传递给Thread类中的构造函数。（为什么要这么做？是为了让线程对象明确要运行的run方法所属的对象）。
5.调用Thread对象的start方法。开启线程，并运行Runnable接口子类中的run方法。

一般情况推荐使用第二种方式，可以避免单继承。

### 4.线程安全问题
通过图可以发现一个线程在执行多条语句时，并运算同一个数据时，在执行过程中，其他线程参与进来，并操作了这个数据，那么会导致错误数据产生。
产生的两个因素：1.多条线程在操作共享数据。2.有多条语句对共享数据进行运算。
原因：这多条语句，在某一个时刻被一个线程执行是，还没执行完，cpu时间片到了，被其他线程执行了。

## 八：同步（锁）。
为了解决上面所说的线程安全问题而产生的技术，解决的思路就是：加同步，加锁，将要操作共享数据的语句在某一时段让一个线程执行完，在线程执行过程中，其他线程不能进来执行。

1.Java中提供了一个解决方式，就是同步代码块。也就是锁。
格式：
synchronized (对象){ //任意对象都可以，这个对象就是锁
//需要被同步的代码
}

定义同步的前提：
1.必须要有两个或者两个以上的线程，才需要同步。
2.多个线程必须保证使用的是同一个锁。

2.另一种表现形式就是同步函数：就是将同步关键字定义在函数上，让函数具备了同步性。
1.同步函数所使用的锁是this对象。
2.当同步函数被static修饰时，由于此时的函数是属于类的，这时可能还没有产生该类的对象，但是该类的字节码文件加载进了内存就已经被封装成了对象，所以此时的锁就是字节码文件对象，也就是类名.class对象。


3.关于同步代码块和同步函数的区别？
同步代码块使用的锁可以是任意对象。
同步函数使用的锁是this，静态同步函数的锁是该类的字节码文件对象。

4.死锁。多个同步进行嵌套导致，相互等待。
避免死锁：线程通信→等待唤醒机制，涉及的方法：
wait：将同步中的线程处理为冻结状态。释放了执行权，释放了资格。同时将线程对象存储到线程池中。
notify：唤醒线程池中某一个线程。
notifyAll：唤醒线程池中所有的线程。

注意：1.这些方法都需要定义在同步中。2.因为这些方法都必须要标示所属的锁。因为A锁上的wait只能，让A锁去唤醒notify。（A.wait()----->A.notify）。

wait和sleep区别：分析这两个方法。从执行权和锁角度来分析。
wait：可以指定时间，也可以不指定时间，如果不指定时间，只能由对应的notify或者notifyAll来唤醒。  线程会释放执行权，而且线程也会释放锁。
sleep：必须指定时间，时间到线程自动由冻结状态转为运行状态（或者临时阻塞状态）。  线程会释放执行权，但是不会释放锁。

## 九：字符串，字符容器。
1.关于字符串的方法就不过多提了，就简单的说下这里容易出错的几个概念。
字符串特点：字符串一旦被初始化，就不可以改变，存放在方法区的常量池中。只要出现了“ ”(双引号)的数据那么就是字符串对象。关于
这里简单说一下关于Java的内存分布：1：寄存器 2：本地方法区 （静态方法，常量）3：方法区  4：栈（局部变量）  5：堆（实体，就是对象和数组）。

2.字符容器：StringBuffer 和  StringBuilder。
StringBuffer特点:1.初始容量为16个字符。
2.可以对字符串内容进行修改。
3.可变长度。
4.缓存区中可以存储任意类型的数据。
5.最终需要变成字符串。
6.最重要的线程安全的。

StringBuilder：与buffer一模一样，只是它是线程不安全的。

总结：多线程操作，使用StringBuffer安全。单线程使用StringBuilder效率高。

## 十：集合框架：用于存储数据的容器。
特点：
1.对象封装数据，对象多了也需要存储。集合用于存储对象。
2.对象的个数确定可以使用数组，但不确定个数怎么办，可以使用集合，因为集合时可变长度

集合与数组的区别：
1.数组是固定长度：集合可变长度的。
2.数组可以存储基本数据类型，也可以存储引用数据类型。集合只能存储引用数据类型。
3.数组存储的元素必须是同一个数据类型；集合存储的对象可以是不同数据类型。


--< java.util >-- Collection接口：
Collection：
|--List：有序(元素存入集合的顺序和取出的顺序一致)，元素都有索引。元素可以重复。
|--Set：无序(存入和取出顺序有可能不一致)，不可以存储重复元素。必须保证元素唯一性。

--< java.util >-- Iterator接口：
迭代器：是一个接口。作用：用于取集合中的元素。
booleanhasNext() 如果仍有元素可以迭代，则返回 true。Enext() 返回迭代的下一个元素。voidremove() 从迭代器指向的 collection 中移除迭代器返回的最后一个元素（可选操作）。
每一个集合都有自己的数据结构，都有特定的取出自己内部元素的方式。为了便于操作所有的容器，取出元素。将容器内部的取出方式按照一个统一的规则向外提供，这个规则就是Iterator接口。
也就说，只要通过该接口就可以取出Collection集合中的元素，至于每一个具体的容器依据自己的数据结构，如何实现的具体取出细节，这个不用关心，这样就降低了取出元素和具体集合的耦合性。

-< java.util >-- List接口：
List本身是Collection接口的子接口，具备了Collection的所有方法。现在学习List体系特有的共性方法，查阅方法发现List的特有方法都有索引，这是该集合最大的特点。
List：有序(元素存入集合的顺序和取出的顺序一致)，元素都有索引。元素可以重复。
|--ArrayList：底层的数据结构是数组,线程不同步，ArrayList替代了Vector，查询元素的速度非常快。
|--LinkedList：底层的数据结构是链表，线程不同步，增删元素的速度非常快。
|--Vector：底层的数据结构就是数组，线程同步的，Vector无论查询和增删都巨慢。
对于List的遍历，不仅可以使用Iterator接口，也可以使用下表（索引）来遍历，list.get(index);
--< java.util >-- Set接口：
Set接口中的方法和Collection中方法一致的。Set接口取出方式只有一种，迭代器。
|--HashSet：底层数据结构是哈希表，线程是不同步的。无序，高效；
HashSet集合保证元素唯一性：通过元素的hashCode方法，和equals方法完成的。
当元素的hashCode值相同时，才继续判断元素的equals是否为true。
如果为true，那么视为相同元素，不存。如果为false，那么存储。
如果hashCode值不同，那么不判断equals，从而提高对象比较的速度。
|--LinkedHashSet：有序，hashset的子类。
|--TreeSet：对Set集合中的元素的进行指定顺序的排序。不同步。TreeSet底层的数据结构就是二叉树。
哈希表的原理：
1，对对象元素中的关键字(对象中的特有数据)，进行哈希算法的运算，并得出一个具体的算法值，这个值 称为哈希值。
2，哈希值就是这个元素的位置。
3，如果哈希值出现冲突，再次判断这个关键字对应的对象是否相同。如果对象相同，就不存储，因为元素重复。如果对象不同，就存储，在原来对象的哈希值基础 +1顺延。
4，存储哈希值的结构，我们称为哈希表。
5，既然哈希表是根据哈希值存储的，为了提高效率，最好保证对象的关键字是唯一的。
这样可以尽量少的判断关键字对应的对象是否相同，提高了哈希表的操作效率。
 6.在HashSet中尽量不要改变参与运算hashCode值的变量，以防止内存泄露。。
对于ArrayList集合，判断元素是否存在，或者删元素底层依据都是equals方法。
对于HashSet集合，判断元素是否存在，或者删除元素，底层依据的是hashCode方法和equals方法。
TreeSet:
用于对Set集合进行元素的指定顺序排序，排序需要依据元素自身具备的比较性。
如果元素不具备比较性，在运行时会发生ClassCastException异常。
所以需要元素实现Comparable接口，强制让元素具备比较性，复写compareTo方法。
依据compareTo方法的返回值，确定元素在TreeSet数据结构中的位置。
TreeSet方法保证元素唯一性的方式：就是参考比较方法的结果是否为0，如果return 0，视为两个对象重复，不存。
注意：在进行比较时，如果判断元素不唯一，比如，同姓名，同年龄，才视为同一个人。
在判断时，需要分主要条件和次要条件，当主要条件相同时，再判断次要条件，按照次要条件排序。
TreeSet集合排序有两种方式，Comparable和Comparator区别：
1：让元素自身具备比较性，需要元素对象实现Comparable接口，覆盖compareTo方法。
2：让集合自身具备比较性，需要定义一个实现了Comparator接口的比较器，并覆盖compare方法，并将该类对象作为实际参数传递给TreeSet集合的构造函数。
第二种方式较为灵活。

Map集合：
|--Hashtable：底层是哈希表数据结构，是线程同步的。不可以存储null键，null值。
|--HashMap：底层是哈希表数据结构，是线程不同步的。可以存储null键，null值。替代了Hashtable.
|--TreeMap：底层是二叉树结构，可以对map集合中的键进行指定顺序的排序。
Map集合存储和Collection有着很大不同：
Collection一次存一个元素；Map一次存一对元素。
Collection是单列集合；Map是双列集合。
Map中的存储的一对元素：一个是键，一个是值，键与值之间有对应(映射)关系。
特点：要保证map集合中键的唯一性。

想要获取map中的所有元素：
原理：map中是没有迭代器的，collection具备迭代器，只要将map集合转成Set集合，可以使用迭代器了。之所以转成set，是因为map集合具备着键的唯一性，其实set集合就来自于map，set集合底层其实用的就是map的方法。
★ 把map集合转成set的方法：
Set keySet();
Set entrySet();//取的是键和值的映射关系。
Entry就是Map接口中的内部接口；
为什么要定义在map内部呢？entry是访问键值关系的入口，是map的入口，访问的是map中的键值对。
---------------------------------------------------------
取出map集合中所有元素的方式一：keySet()方法。
可以将map集合中的键都取出存放到set集合中。对set集合进行迭代。迭代完成，再通过get方法对获取到的键进行值的获取。
```java
Set keySet = map.keySet();
Iterator it = keySet.iterator();
while(it.hasNext()){
Object key = it.next();
Object value = map.get(key);
System.out.println(key+":"+value);
}
```
-------------------------------------------------------
取出map集合中所有元素的方式二：entrySet()方法。
```java
Set entrySet = map.entrySet();
Iterator it = entrySet.iterator();
while(it.hasNext()){
Map.Entryme = (Map.Entry)it.next();
System.out.println(me.getKey()+"::::"+me.getValue());
}
```
--------------------------------------------------------
使用集合的技巧：
看到Array就是数组结构，有角标，查询速度很快。
看到link就是链表结构：增删速度快，而且有特有方法。addFirst； addLast； removeFirst()； removeLast()； getFirst()；getLast()；
看到hash就是哈希表，就要想要哈希值，就要想到唯一性，就要想到存入到该结构的中的元素必须覆盖hashCode，equals方法。
看到tree就是二叉树，就要想到排序，就想要用到比较。
比较的两种方式：
一个是Comparable：覆盖compareTo方法；
一个是Comparator：覆盖compare方法。
LinkedHashSet，LinkedHashMap:这两个集合可以保证哈希表有存入顺序和取出顺序一致，保证哈希表有序。
集合什么时候用？
当存储的是一个元素时，就用Collection。当存储对象之间存在着映射关系时，就使用Map集合。
保证唯一，就用Set。不保证唯一，就用List。

Collections：它的出现给集合操作提供了更多的功能。这个类不需要创建对象，内部提供的都是静态方法。
Collection 和 Collections的区别：
Collections是个java.util下的类，是针对集合类的一个工具类,提供一系列静态方法,实现对集合的查找、排序、替换、线程安全化（将非同步的集合转换成同步的）等操作。
Collection是个java.util下的接口，它是各种集合结构的父接口，继承于它的接口主要有Set和List,提供了关于集合的一些操作,如插入、删除、判断一个元素是否其成员、遍历等。
Arrays：
用于操作数组对象的工具类，里面都是静态方法。
关于集合内部的方法，这里就不介绍了，API中都有。
## 十一：IO流:用于处理设备上的数据。
相关概念：
1.流：可以理解为数据的流动，就是数据流。IO流最终要以对象来体现，对象都存在IO包中。流的操作只要两种，读和写。
2.流也可以进行分类：1.输入流（读）和输出流（写）。2.因为处理的的数据不同，分为字符流（Reader  Writer）和字节流（InputStream  OutputStream）。
字节流：处理字节数据的流对象。计算机底层的数据都是二进制格式字节，所以字节流的数据可以是音频，图片，文字等计算机中可以储存的数据。
字符流：为什么要有字符流？字节流不是可以操作一切数据？因为字符每个国家都不一样，所以涉及到了字符编码问题，像如果我们的使用GBK的编码，却按照ISO8859-1去解码是有问题的，所以需要我们在获取文字字节数据的同时+制定的编码表才可以正确解析数据。因而将字节流和编码表封装为对象，就是字符流，只要操作字符数据，那么悠闲考虑使用字符流体系。
重要知识点：
1.close()方法和flush()的区别：
flush()：将缓存区的数据刷到目的地中后，流可以继续使用。
close()：将缓冲区数据刷到目的地中后，流就关闭了，该方法主要用于结束调用的底层资源，这个动作在使用完毕流后一定要做。
2.FileWriter写入数据的细节：
windows中的换行符：\r\n 两个符号组成。  linux：\n。
在原数据上续写数据，只要在new 流对象的构造函数中传入新的参数true。
目录分割符： windows \\  /。

流的两种读取数据方法：1.不带缓冲区，每次读取一个（fr.read()）。2.自定义缓冲区（fr.read(buff)）
case  1:核心代码
```java
FileReader fr = new FileReader("demo.txt");  
int ch = 0;  
while((ch=fr.read)!=-1){  
  System.out,println((cahr)ch);   
  }  
  fr.close();  
```
case 2:
```java
FileReader fr = new FileReader("demo.txt")  
char[] buff = newchar[1024]; //自定义的缓冲区
int len = 0;  
while((len=fr.read(buff))!=-1){  
   System.out.println(buff,0,len);  
  }  
fr.close();
```



IO流体系：
字符流：
Reader：用于读取字符流的抽象类。子类必须实现的方法只有 read(char[], int, int) 和 close()。
 |---BufferedReader：从字符输入流中读取文本，缓冲各个字符，从而实现字符、数组和行的高效读取。 可以指定缓冲区的大小，或者可使用默认的大小。大多数情况下，默认值就足够大了。
|---LineNumberReader：跟踪行号的缓冲字符输入流。此类定义了方法 setLineNumber(int) 和 getLineNumber()，它们可分别用于设置和获取当前行号。
|---InputStreamReader：是字节流通向字符流的桥梁：它使用指定的 charset 读取字节并将其解码为字符。它使用的字符集可以由名称指定或显式给定，或者可以接受平台默认的字符集。
 |---FileReader：用来读取字符文件的便捷类。此类的构造方法假定默认字符编码和默认字节缓冲区大小都是适当的。要自己指定这些值，可以先在 FileInputStream 上构造一个 InputStreamReader。
|---CharArrayReader：
|---StringReader：
-------------------------------------------------
Writer：写入字符流的抽象类。子类必须实现的方法仅有 write(char[], int, int)、flush() 和 close()。
 |---BufferedWriter：将文本写入字符输出流，缓冲各个字符，从而提供单个字符、数组和字符串的高效写入。
|---OutputStreamWriter：是字符流通向字节流的桥梁：可使用指定的 charset 将要写入流中的字符编码成字节。它使用的字符集可以由名称指定或显式给定，否则将接受平台默认的字符集。
 |---FileWriter：用来写入字符文件的便捷类。此类的构造方法假定默认字符编码和默认字节缓冲区大小都是可接受的。要自己指定这些值，可以先在 FileOutputStream 上构造一个 OutputStreamWriter。
 |---PrintWriter：
|---CharArrayWriter：
|---StringWriter：
---------------------------------
字节流：
InputStream：是表示字节输入流的所有类的超类。
 |--- FileInputStream：从文件系统中的某个文件中获得输入字节。哪些文件可用取决于主机环境。FileInputStream 用于读取诸如图像数据之类的原始字节流。要读取字符流，请考虑使用 FileReader。
|---FilterInputStream：包含其他一些输入流，它将这些流用作其基本数据源，它可以直接传输数据或提供一些额外的功能。
 |--- BufferedInputStream：该类实现缓冲的输入流。
|---ObjectInputStream：
|---PipedInputStream：
-----------------------------------------------
OutputStream：此抽象类是表示输出字节流的所有类的超类。
 |---FileOutputStream：文件输出流是用于将数据写入 File 或 FileDescriptor 的输出流。
|---FilterOutputStream：此类是过滤输出流的所有类的超类。
 |---BufferedOutputStream：该类实现缓冲的输出流。
 |--- PrintStream：
 |--- DataOutputStream：
|---ObjectOutputStream：
|---PipedOutputStream：
--------------------------------
缓冲区是提高效率用的，给谁提高呢？
BufferedWriter：是给字符输出流提高效率用的，那就意味着，缓冲区对象建立时，必须要先有流对象。明确要提高具体的流对象的效率。
[java]view plaincopy
FileWriter fw = new FileWriter("bufdemo.txt");  
BufferedWriter bufw = new BufferedWriter(fw);//让缓冲区和指定流相关联。
for(int x=0; x<4; x++){  
bufw.write(x+"abc");  
bufw.newLine(); //写入一个换行符，这个换行符可以依据平台的不同写入不同的换行符。
bufw.flush();//对缓冲区进行刷新，可以让数据到目的地中。
}  
bufw.close();//关闭缓冲区，其实就是在关闭具体的流。


-----------------------------
BufferedReader：
[java]view plaincopy
FileReader fr = new FileReader("bufdemo.txt");  
BufferedReader bufr  = new BufferedReader(fr);  
String line = null;  
while((line=bufr.readLine())!=null){  //readLine方法返回的时候是不带换行符的。
System.out.println(line);  
}  
bufr.close();  


流一些总结：
流对象：其实很简单，就是读取和写入。但是因为功能的不同，流的体系中提供N多的对象。那么开始时，到底该用哪个对象更为合适呢？这就需要明确流的操作规律。
流的操作规律：
1，明确源和目的。
数据源：就是需要读取，可以使用两个体系：InputStream、Reader；
数据汇：就是需要写入，可以使用两个体系：OutputStream、Writer；
2，操作的数据是否是纯文本数据？
如果是：数据源：Reader
    数据汇：Writer 
如果不是：数据源：InputStream
      数据汇：OutputStream
3，虽然确定了一个体系，但是该体系中有太多的对象，到底用哪个呢？
明确操作的数据设备。
数据源对应的设备：硬盘(File)，内存(数组)，键盘(System.in)
数据汇对应的设备：硬盘(File)，内存(数组)，控制台(System.out)。
4，需要在基本操作上附加其他功能吗？比如缓冲。
如果需要就进行装饰。
转换流特有功能：转换流可以将字节转成字符，原因在于，将获取到的字节通过查编码表获取到指定对应字符。
转换流的最强功能就是基于 字节流 + 编码表 。没有转换，没有字符流。
发现转换流有一个子类就是操作文件的字符流对象：
InputStreamReader
|--FileReader
OutputStreamWriter
|--FileWrier
想要操作文本文件，必须要进行编码转换，而编码转换动作转换流都完成了。所以操作文件的流对象只要继承自转换流就可以读取一个字符了。
但是子类有一个局限性，就是子类中使用的编码是固定的，是本机默认的编码表，对于简体中文版的系统默认码表是GBK。
FileReader fr = new FileReader("a.txt");
InputStreamReader isr = new InputStreamReader(new FileInputStream("a.txt"),"gbk");
以上两句代码功能一致，
如果仅仅使用平台默认码表，就使用FileReader fr = new FileReader("a.txt"); //因为简化。
如果需要制定码表，必须用转换流。
转换流 = 字节流+编码表。
转换流的子类File = 字节流 + 默认编码表。

转换流使用格式：转换流  fr =  new 转换流（包装的流，指定的编码集）；
InputStreamReader fr = new InputStreamReaderfr (new FileInputStream("a.txt"),"GBK")

## 十二：网络编程。
相关概念：
1.逻辑端口：用于表示进程的逻辑地址，不同的进程的标识；有效进程：0~65535，其中0~1024是系统使用或者保留端口
2.物理端口：指的是主机或者其他设备上提供的外接接口。

Java中的IP对象 InetAddress.
Socket套接字，通信的端点：就是为网络服务提供的一种机制，通信两端都有Socket,网络通信其实就是端口Socket间的通信，数据在两个Socket之间通过IO传输


应用层的主要协议和方式有两张：UDP 和 TCP 两种.
1.UDP：面向数据包的传输，是面向无连接的方式.
 UDP传输：
 1.只要进行网络传输，必须需要Socket套接字。
 2.数据一定要封装到数据包中，数据包中包含IP地址，端口号，数据等信息。
 Java中封装操作UDP来进行网络通信的主要类是DatagramSocket对象以及DatagramPacket(数据包)。
 DatagramSocket：具备接受和发送功能，但进行传输时，需要明确发送端和接收端。
 DatagramPacket:数据包对象，用于操作数据包中的各种信息。

 UDP传输发送端的步骤：
 1.建立UDP的Socket服务，创建对象时如果没有声明端口，那么系统会自动分配给其一个未使用的端口号。
 2.明确要发送的数据。
 3.将数据封装到数据包对象中。
 4.用Socket的Send方法将数据包发送出去。
 5.关闭资源（必须记得做）

 下面给出一个例子作为参考：
```java
class UdpSend{  
publicstaticvoid main (String[] args){  
//1.使用DatagramSocket来建立UDP的Socket服务
      DatagramSocket ds = new DatagramSocket(8088);//指定发送端的端口8088，如果不指定自动默认分配
//2.明确要发送的具体数据 
      String context = "发送一段UDP信息。";  
byte[] buff = context.getBytes();  
//3.将数据封装到要发送的数据包中
      DatagramPacket dp = new DatapramPacket(buff,buff.length,InetAddress.getName("192.168.0.112"),10000);//要将该信息发往指定主机的10000端口上
//4.使用Socket的send方法，将数据包发送出去。
      ds.send(dp);  
//5.关闭资源
      ds.close();  
   }  
}
```


UDP传输接受端的步骤：
1.建立UDP的Socket服务，明确一个端口，作用在于，只有发送到这个端口的数据才是这个接受端可以接受处理的数据
2.创建数据包对象用于接受（存储）数据包。
3.利用Socket服务的接受方法将收到的数据存储到数据包中。
4.通过数据包对象获取数据包中的具体内容，如ip地址，端口，数据等。
5.关闭资源（必须做）


接受端的例子：
[java]view plaincopy
class UdpReceive{  
publicstaticvoid main(String[] args){  
//1.使用DatagramSocket建立UDP的Socket服务。
    DatagramSocket ds = new DatagramSocket(10000)；//设置端口，声明接受该端口的数据
//2.创建数据包对象，创建接受存收到的数据。(需要先定义字节数组，数据包会将接受到的数据存入到字节数组中)
byte[] buff = newbyte[1024];  
    DatagramPacket dp = new DatagramPacket(buff,buff.length);  
//3.利用Socket服务，接受发送过来的数据包
    ds.receive(dp);//该方法是阻塞式方法，没有监听到有数据发送过来的时候，会一直等待。
//4.通过数据包对象的方法获取数据包中信息
    String ip = dp.getAddress.getHostAddress();  
int port = dp.getPort();  
    String context = new String(dp.getData(),0,dp.length);  
    System.out.println("ip:"+ip+" port:"+port+" context:"+context);  
//5.关闭资源
    ds.close();  
  }  
}  
TCP传输：两个端点建立连接后会有一个传输数据的通道，这通道成为流，而且是建立在网络基础之上的流，称之为Socket流，该流中既有读取，也有写入。
相关概念：TCP中的两个端点需要严格区分：一个是服务端，一个是客户端。
客户端：对应的对象，Socket
服务端：对应的对象，ServerSocket

TCP客户端：
1.建立TCPde Socket服务，最好明确具体的地址和端口，这个对象在创建时，就已经可以对指定ip和端口进行连接（三次握手）。
2.如果连接成功，就意味通道建立了，Socket流已经产生了。只要获取到Socket流中的读取流和写入流即可，只要通getInputStream和getOutputStream就可以获取到两个流对象。
3关闭资源。

case 1 ：
[java]view plaincopy
class TcpClient{  
publicstaticvoid main(String[] args){  
         Socket s = new Socket("192.168.1.112",10002);  
         OutputStream out = s.getOutputStream();               //获取了Socket流中的输出流对象。
         out.write("TCP连接。。。".getBytes());  
         s.close();  
   }  
}  
TCP服务端：
1.创建Socket服务，并监听一个指定的端口。
2.服务端为了客户端提供服务，获取客户端的内容，可以通过accept方法获取连接过来的客户端对象。
3.可以通过获取到的Socket对象中的Socket流和具体的客户端进行通讯。
4.如果通讯结束，关闭资源。注意：要先关客户端，再关服务端。
case 2：

[java]view plaincopy
class TcpServer{  
publicstaticvoid main(String[] args) throws Exception{  
            ServerSocket ss = new ServerSocket(10002);    //建立服务端的Socket服务
            Socket s = ss.accept();      //获取客户端对象
            String ip = s.getInetAddress().getHostAddress();  
            System.out.println(ip+“.....connection”);  
//可以通过获取到的Socket对象中的Socket流和具体的客户端进行通讯
            InputStream in = s.getInputStream();     //读取客户端的数据，使用客户端对象的Socket读取流
byte[] buff = newbyte[1024];  
int  len =  in,read(buff);  
            String text = new String(buff,0,len);  
            System.out.println(text);  
//关闭资源，注意一定是先关客户端，再关闭服务端
            s.close();  
            ss.close();  
     }  
}  

网络编程中的URLEncoder和URLDecoder.
URLEncoder类的encode()静态方法：是将一个普通的字符串转化为一个百分号编码格式字符串。
URLDecoder类的decode()静态方法：是将百分号编码格式字符串转化为一个普通的字符串。
URL与URLConnection对象：前者是表示应用程序和URL之间的通信连接，后者表示与URL之间的HTTP连接。程序可以通过URLConnection实例向该URL发生请求，读取URL引用的资源。




未完待续。。。。。持续更新

