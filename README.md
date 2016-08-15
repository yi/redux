




作者：Wang Namelos
链接：https://www.zhihu.com/question/41312576/answer/90782136
来源：知乎
著作权归作者所有，转载请联系作者获得授权。

解答这个问题并不困难：唯一的要求是你熟悉React。
不要光听别人描述名词，理解起来是很困难的。
从需求出发，看看使用React需要什么：
1. React有props和state: props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。
理解这个是理解React和Redux的前提。
2. 一般构建的React组件内部可能是一个完整的应用，它自己工作良好，你可以通过属性作为API控制它。但是更多的时候发现React根本无法让两个组件互相交流，使用对方的数据。
然后这时候不通过DOM沟通（也就是React体制内）解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。
3. 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。
这样就出现了一个模式：数据总是单向从顶层向下分发的，但是只有子组件回调在概念上可以回到state顶层影响数据。这样state一定程度上是响应式的。
4. 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
5. 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。让我们回来看看重现上面结构的需求：
a. 需要回调通知state (等同于回调参数) -> action
b. 需要根据回调处理 (等同于父级方法) -> reducer
c. 需要state (等同于总状态) -> store
对Redux来说只有这三个要素：
a. action是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
b. reducer是一个匹配函数，action的发送是全局的：所有的reducer都可以捕捉到并匹配与自己相关与否，相关就拿走action中的要素进行逻辑处理，修改store中的状态，不相关就不对state做处理原样返回。
c. store负责存储状态并可以被react api回调，发布action.
当然一般不会直接把两个库拿来用，还有一个binding叫react-redux, 提供一个Provider和connect。很多人其实看懂了redux卡在这里。
a. Provider是一个普通组件，可以作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件，不管它在哪里，被嵌套多少层。
b. connect是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）：
mapStateToProps：构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。
mapDispatchToProps：声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。这个mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，可以手动当做store.dispatch使用。这也是为什么要科里化的原因。

做好以上流程Redux和React就可以工作了。简单地说就是：
1.顶层分发状态，让React组件被动地渲染。
2.监听事件，事件有权利回到所有状态顶层影响状态。



# <a href='http://redux.js.org'><img src='https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67' height='60'></a>

Redux is a predictable state container for JavaScript apps.
(If you're looking for a WordPress framework, check out [Redux Framework](https://reduxframework.com/).)

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as [live code editing combined with a time traveling debugger](https://github.com/gaearon/redux-devtools).

You can use Redux together with [React](https://facebook.github.io/react/), or with any other view library.
It is tiny (2kB, including dependencies).

[![build status](https://img.shields.io/travis/reactjs/redux/master.svg?style=flat-square)](https://travis-ci.org/reactjs/redux)
[![npm version](https://img.shields.io/npm/v/redux.svg?style=flat-square)](https://www.npmjs.com/package/redux)
[![npm downloads](https://img.shields.io/npm/dm/redux.svg?style=flat-square)](https://www.npmjs.com/package/redux)
[![redux channel on discord](https://img.shields.io/badge/discord-%23redux%20%40%20reactiflux-61dafb.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bZ6au5t)
[![#rackt on freenode](https://img.shields.io/badge/irc-%23rackt%20%40%20freenode-61DAFB.svg?style=flat-square)](https://webchat.freenode.net/)
[![Changelog #187](https://img.shields.io/badge/changelog-%23187-lightgrey.svg?style=flat-square)](https://changelog.com/187)

>**New! Learn Redux from its creator:
>[Getting Started with Redux](https://egghead.io/series/getting-started-with-redux) (30 free videos)**

### Testimonials

>[“Love what you're doing with Redux”](https://twitter.com/jingc/status/616608251463909376)
>Jing Chen, creator of Flux

>[“I asked for comments on Redux in FB's internal JS discussion group, and it was universally praised. Really awesome work.”](https://twitter.com/fisherwebdev/status/616286955693682688)
>Bill Fisher, author of Flux documentation

>[“It's cool that you are inventing a better Flux by not doing Flux at all.”](https://twitter.com/andrestaltz/status/616271392930201604)
>André Staltz, creator of Cycle

### Developer Experience

I wrote Redux while working on my React Europe talk called [“Hot Reloading with Time Travel”](https://www.youtube.com/watch?v=xsSnOQynTHs). My goal was to create a state management library with minimal API but completely predictable behavior, so it is possible to implement logging, hot reloading, time travel, universal apps, record and replay, without any buy-in from the developer.

### Influences

Redux evolves the ideas of [Flux](http://facebook.github.io/flux/), but avoids its complexity by taking cues from [Elm](https://github.com/evancz/elm-architecture-tutorial/).
Whether you have used them or not, Redux only takes a few minutes to get started with.

### Installation

To install the stable version:

```
npm install --save redux
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.
If you don't, you can [access these files on npmcdn](https://npmcdn.com/redux/), download them, or point your package manager to them.

Most commonly people consume Redux as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules. These modules are what you get when you import `redux` in a [Webpack](http://webpack.github.io), [Browserify](http://browserify.org/), or a Node environment. If you like to live on the edge and use [Rollup](http://rollupjs.org), we support that as well.

If you don't use a module bundler, it's also fine. The `redux` npm package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://npmcdn.com/redux/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. For example, you can drop a UMD build as a [`<script>` tag](https://npmcdn.com/redux/dist/redux.js) on the page, or [tell Bower to install it](https://github.com/reactjs/redux/pull/1181#issuecomment-167361975). The UMD builds make Redux available as a `window.Redux` global variable.

The Redux source code is written in ES2015 but we precompile both CommonJS and UMD builds to ES5 so they work in [any modern browser](http://caniuse.com/#feat=es5). You don't need to use Babel or a module bundler to [get started with Redux](https://github.com/reactjs/redux/blob/master/examples/counter-vanilla/index.html).

#### Complementary Packages

Most likely, you'll also need [the React bindings](https://github.com/reactjs/react-redux) and [the developer tools](https://github.com/gaearon/redux-devtools).

```
npm install --save react-redux
npm install --save-dev redux-devtools
```

Note that unlike Redux itself, many packages in the Redux ecosystem don't provide UMD builds, so we recommend using CommonJS module bundlers like [Webpack](http://webpack.github.io) and [Browserify](http://browserify.org/) for the most comfortable development experience.

### The Gist

The whole state of your app is stored in an object tree inside a single *store*.
The only way to change the state tree is to emit an *action*, an object describing what happened.
To specify how the actions transform the state tree, you write pure *reducers*.

That's it!

```js
import { createStore } from 'redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called *actions*. Then you write a special function called a *reducer* to decide how every action transforms the entire application's state.

If you're coming from Flux, there is a single important difference you need to understand. Redux doesn't have a Dispatcher or support many stores. Instead, there is just a single store with a single root reducing function. As your app grows, instead of adding stores, you split the root reducer into smaller reducers independently operating on the different parts of the state tree. This is exactly like there is just one root component in a React app, but it is composed out of many small components.

This architecture might seem like an overkill for a counter app, but the beauty of this pattern is how well it scales to large and complex apps. It also enables very powerful developer tools, because it is possible to trace every mutation to the action that caused it. You can record user sessions and reproduce them just by replaying every action.

### Learn Redux from Its Creator

[Getting Started with Redux](https://egghead.io/series/getting-started-with-redux) is a video course consisting of 30 videos narrated by Dan Abramov, author of Redux. It is designed to complement the “Basics” part of the docs while bringing additional insights about immutability, testing, Redux best practices, and using Redux with React. **This course is free and will always be.**

>[“Great course on egghead.io by @dan_abramov - instead of just showing you how to use #redux, it also shows how and why redux was built!”](https://twitter.com/sandrinodm/status/670548531422326785)
>Sandrino Di Mattia

>[“Plowing through @dan_abramov 'Getting Started with Redux' - its amazing how much simpler concepts get with video.”](https://twitter.com/chrisdhanaraj/status/670328025553219584)
>Chris Dhanaraj

>[“This video series on Redux by @dan_abramov on @eggheadio is spectacular!”](https://twitter.com/eddiezane/status/670333133242408960)
>Eddie Zaneski

>[“Come for the name hype. Stay for the rock solid fundamentals. (Thanks, and great job @dan_abramov and @eggheadio!)”](https://twitter.com/danott/status/669909126554607617)
>Dan

>[“This series of videos on Redux by @dan_abramov is repeatedly blowing my mind - gunna do some serious refactoring”](https://twitter.com/gelatindesign/status/669658358643892224)
>Laurence Roberts

So, what are you waiting for?

#### [Watch the 30 Free Videos!](https://egghead.io/series/getting-started-with-redux)

If you enjoyed my course, consider supporting Egghead by [buying a subscription](https://egghead.io/pricing). Subscribers have access to the source code for the example in every one of my videos, as well as to tons of advanced lessons on other topics, including JavaScript in depth, React, Angular, and more. Many [Egghead instructors](https://egghead.io/instructors) are also open source library authors, so buying a subscription is a nice way to thank them for the work that they've done.

### Documentation

* [Introduction](http://redux.js.org/docs/introduction/index.html)
* [Basics](http://redux.js.org/docs/basics/index.html)
* [Advanced](http://redux.js.org/docs/advanced/index.html)
* [Recipes](http://redux.js.org/docs/recipes/index.html)
* [Troubleshooting](http://redux.js.org/docs/Troubleshooting.html)
* [Glossary](http://redux.js.org/docs/Glossary.html)
* [API Reference](http://redux.js.org/docs/api/index.html)

For PDF, ePub, and MOBI exports for offline reading, and instructions on how to create them, please see: [paulkogel/redux-offline-docs](https://github.com/paulkogel/redux-offline-docs).

### Examples

* [Counter Vanilla](http://redux.js.org/docs/introduction/Examples.html#counter-vanilla) ([source](https://github.com/reactjs/redux/tree/master/examples/counter-vanilla))
* [Counter](http://redux.js.org/docs/introduction/Examples.html#counter) ([source](https://github.com/reactjs/redux/tree/master/examples/counter))
* [Todos](http://redux.js.org/docs/introduction/Examples.html#todos) ([source](https://github.com/reactjs/redux/tree/master/examples/todos))
* [Todos with Undo](http://redux.js.org/docs/introduction/Examples.html#todos-with-undo) ([source](https://github.com/reactjs/redux/tree/master/examples/todos-with-undo))
* [TodoMVC](http://redux.js.org/docs/introduction/Examples.html#todomvc) ([source](https://github.com/reactjs/redux/tree/master/examples/todomvc))
* [Shopping Cart](http://redux.js.org/docs/introduction/Examples.html#shopping-cart) ([source](https://github.com/reactjs/redux/tree/master/examples/shopping-cart))
* [Tree View](http://redux.js.org/docs/introduction/Examples.html#tree-view) ([source](https://github.com/reactjs/redux/tree/master/examples/tree-view))
* [Async](http://redux.js.org/docs/introduction/Examples.html#async) ([source](https://github.com/reactjs/redux/tree/master/examples/async))
* [Universal](http://redux.js.org/docs/introduction/Examples.html#universal) ([source](https://github.com/reactjs/redux/tree/master/examples/universal))
* [Real World](http://redux.js.org/docs/introduction/Examples.html#real-world) ([source](https://github.com/reactjs/redux/tree/master/examples/real-world))

If you're new to the NPM ecosystem and have troubles getting a project up and running, or aren't sure where to paste the gist above, check out [simplest-redux-example](https://github.com/jackielii/simplest-redux-example) that uses Redux together with React and Browserify.

### Discussion

Join the [#redux](https://discord.gg/0ZcbPKXt5bZ6au5t) channel of the [Reactiflux](http://www.reactiflux.com) Discord community.

### Thanks

* [The Elm Architecture](https://github.com/evancz/elm-architecture-tutorial) for a great intro to modeling state updates with reducers;
* [Turning the database inside-out](http://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/) for blowing my mind;
* [Developing ClojureScript with Figwheel](https://www.youtube.com/watch?v=j-kj2qwJa_E) for convincing me that re-evaluation should “just work”;
* [Webpack](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) for Hot Module Replacement;
* [Flummox](https://github.com/acdlite/flummox) for teaching me to approach Flux without boilerplate or singletons;
* [disto](https://github.com/threepointone/disto) for a proof of concept of hot reloadable Stores;
* [NuclearJS](https://github.com/optimizely/nuclear-js) for proving this architecture can be performant;
* [Om](https://github.com/omcljs/om) for popularizing the idea of a single state atom;
* [Cycle](https://github.com/cyclejs/cycle-core) for showing how often a function is the best tool;
* [React](https://github.com/facebook/react) for the pragmatic innovation.

Special thanks to [Jamie Paton](http://jdpaton.github.io) for handing over the `redux` NPM package name.

### Logo

You can find the official logo [on GitHub](https://github.com/reactjs/redux/tree/master/logo).

### Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/reactjs/redux/releases) page.

### Patrons

The work on Redux was [funded by the community](https://www.patreon.com/reactdx).
Meet some of the outstanding companies that made it possible:

* [Webflow](https://github.com/webflow)
* [Ximedes](https://www.ximedes.com/)

[See the full list of Redux patrons.](PATRONS.md)

### License

MIT
