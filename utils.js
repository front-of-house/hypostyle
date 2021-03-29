function px (v) {
  return typeof v === 'number' ? v + 'px' : v
}

function str (v) {
  return v + ''
}

function percOrPx (v) {
  return typeof v === 'number' ? (v <= 1 ? v * 100 + '%' : v + 'px') : v
}

module.exports = {
  px,
  str,
  percOrPx
}
