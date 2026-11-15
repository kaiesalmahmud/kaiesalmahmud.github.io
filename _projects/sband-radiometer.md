---
title: An S-band radiometer built on a software-defined radio
key: sband-radiometer
summary: I designed, built and calibrated a microwave radiometer that records raw I/Q, so interference can be studied in the same data as the measurement.
period: 2024 to present
where: IMPRESS Lab, University of Georgia
role: Design, assembly, software, calibration
tools: USRP B200-series, Python, Keysight FieldFox, Autodesk Fusion
group: phd
order: 1
featured: true
---

A microwave radiometer measures very weak natural emission. Most radiometers
report only the total power in a protected band. This one is built to work in
a band that is shared with 5G, so it keeps the full raw signal and can be
re-tuned.

## How it is built

- A four-way RF switch cycles between two antenna ports, a hot source and an
  active cold source. One full cycle takes about one second, so the receiver
  is calibrated continuously.
- The front end (isolator, bandpass filter and low-noise amplifier) sits on a
  temperature-controlled aluminum plate.
- A USRP B200-series software-defined radio records raw I/Q at 30 MS/s.
- The system is a three-layer stack: RF, radio, and control and power. It
  runs on a mini-computer with Raspberry Pi nodes, and it can be mounted in a
  stationary box or on a UAS payload frame.

## Software

I wrote the Python software that drives the RF switch, logs temperatures and
controls acquisition. The processing pipeline handles terabytes of
recordings: it removes switching transients, screens outliers, and applies a
two-point calibration.

## Calibration

The active cold source is the reference the whole calibration depends on, so
I characterized it against a liquid nitrogen load at five frequencies and
several plate temperatures. I repeated the measurement in a second campaign
three months later. The two campaigns show approximately 1 K agreement.

## Papers

The instrument is described in our papers at IEEE VTC2026-Fall, IGARSS 2025
and USNC-URSI NRSM 2025. See [publications]({{ '/publications/' | relative_url }}).
