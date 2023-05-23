# Notion Blog with Next.js 13
<p align="center">
  <img alt="demo site screenshot" src="public/readme/main.png" width="80%" />
</p>



## Contents
- [Introduction](#-introduction)
- [Demo](#-demo)
- [Features](#-features)
- [Major Dependencies](#-major-dependencies)
- [Getting Started](#-getting-started)
- [Screenshots](#screenshots)
- [TODO](#-todo)

## 🚀 Introduction
This is a blog template that uses Notion as CMS.<br>
Upload posts in Notion, share them through your blog!<br>
**This project uses `App Router` that is now stable in Next.js 13.4.**

## 👀 Demo
Check out the demo site [HERE](https://notion-blog-wildcatco.vercel.app/blog)

https://www.youtube.com/watch?v=rZgh8a4ZjA8

[![Video Label](http://img.youtube.com/vi/rZgh8a4ZjA8/1.jpg)](https://youtu.be/rZgh8a4ZjA8)

## 🌟 Features
- Simple to sync Notion and blog
- Search posts by name
- Filter posts by categories
- Related posts
- Dark mode
- Responsive design
- Sitemap

## 📦 Major Package Dependencies
- [react-notion-x](https://www.npmjs.com/package/react-notion-x): Renderer for notion pages
- [notion-client](https://www.npmjs.com/package/notion-client): Unofficial Notion API which is much faster than official Notion API

## 🏁 Getting Started
1. Duplicate [this](https://curved-kale-c2a.notion.site/Blog-6d822373099b4cb5a17f54c71cbdc917) notion blog template to your notion workspace. (Make your notion page public.)
 
   <img alt="duplicate template" src="./public/readme/getting-started/duplicate-template.png" style="width: 60%; margin-top:10px"/>
2. Visit your notion page with **browser**.
3. Check your database id in the url. (needed as an environment variable)
 
   <img alt="check database id" src="./public/readme/getting-started/check-database-id.png" style="width: 60%;margin-top: 10px"/>
4. Check your auth token in the cookie. (needed as an environment variable)
 
   <img alt="check auth token" src="./public/readme/getting-started/check-auth-token.png" style="width: 60%;margin-top: 10px"/>
 
5. Now you can run on local or deploy to [Vercel](https://vercel.com/dashboard) with environment variables listed [below](#environment-variables).

**Slug should be unique because it's used as url of the post page**

### Environment Variables
`NOTION_DATABASE_ID`: getting started step 3<br>
`NOTION_AUTH_TOKEN`: getting started step 4<br>
`SITE_URL`: URL of your site (http://localhost:3000 in local environment)<br>
`API_KEY`: Choose your own password for route handler

## Screenshots
### Desktop
<p style="display: flex;">
  <img src="public/readme/screenshots/desktop-blog.png" style="width: 40%;margin-right: 20px">
  <img src="public/readme/screenshots/desktop-post.png" style="width: 40%">
</p>

### Tablet
<p style="display: flex;">
  <img src="public/readme/screenshots/tablet-blog.png" style="width: 25%;margin-right: 20px">
  <img src="public/readme/screenshots/tablet-post.png" style="width: 25%">
</p>

### Mobile
<p style="display: flex;">
  <img src="public/readme/screenshots/mobile-blog.png" style="width: 20%;margin-right: 20px">
  <img src="public/readme/screenshots/mobile-post.png" style="width: 20%">
</p>

## 📝 TODO
- [ ] Light mode for code block
