---
layout: post
title: "Building Conductor: orchestrating periodic agentic tasks from anywhere"
date: 2026-01-11
categories: [project, devlog]
---

## Overview

I’ve been building **Conductor**, a monorepo that pairs a Compose Multiplatform mobile app with a FastAPI backend for managing OpenCode (https://opencode.ai/).

At a high level, the repo has two main pieces:

- **Frontend (Compose Multiplatform)**: A shared Kotlin Multiplatform UI module for iOS, Android, and desktop, with thin platform-specific hosts.
- **Backend (FastAPI)**: A Python 3.11+ service that manages project listings, starts/stops OpenCode instances, and proxies traffic. I chose OpenCode because it lets me (among other things) swap LLMs easily as we experiment (and has similar functionality to Claude Code, Codex CLI, ...). It currently runs on my RPi 5.

This keeps UI and business logic consistent across platforms.

## Frontend Highlights

The shared UI lives in `frontend/sharedUI/`, following an MVVM architecture and Compose Multiplatform best practices. The Android and iOS apps stay minimal and host the shared Compose UI. I also added an Android TV module so we can show agent outputs on a big screen—websites, infographics, and other family-friendly visuals.

## Backend Highlights

The FastAPI backend in `backend/` handles project management and instance lifecycle actions, launching OpenCode sessions as needed. We also use a Grok voice agent to make hands-free requests and get spoken summaries or quick prompts routed to the system. Via the mobile app, it's also possible to add new skills (https://agentskills.io/home) to our agents (research, image gen, scraping, ...).

## A Loved Use Case in Our Family

The most fun use case right now is a daily ritual: **Conductor generates a kid-friendly infographic for the famous person who has a birthday today**. It’s become a quick family tradition checking the infographic on TV and a great conversation starter.

## Why I’m Playing With This

I’m exploring this stack to get a better feel for **agent orchestration** and to see how far I can push having agents do recurring work for me (and ping me via notifications when they need my hand). Currently, it looks to me like everything is going in the Steve Yegge direction (https://steve-yegge.medium.com/).

---

I’ll keep building this even after discovering a much more capable project with similar ideas: ClawDBot (https://github.com/clawdbot/clawdbot)
