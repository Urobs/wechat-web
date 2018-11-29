function getBasicUrl (obj) {
  if (obj.node) { obj = obj.node }
  if (obj.__typename === 'GraphImage') {
    return obj.display_url
  } else if (obj.__typename === 'GraphVideo') {
    return obj.video_url
  } else {
    return null
  }
}

module.exports = function (data) {
  let sourceType = null
  if (data.__typename === 'GraphSidecar') {
    data = data.edge_sidecar_to_children.edges
    sourceType = data[0].node.__typename
  } else {
    sourceType = data.__typename
    data = [data]
  }
  const sourceUrls = data.map(getBasicUrl)
  return { sourceUrls, sourceType }
}