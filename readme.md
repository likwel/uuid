<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- ABOUT THE PROJECT -->
## UUID Generation Library
# Overview
This project is a lightweight JavaScript library designed to generate UUIDs (Universally Unique Identifiers). UUIDs are a standardized 128-bit format used for unique identification, commonly applied in software development to uniquely identify information without significant central coordination.

# Features
* Version 4 UUIDs: Generates UUIDs based on random or pseudo-random numbers.
* Simple Integration: Easy to integrate into existing JavaScript projects.
* Lightweight: Minimal footprint with no external dependencies.
* Cross-Platform Compatibility: Works seamlessly in both browser and Node.js environments.
* High Performance: Optimized for fast generation of UUIDs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Installation
You can install the library via npm:
* npm
    ```sh
    npm install x-uuid-generator
    ```
Alternatively, you can include it directly in your HTML:
* cdn
    ```sh
    <script src="path/to/x-uuid-generator.js"></script>
    ```
<!-- GETTING STARTED -->
## Getting Started

Here's a quick example of how to generate a UUID using this library:
* Node.js
    ```sh
        // If using Node.js
        const uuid = require('uuid-generator');

        // Generate a random UUID
        const newUUID = uuid.randomUUID();
        console.log(newUUID);

        const seed = 20240613
        // Generate a UUID from a seed
        const custom_uuid = uuid.UUID(seed);

        // Show a UUID value in the console
        console.log(custom_uuid.uuid);

        // Show a UUID encryped in the console
        console.log(custom_uuid.encryped);

        // You can decript custom_uuid.encryped to get a default value
        const decrypted = uuid.decrypt(custom_uuid.encryped);
        console.log(decrypted);
    ```


* CDN
    ```sh

        // Generate a random UUID
        const newUUID = randomUUID();
        console.log(newUUID);

        const seed = 20240613
        // Generate a UUID from a seed
        const custom_uuid = UUID(seed);

        // Show a UUID value in the console
        console.log(custom_uuid.uuid);

        // Show a UUID encryped in the console
        console.log(custom_uuid.encryped);

        // You can decript custom_uuid.encryped to get a default value
        const decrypted = decrypt(custom_uuid.encryped);
        console.log(decrypted);
    ```

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests on the project's GitHub repository.

## License

This project is licensed under the MIT License.