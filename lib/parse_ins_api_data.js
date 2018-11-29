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
  if (data.__typename === 'GraphSidecar') {
    data = data.edge_sidecar_to_children.edges
  } else {
    data = [data]
  }
  return data.map(getBasicUrl)
}