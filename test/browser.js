var test = require('tape')
var html = require('nanohtml')
var fake = require('fek')
var morfine = require('..')

test('server side rendering', function (t) {
  t.test('renderer required', function (t) {
    t.plan(1)
    t.throws(morfine, 'throws without argument')
  })

  t.test('render', function (t) {
    var wrapper = morfine(renderer)

    t.plan(1)
    t.equal(stringify(wrapper.el), stringify(renderer()), 'output equals')
  })

  t.test('render must return a DOM Node', function (t) {
    t.plan(1)
    t.throws(morfine.bind(undefined, function () {
      return { fake: true }
    }), 'morfine: renderer must return a DOM node')
  })

  t.test('rerenders', function (t) {
    var text = 'hello'
    var wrapper = morfine(function () {
      return html`<div>${text}</div>`
    })

    t.plan(2)
    t.equal(stringify(wrapper.el), '<div>hello</div>', 'before')
    text = 'world'
    wrapper.r()
    t.equal(stringify(wrapper.el), '<div>world</div>', 'before')
  })

  t.test('lifecycle methods are called', function (t) {
    var wrapper = morfine(renderer)

    var before = fake()
    var after = fake()
    wrapper.beforerender = before
    wrapper.afterrender = after

    wrapper.r()

    t.plan(3)
    t.equal(before.callCount(), 1, 'before was called')
    t.equal(after.callCount(), 1, 'after was called')
    t.deepEqual([wrapper.el], after.lastArgs(), 'the current elements is passed to afterrender')
  })
})

function renderer () {
  return html`
    <div>
      <span>render</span>
    </div>
  `
}

function stringify (el) {
  var wrapper = document.createElement('DIV')
  wrapper.appendChild(el)
  return wrapper.innerHTML
}
