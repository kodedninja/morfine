var morph = require('nanomorph')
var assert = require('assert')

module.exports = morfine

// (fn, ?beforerender, ?afterrender) -> Wrapper {el: DOMNode, rerender || r: fn, afterup}
function morfine (renderer, beforerender, afterrender) {
  assert(typeof renderer === 'function', 'morfine: renderer must be a function')

  var wrapper = {}

  // initialize the element
  wrapper.el = renderer()
  _checkElement(wrapper.el)

  // add lifecycle methods
  if (beforerender) wrapper.beforerender = beforerender
  if (afterrender) {
    wrapper.afterrender = afterrender
    afterrender(wrapper.el)
  }

  wrapper.r = wrapper.rerender = function () {
    var el = wrapper.el // retain reference, as the ID might change on render
    var newtree = renderer()
    _checkElement(newtree)

    // call beforerender | do the update | call afterrender
    if (wrapper.beforerender) wrapper.beforerender(newtree)
    morph(el, newtree)
    if (wrapper.afterrender) wrapper.afterrender(el)
  }

  return wrapper
}

// (DOMNode) -> void, throws Error
function _checkElement (el) {
  if (typeof window !== 'undefined' && (typeof el !== 'object' || !el.tagName)) {
    throw new Error('morfine: renderer must return a DOM node')
  }
}
