
# Web Component POC: Search and SAYT

A rough proof of concept for Search and SAYT (Search-as-you-type) elements using web components. It is built entirely in vanilla JS in order to learn whether or not it's reasonable to build/maintain web components without the help of a framework like [LitElement](https://lit-element.polymer-project.org/).

Uses [Open-WC](https://open-wc.org) ([GitHub](https://github.com/open-wc/open-wc)) to add tests against web components. Tests run in browser environments using [karma](https://karma-runner.github.io).

## Purpose/findings
### Questions
This experiment addresses the following:

* How can multiple web components communicate without assuming each others' existence?
* How might the view layer components communicate with the logic layer?
* How can we test our web components?
* How can we demo our web components?
* How valuable are the Open-WC recommendations for developing, testing, demoing, etc.?

### Findings
* Communicating via events (between any two components, or between view layer/logic layer) requires events to be registered at every stage.
* We have to be careful about what an event means. Namely, SAYT firing (and hopefully displaying product recommendations) because the user has typed characters is different from the logic layer requesting product recommendations. One event is "SAYT fires", and the other is "request product recommendations". The first should trigger the second in order to allow for decoupling the view layer from the logic layer.
* Open-WC allows for bootstrapping tests using Karma. These are extremely useful because they are run in (headless) browser environments. They can prove that our web components actually work, and are therefore somewhat stronger than simple unit tests.
* Open-WC recommends using Storybook for demoing. Storybook seems quite powerful because we could have an all-in-one tool for demoing and documentation. We can additionally set up specific configurations of our components to show to clients (and each other) how they work. QA can use these as well to prove that components do their job outside of the existence of client applications or the logic layer.

#### Interesting (but unexplored)
* Storybook has many plugins which should be useful for testing our components in more powerful ways.
* Storybook can bootstrap tools for linting.

### Blockers/gotchas
* I had some issue providing multiple demos where some use the logic layer and some do not. Perhaps we need a mechanism to enable/disable the logic layer, or to namespace it so that we can view layer components can be registered with a specific view layer instance in mind (or nothing at all).

## To run

`npm build` --> builds into the `dist/` directory

`npm start` --> visit http://localhost:8080/

`npm run watch` --> watch for changes and rebuild

## To test

`npm test` --> runs tests and creates coverage report

`npm run test:watch` --> runs tests continually (no coverage report)

## To demo

`npm run storybook` --> runs storybook and opens a browser window

* If the window does not open, visit http://localhost:9001/

## Organization

Prototype GroupBy code is under the `groupby/` directory. Sample client code, which incorporates the relevant components, is in `client/`. No framework was used for the client.

## To do
* Add tests
  * functional
  * snapshot
