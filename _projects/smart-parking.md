---
title: Smart parking with camera-based occupancy and plate reading
key: smart-parking
summary: An end-to-end system that tracks which parking slots are occupied and reads Bengali license plates from live CCTV streams.
period: "Jan to May 2023"
where: Bondstein Technologies, Dhaka
role: Junior machine learning engineer
tools: YOLOv8, OpenCV, Python
group: earlier
order: 1
featured: true
links:
  - { label: "Code on GitHub", url: "https://github.com/kaiesalmahmud/smart-parking" }
  - { label: "Demo videos", url: "https://youtube.com/playlist?list=PL_z9CsGY5aWaGXuF_rLssy94Zh0DSZq4F" }
---

I built this system from data collection to the running service. It was later
deployed commercially.

## Occupancy

Two cameras watch the parking area, and each one is processed in its own
thread. Every slot is defined as a region in the camera view. A YOLOv8 model
detects cars, and a slot counts as occupied when the center of a car falls
inside its region. The status of every slot is sent to the parking panel
through an API every five seconds.

The detector was first trained on a public parking dataset and then
fine-tuned on images from each camera.

## License plates

A separate camera reads plates from moving vehicles in two
steps. One model finds the plate in the frame. A second model reads the
Bengali characters on the cropped plate. The result is checked against the
expected plate format before it is sent to the server.

## The rest of the job

I also set up the GPU machines, the CCTV cameras and the network, wrote the
scripts that collect training images from the camera streams, and labeled the
data.
