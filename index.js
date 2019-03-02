var morph = require('nanomorph')
var assert = require('assert')

module.exports = morfine

// (fn) -> Wrapper {el: DOMNode, rerender || r: fn, afterup}
function morfine (renderer) {
  assert(typeof renderer === 'function', 'morfine: renderer must be a function')

  var wrapper = {}

  // initialize the element
  wrapper.el = renderer()
  _checkElement(wrapper.el)

  wrapper.r = wrapper.rerender = function () {
    var newtree = renderer()
    _checkElement(newtree)

    // call beforerender | do the update | call afterrender
    if (wrapper.beforerender) wrapper.beforerender(newtree)
    var el = morph(wrapper.el, newtree)
    if (wrapper.afterrender) wrapper.afterrender(el)
  }

  return wrapper
}

// (DOMNode) -> void, throws Error
function _checkElement (el) {
  if (typeof el !== 'object' || !el.tagName) {
    throw new Error('morfine: renderer must return a DOM node')
  }
}
