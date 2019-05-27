
fetch("https://s3.amazonaws.com/groupby-sample/mock-data.json")
  .then(response => response.json())
  .then(jsonData => window.mockData = jsonData)
