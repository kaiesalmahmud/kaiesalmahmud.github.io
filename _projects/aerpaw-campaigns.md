---
title: Controlled 5G interference experiments at AERPAW
key: aerpaw-campaigns
summary: Field campaigns where known 5G waveforms are transmitted near the radiometer, so every recording comes with ground truth.
period: 2026 to present
where: AERPAW testbed, NC State University, Raleigh, NC
role: Campaign lead
tools: S-band radiometer, AERPAW base stations, Python
group: phd
order: 2
featured: true
---

Interference studies for radiometers usually rely on simulations or on
anechoic chamber tests. AERPAW is an outdoor NSF wireless testbed with
programmable base stations, which lets us run the same kind of controlled
test in a real environment. We choose the waveform, power, frequency and
which base stations transmit, and we record what the radiometer sees.

## Campaigns so far

**April 2026.** A first campaign with the radiometer on a tripod near one
base station. Its main purpose was to test the instrument and the
experimental setup.

**October 2026.** A second campaign over four days:

- 120 experiments at four receiver sites
- up to three base stations transmitting at the same time
- five waveforms
- calibration looks every day
- about 1 TB of raw I/Q

## The dataset

Each recording holds the raw I/Q, the temperature logs, the calibration, and
the ground truth for the transmission. I catalogued the recordings with
standard naming and automated anomaly checks. We are preparing them as an
open dataset for research on interference detection.

## Thanks

This work depends on Dr. Ozgur Ozdemir and the AERPAW team at NC State, and
on Ahmed Manavi Alam for the 5G field experiments.
