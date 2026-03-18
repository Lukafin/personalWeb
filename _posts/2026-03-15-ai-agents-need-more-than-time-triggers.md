---
layout: post
title: "AI agents need more than time triggers"
date: 2026-03-15 09:00:00 +0100
categories: [ai, agents, calm-tech]
---

When I look at projects like OpenClaw, I keep thinking the same thing: schedule-based automation is useful, but it is only a small slice of what an agent should react to.

Time is a convenient trigger because it is easy to implement. "Run every morning at 7" or "check this every hour" is much better than nothing. But real life is not organized around cron jobs. The useful moments for an agent are often triggered by context: a sound, a camera event, a door opening, a temperature change, a movement sensor, a phone connecting to the home network, or some combination of signals that says, "now this matters."

That is the direction I want more agent systems to move toward. An agent should not just wake up because the clock says so. It should wake up because something meaningful happened.

I am also experimenting with some of this now in my Lutkar projects. What interests me there is not just talking to an agent on demand, but pushing toward systems that can stay in the background, react to richer context, and only step forward when there is a good reason.

## Time Is a Weak Proxy for Relevance

Most reminders and automations are still built as if time is the primary source of truth. That works for recurring chores, but it breaks down fast for everything else.

If I want an agent to help me at home, I do not actually care that it runs at 18:00 every day. I care that it notices the kids are asleep, that someone arrived home, that the washing machine finished, that the weather changed, that the living room got noisy, or that a package is at the door. Those are the events that make information timely.

The same is true for personal productivity. Maybe the right trigger is not 9 AM, but the moment I sit at my desk, put on headphones, and open my laptop. Maybe it is when my camera sees I am away, so a message can wait. Maybe it is when the ambient noise drops and a short spoken summary becomes acceptable. A good agent should be able to use these signals instead of pretending every day is identical.

## Multiple Triggers Make Agents Feel More Native

What I want is a system where time is just one trigger among many:

- sound
- camera
- presence sensors
- motion sensors
- device state
- location
- environmental sensors
- app and calendar context

Once agents can combine these inputs, they stop feeling like glorified scheduled scripts and start feeling like background systems that are actually aware of the situation they are serving.

This is also where AI becomes much more interesting. The job is not only to execute a task after a trigger fires. The job is to interpret weak signals, decide whether something deserves action, and then choose the right level of intervention.

## We Finally Have the Chance to Build Calm Tech Properly

This is why I think the current wave of agents gives us a real shot at building [Calm Technology](https://en.wikipedia.org/wiki/Calm_technology) properly.

The old dream of calm tech was that computers would move more into the periphery, stay out of the way, and surface information without constantly demanding attention. That idea always felt right, but the systems were too dumb. They could notify, but they could not really judge.

That was the hard part for a long time. Scott Jenson's piece on ["EasyHard" home automation](https://jenson.org/easyhard/) still feels right: the naive rule sounds simple, but the real world immediately piles on edge cases, exceptions, and social context. Turning on the lights when someone enters a room sounds trivial until someone is sleeping, a pet triggers the sensor, or the system needs to understand intent instead of just motion.

Older automation stacks mostly left those details to brittle rules and endless manual tweaking. What feels different now is that we finally have a credible shot at handling more of that nuance. Models are still imperfect, but they are much better at weighing context, picking conservative defaults, and taking care of the messy details that used to make calm interactions fall apart.

Now we finally have models that can reason about context well enough to ask:

- Does this actually need the user right now?
- How urgent is it?
- Is this best shown visually, spoken out loud, deferred, or ignored?
- Should I use a subtle signal first and escalate only if nothing happens?

That last part matters a lot. The value is not just in detecting that something needs attention. The value is in deciding how to contact us.

Sometimes the right answer is a tiny ambient cue. Sometimes it is a silent notification. Sometimes it is a light pulse in the room, a symbol on a small display, a vibration on a watch, or a short spoken prompt because the user is already moving around and not looking at a screen. And sometimes the correct action is no interruption at all.

I am also aware this really needs strong local AI models to be acceptable. If every useful trigger has to be shipped off-device to the cloud, this becomes an even faster death of privacy instead of a better human-computer interface.

Google's [Little Signals](https://littlesignals.withgoogle.com/) is still one of my favorite references here because it explores exactly this idea: information does not always need to arrive as another loud rectangle on a phone. It can be physical, ambient, peripheral, and calm.

It is also interesting to watch which mobile OS will first admit that most apps are increasingly things of the past. I can easily imagine the phone becoming more of a coordination layer: the place where we connect all the services we use and all the home hardware that can ping us, while the agent decides what deserves attention and how it should surface.

That is part of why I still think devices like the Rabbit R1 and Humane AI Pin got a lot of things right, even if the execution did not fully land. They were pushing on an important idea: interaction should be more ambient, less app-centric, and less dependent on staring at a grid of icons. In that sense they remind me a bit of [General Magic](https://en.wikipedia.org/wiki/General_Magic): the core idea was important, but execution and timing were too early. My guess is that a bigger tech player will take some of those instincts, improve the implementation dramatically, and execute the idea much better.

I also catch myself thinking too much in the old categories: web app, mobile app, desktop app. That language is still useful, but it already feels a bit outdated compared to how I actually work. More and more, I mostly use agents for what I do, and the interface category matters less than whether the system can act, observe context, and reach me well when needed. The [agentic os: the next ui revolution](https://zeitraum.blog/en/post/019ccea8-6ff7-7423-8fab-3c2c0825168d) article captures that feeling very well for me.

## The Best Agent May Be the One You Barely Notice

The ideal future is not an AI that constantly talks to us. It is an AI that works in the background, quietly, using multiple triggers to understand when work should start and when attention is actually warranted.

That means two design problems matter as much as the model itself:

1. How does the agent know that now is the right time to act?
2. If it needs me, what is the least annoying way to reach me?

I think this is where agent products can become genuinely better than today's assistants. Not by becoming louder or more chatty, but by becoming more situationally aware and more respectful of human attention.

Time triggers are a good start. But they should be just one sensor in a much larger system. I hope this kind of technology arrives sooner rather than later, because I do not want to watch my kids' brains get shaped by the same addictive patterns that already trap so many kids today, and plenty of adults too. I also hope Jony Ive, or someone else with that level of product taste and discipline, helps finally make this work properly.
