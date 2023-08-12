---
layout: doc
prev: false
next: false
---

# 有限状态机FSM

## 一、什么是有限状态机

有限状态机简写为FSM（Finite State Machine），它有4个要素，即现态、条件、动作、次态。“现态”和“条件”是因，“动作”和“次态”是果。

- 现态：是指当前所处的状态。
- 条件：又称为“事件”，当一个条件被满足，将会触发一个动作，或者执行一次状态的迁移。
- 动作：条件满足后执行的动作。动作执行完毕后，可以迁移到新的状态，也可以仍旧保持原状态。动作不是必需的，当条件满足后，也可以不执行任何动作，直接迁移到新状态。
- 次态：条件满足后要迁往的新状态。“次态”是相对于“现态”而言的，“次态”一旦被激活，就转变成新的“现态”了。

## 二、Flutter中的Bloc

触发事件 ---> bloc派发event ---> bloc中map根据不同的event执行不同逻辑 ---> 生成新的状态state --->  页面根据新的状态重新渲染

## 三、Redux

- Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
- State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
- Action 就是 View 发出的通知，表示 State 应该要发生变化了。store.dispatch()是 View 发出 Action 的唯一方法。
- Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
- Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
- Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

## 四、iOS中实现一个FSM( [TransitionKit](https://github.com/blakewatters/TransitionKit))

##### [三方库：TransitionKit](https://github.com/blakewatters/TransitionKit)

##### 1.State

每个状态有四个闭包，可以在创建State的时候传入action

- WillExit
- WillEnter
- DidExit
- DidEnter

##### 2.Event

每个Event代表从某个状态（sourceStates）变化到另一个状态（destinationState）

- sourceStates是一个数组，可以变到destinationState的State都可以放在数组中
- event有WillFire和DidFire闭包，以传入action

##### 3.Transition 

用来运输State变化过程中的各个对象，包括：

- event
- sourceState
- destinationState
- stateMachine
- userInfo （扩展参数，在Machine触发event的时候传入）

##### 4.Machine 

FSM控制中心

- 1. 持有所有States
- 2. 持有所有Event
- 3. 需要赋予一个初始的state
- 4. 调用activate启动Machine
- 5. 调用fireEvent触发状态的切换，触发过程会分别调用state和event的闭包实现action，并且会发送一个通知

##### 5.例子

```Objective-C
 	// 1.核心machine
    TKStateMachine *machine = [[TKStateMachine alloc] init];
    
    // 2.定义未读状态
    TKState *unread = [TKState stateWithName:@"unread"];
    
    [unread setWillExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"unread WillExit: %@", userInfo);
    }];
    
    [unread setWillEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"unread WillEnter: %@", userInfo);
    }];
    
    [unread setDidExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"unread DidExit: %@", userInfo);
    }];
    
    [unread setDidEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"unread DidEnter: %@", userInfo);
    }];
    
    // 3.定义已读状态
    TKState *read = [TKState stateWithName:@"read"];
    
    [read setWillExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"read WillExit: %@", userInfo);
    }];
    
    [read setWillEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"read WillEnter: %@", userInfo);
    }];
    
    [read setDidExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"read DidExit: %@", userInfo);
    }];
    
    [read setDidEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"read DidEnter: %@", userInfo);
    }];
    
    // 4.定义删除状态
    TKState *delete = [TKState stateWithName:@"delete"];
    
    [delete setWillExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"delete WillExit: %@", userInfo);
    }];
    
    [delete setWillEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"delete WillEnter: %@", userInfo);
    }];
    
    [delete setDidExitStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"delete DidExit: %@", userInfo);
    }];
    
    [delete setDidEnterStateBlock:^(TKState *state, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"delete DidEnter: %@", userInfo);
    }];
    
    TKEvent *readEvent = [TKEvent eventWithName:@"read" transitioningFromStates:@[unread] toState:read];
    
    [readEvent setWillFireEventBlock:^(TKEvent *event, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"readEvent WillFire: %@", userInfo);
    }];
    
    [readEvent setDidFireEventBlock:^(TKEvent *event, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"readEvent DidFire: %@", userInfo);
    }];
    
    TKEvent *deleteEvent = [TKEvent eventWithName:@"delete" transitioningFromStates:@[read, unread] toState:delete];
    
    [deleteEvent setWillFireEventBlock:^(TKEvent *event, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"deleteEvent WillFire: %@", userInfo);
    }];
    
    [deleteEvent setDidFireEventBlock:^(TKEvent *event, TKTransition *transition) {
        NSString *userInfo = transition.userInfo[@"key"];
        NSLog(@"deleteEvent DidFire: %@", userInfo);
    }];
    
    // 5.配置并启动machine
    
    NSLog(@"🔥1.初始化machine");
    
    [machine addStates:@[read, unread, delete]];
    [machine addEvents:@[readEvent, deleteEvent]];
    [machine setInitialState:unread];
    [machine activate];
    
    // 6.触发event
    
    NSError *error = nil;
    
    NSLog(@"-------->1.当前状态---> %@", [machine currentState]);
    
		// 触发从unread到read的event
    [machine fireEvent:readEvent userInfo:@{@"key": @"unread to read"} error:&error];
    
    NSLog(@"-------->2.当前状态---> %@", [machine currentState]);
    
		// 触发从unread/delete
    [machine fireEvent:deleteEvent userInfo:@{@"key": @"unread/read to delete"} error:&error];
    
    NSLog(@"-------->3.当前状态---> %@", [machine currentState]);
```

------

参考：

- [https://baike.baidu.com/item/%E7%8A%B6%E6%80%81%E6%9C%BA/6548513?fr=aladdin](https://baike.baidu.com/item/%E7%8A%B6%E6%80%81%E6%9C%BA/6548513?fr=aladdin)
- [http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

