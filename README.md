# 王彥晴 Joanne Wang｜設計作品集

這是目前已發佈的作品集原始碼，對應 2026-11-23 的網站版本（原始提交 `8bcaa86`）。網站檔案從原專案的 `dist/` 匯出到這份專案的根目錄，首頁、四個案例及所有瀏覽器資源均原樣保留。

## 技術架構與建置

網站以 HTML、CSS 和原生 JavaScript 製作。頁面直接由瀏覽器載入，輪播和圖片預覽由 JavaScript 控制，響應式版面和動畫由 CSS 定義。原始檔案本身就是可部署的靜態檔案，部署時直接發佈此資料夾。

| 路徑 | 用途 |
| --- | --- |
| `index.html` | 首頁、代表作品輪播、作品列表、關於我與聯絡資訊 |
| `work/` | 政大數位知識城、自定義課表、iOS 校園公車和政大徵才月的四個案例頁 |
| `styles.css` | 字體、配色、圖示樣式、響應式排版、動畫與減少動態效果的設定 |
| `site.js` | 導覽狀態、輪播控制、案例圖片放大及關閉互動 |
| `assets/` | 原始網站圖片、網站圖示、字體和字體授權檔 |
| `.nojekyll` | 讓 GitHub Pages 直接發佈這組靜態檔案 |
| `README.md` | 專案架構、預覽和發佈方式 |

三款網頁字體 Outfit、Noto Sans TC 和 Instrument Serif Italic 已放在 `assets/fonts/`。功能圖示使用系統字形，網站圖示則來自 `assets/mark.png`。

## 在本機預覽

解壓縮後，用瀏覽器打開 `index.html`。若想用 HTTP 模擬部署，在 `index.html` 所在的資料夾執行下列指令。這個指令需有 Python 3，只用於本機預覽。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

開啟 [http://127.0.0.1:8000/](http://127.0.0.1:8000/) 檢查首頁，並點進四個案例確認圖片及導覽。

## 部署到 GitHub Pages

1. 在 GitHub 建立或選擇一個 repository。若要使用個人網站網址 `https://USERNAME.github.io/`，repository 名稱請用 `USERNAME.github.io`。一般專案名稱如 `portfolio` 會對應 `https://USERNAME.github.io/portfolio/`。使用 GitHub Free 時，請選擇公開 repository。
2. 將解壓後的內容上傳至 repository 根目錄，讓 `index.html`、`styles.css`、`site.js`、`work/`、`assets/` 和 `.nojekyll` 出現在同一層。在 Mac 的 Finder 可按 **⌘ + ⇧ + .** 顯示 `.nojekyll`，然後透過 **Add file → Upload files** 上傳並提交。
3. 在 repository 的 **Settings → Pages**，選擇 **Deploy from a branch**。Branch 選有放入這些檔案的分支，通常是 `main`，資料夾選 **`/(root)`**，再按 **Save**。
4. 等部署完成後，在 **Settings → Pages** 點 **Visit site**。之後更新同一分支的網站檔案，GitHub Pages 會重新發佈。

上架後可確認首頁、四個案例、頁內導覽、輪播、展開面板和圖片預覽。這份專案的網站內部連結與素材均使用相對路徑，可部署在個人網站根路徑或專案子路徑。公開網站會顯示頁面原有的聯絡資訊，訪客能否打開 Figma 原型則由各原型的分享權限決定。

[GitHub Pages 官方部署說明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
