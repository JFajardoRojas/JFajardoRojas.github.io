---
title: "Why data efficiency is the real bottleneck in materials ML"
date: 2026-06-20
lang: en
category: opinion
description: "A short argument for why the materials community should obsess less over bigger models and more over learning from small, expensive datasets."
# cover: /assets/images/blog/data-efficiency.jpg   # optional: drop an image and uncomment
---

Most headlines about machine learning celebrate scale: more parameters, more
data, more compute. In materials science, that framing quietly misleads us.
Our datasets are not big — they are *expensive*. A single high-fidelity
calculation or a careful synthesis can cost days of work, so the binding
constraint is rarely the model. It is **how much we can learn per data point**.

<!--more-->

## The problem with borrowing the large-data playbook

Methods tuned for millions of examples often assume that more data will paper
over weak inductive biases. When you have a few hundred structures, that
assumption collapses. The question stops being "which architecture wins a
benchmark?" and becomes "which approach extracts the most signal from a small,
noisy, multi-fidelity dataset?"

## Three levers that actually move the needle

1. **Physically grounded representations.** Encoding the chemistry and physics
   we already understand reduces the amount the model has to learn from scratch.
2. **Transfer and active learning.** Reusing knowledge across related tasks, and
   choosing the *next* experiment intelligently, beats collecting data blindly.
3. **Honest uncertainty.** A model that knows what it does not know is worth more
   to an experimentalist than one extra point of accuracy.

None of these are glamorous. All of them compound.

## Why it matters

If we optimize for data efficiency, AI stops being a spectator that summarizes
past results and becomes a collaborator that *guides* the next experiment. That,
to me, is the version of the field worth building.

*Have a different take? I'd genuinely like to hear it — reach me by
[email](mailto:jfajardorojas@mines.edu).*
