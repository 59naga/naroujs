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

「[小説家になろう](http://syosetu.com/)」[デベロッパー](http://dev.syosetu.com/) NodeJS/ブラウザー用 JavaScriptラッパー

インストール
---

| インストール | [なろう小説API] | [なろう小説ランキングAPI] | [なろう殿堂入りAPI] | [なろう18禁小説API] |
|---|---|---|---|---|

**NodeJS**
```bash
npm install naroujs --save
```

```js
import naroujs from 'naroujs';
naroujs().then(result => console.log(result));
```

GET送信に[axios](https://github.com/mzabriskie/axios)を使用します。

**ブラウザ**（[Download](https://npmcdn.com/naroujs/lib/index.browser.min.js)）
```html
<script src="https://npmcdn.com/naroujs/lib/index.browser.min.js"></script>
<script>
naroujs().then(result => console.log(result));
</script>
```

GET送信に[fetch-jsonp](https://github.com/camsong/fetch-jsonp)を使用します([CORS](https://developer.mozilla.org/ja/docs/HTTP_access_control)回避のため)。

[API DEMO](http://jsdo.it/59naga/naroujs)

なろう小説API
---

| [インストール] | なろう小説API | [なろう小説ランキングAPI] | [なろう殿堂入りAPI] | [なろう18禁小説API] |
|---|---|---|---|---|

* `naroujs(params)` -> `Promise<result>`

  [URLパラメータ](#パラメーターの詳細)をオブジェクトで第一引数に渡し、APIへリクエストを送ります。
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

* `naroujs.pickup(params)` -> `Promise<result>`

  `naroujs`と同じですが、`params`のデフォルト値として`{ ispickup: 1, order: 'hyoka', lim: 200 }`を持ちます。
  > [▽ピックアップ指定/・条件抽出GETパラメータ / なろう小説API](http://dev.syosetu.com/man/api/#link5)

  > 注意
  小説家になろうのピックアップはispickupが1でさらに小説評価が高い順200件です。
  小説家になろうのピックアップと同一結果を取得したい場合はispickupが1であるかを確認し、さらに総合評価で並べ替えその結果を200件取得する必要があります。
  >
  http://api.syosetu.com/novelapi/api/?ispickup=1&order=hyoka&lim=200
  小説家になろうで使っている小説ピックアップの情報を取得するURLです。

<a name="パラメーターの詳細"></a>
**パラメーターの詳細**

 - [出力GETパラメータ / なろう小説API](http://dev.syosetu.com/man/api/#link3)
 - [条件抽出GETパラメータ / なろう小説API](http://dev.syosetu.com/man/api/#link5)
 - [ofパラメータ / なろう小説API](http://dev.syosetu.com/man/api/#of_parm)

`gzip`と`out`は現在指定できません。NodeJSでは`gzip=5,out=json`、ブラウザでは`out=jsonp`固定になります。

なろう小説ランキングAPI
---

| [インストール] | [なろう小説API] | なろう小説ランキングAPI | [なろう殿堂入りAPI] | [なろう18禁小説API] |
|---|---|---|---|---|

* `naroujs.rank(params)` -> `Promise<result>`

  APIの基準URLを`http://api.syosetu.com/rank/rankget/`([なろう小説ランキングAPI
  ](http://api.syosetu.com/rank/rankget/?rtype=20130501-m))に変更して、リクエストを発行します。内容として
   * リクエストに使用した `uri`
   * リクエストに一致する結果 `items`
  を持ちます。

  ```js
  naroujs.rank({rtype: '20130501-m'}).then(result => console.log(result));
  // {
  //   uri: 'http://api.syosetu.com/rank/rankget/?rtype=20130501-m&out=json&gzip=5',
  //   items:
  //    [
  //      { ncode: 'N7648BN', pt: 36092, rank: 1 },
  //      ...
  ```

**パラメーターの詳細**

 - [GETパラメータ / なろう小説ランキングAPI](http://dev.syosetu.com/man/rankapi/#link3)

`gzip`と`out`は現在指定できません。NodeJSでは`gzip=5,out=json`、ブラウザでは`out=jsonp`固定になります。

なろう殿堂入りAPI
---

| [インストール] | [なろう小説API] | [なろう小説ランキングAPI] | なろう殿堂入りAPI | [なろう18禁小説API] |
|---|---|---|---|---|

* `naroujs.fame(params)` -> `Promise<result>`

  APIの基準URLを`http://api.syosetu.com/rank/rankin/`([なろう殿堂入りAPI
  ](http://api.syosetu.com/rank/rankin/?ncode=n9669bk))に変更して、リクエストを発行します。内容として
   * リクエストに使用した `uri`
   * リクエストに一致する結果 `items`
  を持ちます。

  ```js
  naroujs.fame({ncode: 'n9669bk'}).then(result => console.log(result));
  // {
  //   uri: 'http://api.syosetu.com/rank/rankin/?ncode=n9669bk&out=json&gzip=5',
  //   items:
  //    [
  //      { pt: 623, rank: 11, rtype: '20130501-d' },
  //      ...
  ```

**パラメーターの詳細**

 - [GETパラメータ / なろう殿堂入りAPI](http://dev.syosetu.com/man/rankinapi/#link3)

`gzip`と`out`は現在指定できません。NodeJSでは`gzip=5,out=json`、ブラウザでは`out=jsonp`固定になります。

なろう18禁小説API
---

| [インストール] | [なろう小説API] | [なろう小説ランキングAPI] | [なろう殿堂入りAPI] | なろう18禁小説API |
|---|---|---|---|---|

 * `naroujs.r18(params)` -> `Promise<result>`

   APIの基準URLを`http://api.syosetu.com/novel18api/api/`([なろう18禁小説API
   ](http://api.syosetu.com/novel18api/api/))に変更して、リクエストを発行します。

 * `naroujs.noc(params)` -> `Promise<result>`

   `naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 1}`を持ちます。
   「ノクターンノベルズ(男性向け)」を検索対象とします。

 * `naroujs.mnlt(params)` -> `Promise<result>`

   `naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 2}`を持ちます。
   「ムーンライトノベルズ(女性向け)」を検索対象とします。

 * `naroujs.bl(params)` -> `Promise<result>`

   `naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 3}`を持ちます。
   「ムーンライトノベルズ(BL)」を検索対象とします。

 * `naroujs.mid(params)` -> `Promise<result>`

   `naroujs.r18`と同じですが、`params`のデフォルト値として`{nocgenre: 4}`を持ちます。
   「ミッドナイトノベルズ(大人向け)」を検索対象とします。

**パラメーターの詳細**

 - [出力GETパラメータ / なろう18禁小説API](http://dev.syosetu.com/xman/api/#link3)
 - [条件抽出GETパラメータ / なろう18禁小説API](http://dev.syosetu.com/xman/api/#link5)
 - [ofパラメータ / なろう18禁小説API](http://dev.syosetu.com/xman/api/#of_parm)

`gzip`と`out`は現在指定できません。NodeJSでは`gzip=5,out=json`、ブラウザでは`out=jsonp`固定になります。

ほか、参考文献
---
 - [ジャンル変更のお知らせ（2016年5月24日） || 小説家になろう](http://syosetu.com/teaser/genre/)

謝辞
---
このアプリケーションは非公式のもので、[株式会社ヒナプロジェクト](http://hinaproject.co.jp/)が提供しているものではありません。

開発環境
---
下記が[グローバルインストール](https://github.com/creationix/nvm#readme)されていることが前提です。
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


[インストール]: README.md#インストール
[なろう小説API]: README.md#なろう小説api
[なろう小説ランキングAPI]: README.md#なろう小説ランキングapi
[なろう殿堂入りAPI]: README.md#なろう殿堂入りapi
[なろう18禁小説API]: README.md#なろう18禁小説api
