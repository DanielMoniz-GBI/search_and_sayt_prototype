export default class GBBaseElement extends HTMLElement {
  fireEvent(name, data) {
    const event = new CustomEvent(name, {
      bubbles: true,
      detail: data,
    })
    this.dispatchEvent(event)
  }
}
