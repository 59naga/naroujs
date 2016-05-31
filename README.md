naroujs
---

<p align="right">
  <a href="https://npmjs.org/package/naroujs">
    <img src="https://img.shields.io/npm/v/naroujs.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/naroujs">
    <img src="http://img.shields.io/travis/59naga/naroujs.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/naroujs/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/naroujs.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/naroujs">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/naroujs.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/naroujs">
    <img src="https://img.shields.io/gemnasium/59naga/naroujs.svg?style=flat-square">
  </a>
</p>

「[小説家になろう](http://syosetu.com/)」[なろう小説API](http://dev.syosetu.com/man/api/) NodeJS/ブラウザー用 JavaScriptラッパー

インストール
---

## NodeJS
```bash
npm install naroujs --save
```

```js
import naroujs from 'naroujs';
naroujs().then(result => console.log(result));
```

GET送信に[axios](https://github.com/mzabriskie/axios)を使用します。

## ブラウザ
```html
<script src="https://npmcdn.com/naroujs/lib/index.browser.min.js"></script>
<script>
naroujs().then(result => console.log(result));
</script>
```

GET送信に[fetch-jsonp](https://github.com/camsong/fetch-jsonp)を使用します([CORS](https://developer.mozilla.org/ja/docs/HTTP_access_control)回避のため)。

API
---

URLパラメータをオブジェクトで第一引数に渡し、APIへリクエストを送ります。
結果は[Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)でオブジェクトを返します。内容として
 * リクエストに使用した `uri`
 * リクエストに一致する全件数 `allcount`
 * リクエストに一致する結果 `items`
を持ちます。

```js
naroujs({lim: 1}).then(result => console.log(result));
// {
//   uri: 'http://api.syosetu.com/novelapi/api/?lim=1',
//   allcount: 396955,
//   items:
//    [
//      {
//        title: '無職転生　- 異世界行ったら本気だす -',
//        ...
```

## `naroujs(params)` -> `Promise<result>`
## `naroujs.pickup(params)` -> `Promise<result>`

`naroujs`と同じですが、`params`のデフォルト値として`{{ ispickup: 1, order: 'hyoka', lim: 200 }`を持ちます。
> [▽ピックアップ指定/・条件抽出GETパラメータ / なろう小説API - なろうデベロッパー](http://dev.syosetu.com/man/api/#link5)

> 注意
小説家になろうのピックアップはispickupが1でさらに小説評価が高い順200件です。
小説家になろうのピックアップと同一結果を取得したい場合はispickupが1であるかを確認し、さらに総合評価で並べ替えその結果を200件取得する必要があります。
>
http://api.syosetu.com/novelapi/api/?ispickup=1&order=hyoka&lim=200
小説家になろうで使っている小説ピックアップの情報を取得するURLです。

## `naroujs.r18(params)` -> `Promise<result>`

APIの基準URLを`http://dev.syosetu.com/xman/api/`([なろう18禁小説API
](http://dev.syosetu.com/xman/api/))に変更して、リクエストを発行します。

## `naroujs.noc(params)` -> `Promise<result>`

`naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 1}`を持ちます。
「ノクターンノベルズ(男性向け)」を検索対象とします。

## `naroujs.mnlt(params)` -> `Promise<result>`

`naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 2}`を持ちます。
「ムーンライトノベルズ(女性向け)」を検索対象とします。

## `naroujs.bl(params)` -> `Promise<result>`

`naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 3}`を持ちます。
「ムーンライトノベルズ(BL)」を検索対象とします。

## `naroujs.mid(params)` -> `Promise<result>`

`naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 4}`を持ちます。
「ミッドナイトノベルズ(大人向け)」を検索対象とします。

パラメーターの詳細
---
 - [出力GETパラメータ / なろう小説API - なろうデベロッパー](http://dev.syosetu.com/man/api/#link3)
 - [条件抽出GETパラメータ / なろう小説API - なろうデベロッパー](http://dev.syosetu.com/man/api/#link5)
 - [ofパラメータ / なろう小説API - なろうデベロッパー](http://dev.syosetu.com/man/api/#of_parm)
 - [なろう18禁小説API - なろうデベロッパー](http://dev.syosetu.com/xman/api/)

謝辞
---
このアプリケーションは非公式のもので、[株式会社ヒナプロジェクト](http://hinaproject.co.jp/)が提供しているものではありません。

開発環境
---
Requirement global
* NodeJS v5.11.1
* Npm v3.8.6 (or [pnpm](https://github.com/rstacruz/pnpm))

```bash
git clone https://github.com/59naga/naroujs
cd naroujs
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
