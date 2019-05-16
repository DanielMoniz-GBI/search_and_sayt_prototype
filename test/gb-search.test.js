import { html, fixture, expect } from '@open-wc/testing';

import GBSearch from '../groupby/components/gb-search.js';

if (customElements.get('gb-search') === undefined) {
  customElements.define('gb-search', GBSearch)
}

describe('<gb-search>', () => {
  let el
  beforeEach(async () => {
    el = await fixture(html`<gb-search></gb-search>`);
  })

  describe('events', () => {
    it('triggers gb-trigger-sayt after a keyup when search term has a long enough value', async () => {
      let eventFired = false
      el.searchBox.value = 'bee'
      window.addEventListener('gb-trigger-sayt', () => {
        eventFired = true
      })
      el.dispatchEvent(new Event('keyup'))
      expect(eventFired).to.be.true
    })

    it('triggers gb-trigger-sayt after a keyup when search term is too short', async () => {
      let eventFired = false
      el.searchBox.value = 'be'
      window.addEventListener('gb-trigger-sayt', () => {
        eventFired = true
      })
      el.dispatchEvent(new Event('keyup'))
      expect(eventFired).to.be.false
    })

    it('should fire gb-trigger-sayt with a payload of the search term', async () => {
      let payload
      el.searchBox.value = 'beets'
      window.addEventListener('gb-trigger-sayt', (event) => {
        payload = event.detail
      })
      el.dispatchEvent(new Event('keyup'))

      expect(payload).to.deep.equal({ searchTerm: 'beets' })
    })
  })

  describe('DOM', () => {
    it('should create a search box with default attributes', async () => {
      expect(el).dom.to.equal(`
        <gb-search>
          <input class="gb-search-box" type='text' placeholder='Search here'></input>
        </gb-search>
      `)
    })
  })

  describe('observedAttributes', () => {
    it('should register only searchBox as an observed attribute', () => {
      expect(GBSearch.observedAttributes).deep.equal(['searchBox'])
    })
  })

  describe('searchBox', () => {
    it('contains an input with a class of gb-search-box', async () => {
      const input = el.querySelector('.gb-search-box')
      expect(input).to.be.not.be.undefined
    });

    it('should store a reference to its search box', async () => {
      const input = el.querySelector('.gb-search-box')
      expect(el.searchBox).to.equal(input)
    })

    it('should allow for passing a placeholder attribute', async () => {
      expect(el.searchBox.getAttribute('placeholder')).to.equal('Search here')
      expect(el.placeholder).to.equal('Search here')
      el = await fixture(html`
        <gb-search placeholder="my placeholder"></gb-search>
      `);
      expect(el.searchBox.getAttribute('placeholder')).to.equal('my placeholder')
      expect(el.placeholder).to.equal('my placeholder')
    })
  })

  describe('heading', () => {
    it('should default to example-start-value', async () => {
      expect(el.heading).to.equal('example-start-value');
    })

    it('does not track attribute changes to heading', async () => {
      el = await fixture(html`
        <gb-search heading="different heading"></gb-search>
      `);
      expect(el.heading).to.equal('example-start-value');
    })
  })

  describe('attributeChangedCallback', () => {
    it("should accept an attribute and reflect the new value", async () => {
      expect(el.testAttr).to.equal(undefined)
      el.attributeChangedCallback('testAttr', 'whatever', 'new-value')
      expect(el.testAttr).to.equal('new-value')
    })
  })
});
