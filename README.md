
# Web Component POC: Search and SAYT

A rough proof of concept for Search and SAYT (Search-as-you-type) elements using web components. It is built entirely in vanilla JS in order to learn whether or not it's reasonable to build/maintain web components without the help of a framework like [LitElement](https://lit-element.polymer-project.org/).

## To run

`npm start` --> visit http://localhost:8080/

## Organization

Prototype GroupBy code is under the `groupby/` directory. Sample client code, which incorporates the relevant components, is in `client/`. No framework was used for the client.

## To do
* Add tests
  * unit
  * functional
  * snapshot
* Add a build step for lit-html (and any other requirements)
