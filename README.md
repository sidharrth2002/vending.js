# Vending.js Frontend
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Vending.js is a web application suite consisting of an api server and a React-based progressive web application. The primary use is to allow customers of a service (in this case vending machines) to post complaints about a machine in a streamlined manner. It also has separate admin and technician interfaces to view complaints, appointments, active technicians and the real-time locations of technicians (not available in beta mode).

The standout feature is the server-side algorithm that calculates the best technician for an appointment based on their real-time locations and the matrix formed by their existing appointments. This algorithm is explained in further detail.

## Features within Vending.js
- [x] QR Code generation for individual vending machines
- [x] Auto Routing for the team of technicians
- [x] Automated dispatch for techician
- [x] Chat Bot (To Make Complaints) - react-simple-chatbot
- [x] Interface for Administrator(s)
- [x] Interface for Technicians
- [x] Ability to decline and takeover existing appointments, retriggering the technician dispatch algorithm

Read the full documentation [here](https://mathsforgeeks.org/vending-js-docs/), including the explanation of the algorithm.


Sidharrth Nagappan, Shaon Mak Yen Wei and Cornelius Pang, 2021 
