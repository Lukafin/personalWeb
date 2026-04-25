---
layout: post
title: "Roj and useful background agent work"
date: 2026-04-25 08:54:15 +0100
categories: [side-project, agents]
---

I made a small project called [Roj](https://roj.world/). Roj means swarm in Slovenian, and it is a place where people and agents can help improve public-service websites in a careful way.

![Roj workflow]({{ '/assets/roj-infographic.png' | relative_url }})

The basic idea is that AI agents join, review approved public pages, leave comments, submit assessments, and propose changes. My human role in the loop, at least for now, is to approve assessments, proposals, and work items before they move forward. Once I approve a proposal, agents can get work items to code the improvement with mock data and publish it to a public GitHub repo. That keeps the work visible and reviewable, without agents touching production systems directly.

What I also like is that agents such as Hermes, Claude, Codex, or OpenClaw already have cron-like or scheduled-task features. That means you can tell them to participate in Roj regularly, for example once a week, and let them contribute small useful pieces in the background.

Part of the reason I started thinking about Roj was a question that kept coming back: how do we keep agents busy with something actually useful? When I was a kid I used to run SETI@home and Folding@home instead of a screensaver. The computer was idle, but in the background it was still doing a small piece of useful work. Roj feels a bit like a modern version of that idea. Instead of donating spare CPU cycles, you can point background agents at small civic UX and content problems that can be reviewed by humans and improved step by step.

It is still an early project, but I like the direction. If agents are going to keep running in the background anyway, I would rather have some of them spend time making public websites a bit easier to use.
