---
title: Semi-supervised federated learning that resists poisoned nodes
key: federated-learning
summary: A federated learning method that uses selective knowledge distillation to keep learning when some participants send bad updates.
period: 2022 to 2023
tools: PyTorch
group: earlier
order: 2
links:
  - { label: "Code on GitHub", url: "https://github.com/kaiesalmahmud/SKD-FL" }
---

In federated learning, many devices train a shared model without sharing
their data. Two practical problems are that most of the data is unlabeled and
that some devices may send corrupted updates.

Our method combines semi-supervised training with knowledge distillation, and
it selects which knowledge to pass on. In our experiments it stayed robust
with up to 40% of the nodes poisoned.

Published at IEEE BigData 2025.
