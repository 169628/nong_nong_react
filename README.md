# 農農自然

採前後端分離，前端使用 React，後端使用 Node Koa.js，有完整的會員註冊、登入、登出功能，也有完整的加入購物車到結帳的流程。

## 使用者故事 / 網站地圖 / 流程圖 / 線稿圖

最初集中討論都在 miro 平台，在實作的過程中，有些功能與設計稿跟我們想的有出入，因此成品與原始草稿會有不一樣的地方，原始草稿請看

[農農 miro](https://miro.com/app/board/uXjVKt_IYJg=/)

## 設計稿

[農農 figma](https://www.figma.com/design/YOOejAhGD50LbSNtISJJ4y/%23F-11-%E5%B0%8F%E8%BE%B2%E5%95%86%E5%BA%97%E7%B6%B2%E7%AB%99?node-id=202-4223&t=LpBhFzKe4dkd7vmW-0)

## 部署到 github page

請點 github page

## 可使用帳號

登入畫面有 demo 連結，直接點連結即可

## 資料夾

- public (所有圖片、icon 都在 public 的 images 裡面，資料庫只存路徑)
- src
  - assets (所有的 scss )
  - component (所有頁面的元件，下面有一些 sample 是為了組員們能有共識的寫所而寫的教學)
  - pages (各個頁面，header 與 footer 在此 layout 資料夾中)
  - routes (前端 router 的定義在這邊)
  - slice (redux 的所有 slice)
  - App.jsx (綁 router )
  - Layout.jsx (顯示每頁)
  - main.jsx (進入點、綁 store)
  - store.js

## 後端 API

後端在另一個 repo，這邊只是簡單介紹要串接的 api

#### 註冊

```http
  POST /api/users/register
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

| Header | Token | no required |
| :----- | :---- | :---------- |

#### 登入

```http
  POST /api/users/login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

| Header | Token | no required |
| :----- | :---- | :---------- |

#### 尋找所有商品

```http
  GET /api/products?page={}&search={}
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
| `page`    | `number` | 總 total 的第幾頁 |
| `search`  | `string` | search key        |

| Header | Token | no required |
| :----- | :---- | :---------- |

#### 尋找單一商品

```http
  GET /api/products/one/{id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. 商品 id |

| Header | Token | no required |
| :----- | :---- | :---------- |

#### 取得購物車狀態

```http
  GET /api/carts/{id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. user id |

| Header | Token | **Required**. |
| :----- | :---- | :------------ |

#### 加入購物車

```http
  PUT /api/carts/{id}
```

| Parameter   | Type     | Description              |
| :---------- | :------- | :----------------------- |
| `id`        | `string` | **Required**. user id    |
| `productId` | `string` | **Required**. product id |
| `quantity`  | `number` | **Required**. 商品數量   |

| Header | Token | **Required**. |
| :----- | :---- | :------------ |

#### 結帳

```http
  POST /api/carts/pay/{id}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. user id |

| Header | Token | **Required**. |
| :----- | :---- | :------------ |

## 運行專案

1. 開啟終端機，執行以下指令 :

```bash
  git clone https://github.com/169628/nong_nong_react.git
```

2. 進入專案

```bash
  cd nong_nong_react
```

3. 透過 npm 安裝套件

```bash
  npm install
```

4. 啟動專案

```bash
  npm run start
```

## 環境變數

後端 url

`VITE_APP_URL`

## 使用的套件

- [redux](https://redux-toolkit.js.org/)
- [aos](https://michalsnik.github.io/aos/)
- [axios](https://www.npmjs.com/package/axios)
- [bootstrap](https://getbootstrap.com/)
- [react-bootstrap](https://react-bootstrap.netlify.app/)
- [react-hook-form](https://react-hook-form.com/)
- [react-spinners](https://www.davidhu.io/react-spinners/)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [swiper](https://swiperjs.com/)
- [validator](https://www.npmjs.com/package/validator)
