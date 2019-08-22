# v-transition-test

## 概要

vueのtranstionの実験です。vue-cliでenter連打で作ってます。

## 目標

### ページ遷移の際に次のページが見えるようにする

達成
ページ遷移のときに既に次のページは見えている

### ページ遷移の際にmountedは実行されてから表示されるのか否か

ライフサイクルフックがどこまで実行されるのかすごく気になるところ。
→実行される。mountedはページ遷移アニメーションの開始時に実行され、setTimeoutなどもちゃんと動作する。（アニメーション中にメッセージが切り替わっていることがわかる）
→vueのライフサイクルにより、createdなども実行されていることがわかる。

### ページ遷移直後になにかできる?

難しそうだなあ。だけど、ローディングのアニメーションが遷移中から回ってるのはなんか違うような気もするし、できてほしい。
まあ、できなくても致命的じゃあないけど。



# commands

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
