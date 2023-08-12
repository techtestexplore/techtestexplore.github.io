---
layout: doc
prev: false
next: false
---

# 设计原则SOLID

## 一、开闭原则

OCP - Open Close Principle

- 定义：可扩展(extension)，不可修改(modification)。把容易改变或增减的功能抽象成接口或方法
- 例子：不同vip等级的服务不同，把服务方法抽象成接口。（如果不抽象，那么每次增删改的时候就需要用if-else来判断，就修改了代码，与开闭原则不符）
- 符合开闭原则最典型的设计模式是装饰者模式

 ❌下面是一种不好的实现方式，每次改变vip等级都需要修改if-else代码逻辑
 
 ```swift
 struct Vip {
     func service(user: String) {
         if user == "vip1" {
             print("服务vip1: \(user)")
         } else if user == "vip2" {
             print("服务vip2: \(user)")
         }
     }
 }
 ```

 ✅下面是符合开闭原则的实现方式，这样每次增删改vip只会处理对应的vip（也可以通过创建基类，子类根据需求不同实现）
 
```swift
 protocol ServiceProvider {
     func service(user: String)
 }

 struct Vip1: ServiceProvider {
     func service(user: String) {
         print("服务vip1: \(user)")
     }
 }

 struct Vip2: ServiceProvider {
     func service(user: String) {
         print("服务vip2: \(user)")
     }
 }
 ```

## 二、单一职责原则

SRP - Single Responsibility Principle

- 定义：一个类只负责一件事，当这个类需要做过多事情的时候，就需要分解这个类
- 不仅仅是类，函数（方法）也要遵循单一职责原则，即：一个函数（方法）只做一件事情。如果发现一个函数（方法）里面有不同的任务，则需要将不同的任务以另一个函数（方法）的形式分离出去。
- 例子：A中有两种类型的职责：work1和work2，如果后面需要修改work1，有可能会不小心改坏work2，所以最好把不同类的职责work2分离出去。

## 三、里氏替换原则

LSP - Liskov Substitution Principle 

- 所有引用基类的地方必须能透明地使用其子类的对象，也就是说子类对象可以替换其父类对象，而程序执行效果不变。
- 在继承体系中，子类中可以增加自己特有的方法，也可以实现父类的抽象方法，但是不能重写父类的非抽象方法，否则该继承关系就不是一个正确的继承关系。
- 使用继承前仔细考虑继承关系是否正确

## 四、迪米特法则（最少知道原则）

LoD - Law of Demeter （ Least Knowledge Principle）

- 定义：迪米特法则也叫做最少知道原则（Least Know Principle），一个对象应该对尽可能少的对象有接触，也就是只接触那些真正需要接触的对象。
- 对象与对象之间交互的设计时，应该极力避免引出中间对象的情况（需要导入其他对象的类）：需要什么对象直接返回即可，降低类之间的耦合度。
- 例如：方法的作用是返回机器的名字，那么我们直接就返回一个机器名的String，而不是返回一个带有机器名的对象`Machine`
- 符合迪米特法则最典型的设计模式是中介者模式

## 五、接口分离原则

ISP - Interface Segregation Principle

- 不应该强迫客户依赖于它们不用的方法
- 使用多个专门的接口比使用单一的总接口要好
- 应尽量细化接口，接口中的方法应该尽量少
- 避免同一个接口里面包含不同类职责的方法，接口责任划分更加明确，符合高内聚低耦合的思想
- 例如：UITableView的UITableViewDelegate和UITableViewDataSource都是创建tableview的接口，但是设计成了两个接口，就很好的遵循了接口分离原则
- Swift中可以使用符号`&`来组合两个接口(协议)，能够很方便的应用接口分离

```swift
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

// 协议组合
struct Man: Named & Aged {
    var name: String
    var age: Int
}

// 也可以重新定义一个名字
typealias Person = Named & Aged

struct Woman: Person {
    var name: String
    var age: Int
}
```

## 六、依赖倒置原则

DIP - Dependency Inversion Principle

- 高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象
- 高层模块不应该直接依赖于底层模块的具体实现，而应该依赖于底层的抽象。换言之，模块间的依赖是通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生的
- 公司作为一个需要把自己的商品分销到全国各地，但是发现，不同的分销渠道有不同的玩法，于是派出了各种销售代表玩不同的玩法，随着渠道越来越多，发现，每增加一个渠道就要新增一批人和一个新的流程，严重耦合并依赖各渠道商的玩法。实在受不了了，于是制定业务标准(抽象接口)，开发分销信息化系统，只有符合这个标准的渠道商才能成为分销商（依赖协议的低层模块）。让各个渠道商反过来依赖自己标准。反转了控制，倒置了依赖。
- 例：高层模块A要依赖并使用低层模块B。那么就让B依赖并实现实现接口I，那么在A中使用的就是实现了接口I的B，这样A也就依赖的是接口I了，并且可以通过接口I的方法使用B。

❌不好的实现方式：高层Mother直接依赖了低层Book，所以只能读书，却不能读报纸了，如果再出现杂志等也是不能读

```swift
class Book {
    func getContent() -> String {
        return "很久很久以前有一个故事……";
    }
}

class Newspaper {
    func getContent() -> String {
        return "有一个新闻……";
    }
}

class Mother {
    // 直接依赖低层模块Book，导致无法读报纸Newspaper
    func narrate(book: Book) {
        print("妈妈开始讲故事")
        print(book.getContent())
    }
}

class Client {
    static func run() {
        let mother = Mother();
        mother.narrate(book: Book());
    }
}
```

✅好的实现：创建接口Contentable，低层依赖接口并实现接口方法，高层Mother通过接口调用低层，很好的实践了依赖倒置，解耦。加入后面再出现杂志，网页等信息，只要添加低层的实现，高层不用变化。

```swift
// 创建抽象接口，让低层模块和高层模块都依赖它(面向协议)
protocol Contentable {
    func getContent() -> String
}

// 低层模块也依赖抽象接口Contentable
class Book: Contentable {
    func getContent() -> String {
        return "很久很久以前有一个故事……";
    }
}

class Newspaper: Contentable {
    func getContent() -> String {
        return "有一个新闻……";
    }
}

class Mother {
    // 高层模块Mother依赖抽象接口Contentable，这样如果低层做了修改，高层也是不用改变的
    func narrate(content: Contentable) {
        print("妈妈开始读：")
        print(content.getContent())
    }
}

class Client {
    static func run() {
        let mother = Mother();
        mother.narrate(content: Book());
        mother.narrate(content: Newspaper());
    }
}
```

参考：

- [https://zhuanlan.zhihu.com/p/82324809](https://zhuanlan.zhihu.com/p/82324809)
- [https://juejin.cn/post/6844903908347740173](https://juejin.cn/post/6844903908347740173)
