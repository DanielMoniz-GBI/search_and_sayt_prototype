import { action, storiesOf, html, withKnobs, withClassPropertiesKnobs, text, number } from '@open-wc/demoing-storybook'

import readme from '../README.md'
import GBSearch from '../groupby/components/gb-search'
import GBSayt from '../groupby/components/gb-sayt'
import '../groupby/gb.css'
import '../groupby/logicLayer.js'


if (customElements.get('gb-search') === undefined) {
  customElements.define('gb-search', GBSearch)
}
if (customElements.get('gb-sayt') === undefined) {
  customElements.define('gb-sayt', GBSayt)
}

const eventAction = action('Event')
const logEvent = (event) => {
  if (event.detail) return eventAction(event.type, event.detail)
  return eventAction(event.type)
}

const eventsToListen = [
  'keyup',
  'gb-trigger-sayt',
  'gb-request-sayt-suggestions',
  'gb-provide-sayt-suggestions',
  'gb-sayt-start-search',
  'gb-sayt-open',
  'gb-sayt-close',
  'click',
]
eventsToListen.forEach((eventName) => {
  addEventListener(eventName, (event) => logEvent(event))
})

storiesOf('gb-search', module)
  .addDecorator(withKnobs)
  // .add('Documentation', () => withClassPropertiesKnobs(GBSearch), { notes: { markdown: readme } })
  .add(
    'Search + SAYT + Logic',
    () => html`
      <h1>Search with SAYT (and logic layer)</h1>
      <gb-search placeholder="${text('placeholder', 'Search here', 'Group 1')}"></gb-search>
      <gb-sayt></gb-sayt>
    `, { notes: { markdown: readme } },
  )

storiesOf('gb-search', module)
  .addDecorator(withKnobs)
  // .add('Documentation', () => withClassPropertiesKnobs(GBSearch), { notes: { markdown: readme } })
  .add(
    'Search + Logic',
    () => html`
      <h1>Search (with logic layer)</h1>
      <gb-search placeholder="${text('placeholder', 'Search here', 'Group 1')}"></gb-search>
    `, { notes: { markdown: readme } },
  )
