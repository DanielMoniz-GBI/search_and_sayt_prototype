const cache = (function() {
  const cache = {}
  return {
    get: function(key) {
      return cache[key]
    },
    set: function(key, value) {
      cache[key] = value
    },
  }
})();

(function() {
  console.log('Logic layer loaded...');
  let mockData
  getInitialMockData()

  document.addEventListener('gb-request-sayt-suggestions', (event) => {
    const searchTerm = event.detail.searchTerm
    if (!searchTerm) { return }

    const cachedResponse = cache.get(searchTerm)
    if (cachedResponse) {
      return dispatchSaytSuggestions(cachedResponse)
    }

    const quantity = event.detail.quantity || 5
    search(searchTerm, quantity)
  })

  function search(searchTerm, quantity) {
    const products = mockData.filter(product => {
      return product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    }).slice(0, quantity)

    const searchInfo = {
      searchTerm,
      quantity,
      products,
    }
    dispatchSaytStartSearching()
    setTimeout(() => {
      getInitialMockData().then(() => {
        dispatchSaytSuggestions(searchInfo)
        cache.set(searchTerm, searchInfo)
      })
    }, 400)
  }

  function dispatchSaytSuggestions(data) {
    const responseEvent = new CustomEvent('gb-provide-sayt-suggestions', {
      bubbles: true,
      detail: data,
    })
    dispatchEvent(responseEvent)
  }

  function dispatchSaytStartSearching() {
    const event = new CustomEvent('gb-sayt-start-search', {
      bubbles: true,
    })
    dispatchEvent(event)
  }

  function getInitialMockData() {
    return fetch("https://s3.amazonaws.com/groupby-sample/mock-data.json")
      .then(response => response.json())
      .then(data => mockData = data)
  }
})()
