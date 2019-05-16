
# Web Component POC: Search and SAYT

A rough proof of concept for Search and SAYT (Search-as-you-type) elements using web components. It is built entirely in vanilla JS in order to learn whether or not it's reasonable to build/maintain web components without the help of a framework like [LitElement](https://lit-element.polymer-project.org/).

Uses [Open-WC](https://open-wc.org) ([GitHub](https://github.com/open-wc/open-wc)) to add tests against web components. Tests run in browser environments using [karma](https://karma-runner.github.io).

## To run

`npm build` --> builds into the `dist/` directory

`npm start` --> visit http://localhost:8080/

`npm run watch` --> watch for changes and rebuild

## To test

`npm test` --> runs tests and creates coverage report

`npm run test:watch` --> runs tests continually (no coverage report)

## Organization

Prototype GroupBy code is under the `groupby/` directory. Sample client code, which incorporates the relevant components, is in `client/`. No framework was used for the client.

## To do
* Add tests
  * functional
  * snapshot
