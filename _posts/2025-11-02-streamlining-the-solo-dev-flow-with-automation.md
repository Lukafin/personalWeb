---
layout: post
title: "Streamlining the Solo Dev Flow with Automation"
date: 2025-11-02 09:00:00 +0100
categories: automation
---

I run four small automations that cover research, docs, and maintenance and auto bug fixing so I can stay focused on shipping.

## Competitive Search on a Schedule

A daily Competitive Search job scans market news and writes a short digest in the repo notes. I read the summary and add the useful bits to the roadmap without trawling feeds myself.

## Weekly Docs Refresh

Each Friday a bot pulls merged PRs, changelog entries, and TODO updates into a documentation patch, then opens the PR. The backlog stays current even if I never touch it manually.

## AI Maintenance via GitHub Actions

A monthly audit workflow asks a Cursor agent to scan the codebase and draft Markdown repair briefs. A second action reads any open brief and spins up an agent to implement the fix, then clears the file. Maintenance tickets move from discovery to execution without me hand-holding each one.

## Sentry-Triggered Cursor Fixes

Sentry alerts send the payload straight to the Cursor dispatcher. The coding agent spins up a branch with the stack trace, reproduces the bug, and pushes a fix while I review the alert.

## Why It Matters

These automations reduce manual checks, speed up feedback, and keep the solo workflow predictable. I still review every pull request they open, but newer agents like Codex Cloud often land fixes that I can merge on the spot. The lighter process leaves more time for design and new features.
