---
title: Research
permalink: /research/
lead: I study how microwave radiometers can keep working in spectrum that they share with 5G and other transmitters.
---

## The problem

Microwave radiometers measure the faint natural emission of the Earth.
Climate variables such as soil moisture and sea surface salinity are derived
from these measurements. The signal is very weak, so man-made transmissions
can easily contaminate it. This contamination is called radio frequency
interference, or RFI.

A few narrow bands are reserved for passive sensing. Most of the spectrum is
shared, and it is getting busier. To study radiometry in shared spectrum we
need three things that are hard to find today: an instrument that can work
outdoors next to real transmitters, real recordings where the interference is
known, and a radiometer that can react to interference while it measures.

## My dissertation

*Toward RFI-Aware Microwave Radiometry in Unprotected Bands: Instrument,
Ground-Truth Dataset, and Onboard Adaptation*

I work in the IMPRESS Lab at the University of Georgia with
Dr. Mehmet Kurum, in collaboration with Dr. Ali C. Gurbuz at NC State. The
dissertation has four parts.

<div class="part" markdown="1">

### The instrument <span class="chip done">Completed</span>

An S-band radiometer built on a software-defined radio. It switches between
the antenna, a hot source and an active cold source about once per second, so
it is calibrated continuously. It records raw I/Q, which keeps the full
spectrum available for interference analysis. I characterized the cold source
against liquid nitrogen in two separate campaigns, with approximately 1 K
agreement between them.
[More about the instrument]({{ '/projects/sband-radiometer/' | relative_url }})

</div>
<div class="part" markdown="1">

### Controlled experiments at AERPAW <span class="chip ongoing">Ongoing</span>

AERPAW is an outdoor NSF wireless testbed at NC State with programmable 5G
base stations. We transmit known waveforms near the radiometer, so every
recording has ground truth. Two campaigns are complete. The second ran 120
experiments at four receiver sites and produced about 1 TB of raw I/Q. We are
preparing the recordings as an open dataset for RFI detection.
[More about the campaigns]({{ '/projects/aerpaw-campaigns/' | relative_url }})

</div>
<div class="part" markdown="1">

### Onboard detection and adaptive re-tuning <span class="chip proposed">Proposed</span>

The next step is a radiometer that reacts while it measures. A compact
detector will run on the instrument's own computer, flag the contaminated
parts of the spectrum, and re-tune the radio to a cleaner window. I will test
whether this adaptive operation gives better measurements than staying on a
fixed frequency.

</div>
<div class="part" markdown="1">

### A digital twin of the testbed <span class="chip proposed">Proposed</span>

A simulation of the whole experiment: the natural emission of the scene, the
propagation of the 5G signals, and the receiver. It will produce synthetic
recordings in the same format as the real dataset. I will use it to test how
much real data we can save by training detectors on simulated data first, and
to explore scenarios we can't easily test in the field.

</div>

## Support

This work is supported by the National Science Foundation under awards
2332661 and 2332662. I also thank Dr. Md Mehedi Farhad for his work on
instrument development, Ahmed Manavi Alam for the 5G
field experiments, and Dr. Ozgur Ozdemir and the AERPAW team.
