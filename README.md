# LateRain Blog

个人项目展示与文章博客。默认明亮白底、浅粉色强调，支持深色主题，并通过 GitHub Pages 自动发布。

## 本地运行

```powershell
npm install
npm run dev
```

打开命令行显示的本地地址即可预览。发布前请依次运行：

```powershell
npm test
npm run build
```

## 写文章与增加项目

- 新文章：在 `src/content/posts/` 新建一个 `.md` 文件，复制已有文章顶部的 `---` 信息区并修改标题、日期、标签和正文。
- 新项目：在 `src/content/projects/` 新建一个 `.md` 文件，填写项目状态、技术栈和真实 GitHub 地址。
- `githubUrl` 目前是示例地址。发布前必须替换成主人的真实仓库链接；`src/config/site.ts` 中的 GitHub 地址、邮箱和个人简介也需要替换。

## 发布到 GitHub Pages

1. 在 GitHub 创建一个仓库，将此项目推送到默认的 `main` 分支。
2. 打开仓库 **Settings → Pages**，在 Build and deployment 中选择 **GitHub Actions**。
3. 推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建与发布。
4. 网站地址会是 `https://<GitHub 用户名>.github.io/<仓库名>/`。

首次部署前无需手动修改 `BASE_PATH`：工作流会使用仓库名称自动设置。若将来使用个人域名，再在 `astro.config.mjs` 中设置 `SITE_URL` 即可。
