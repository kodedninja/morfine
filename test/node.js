var test = require('tape')
var html = require('nanohtml')
var morfine = require('..')

test('server side rendering', function (t) {
  t.test('renderer required', function (t) {
    t.plan(1)
    t.throws(morfine, 'throws without argument')
  })

  t.test('render', function (t) {
    var wrapper = morfine(renderer)

    t.plan(1)
    t.equal(wrapper.el.toString(), renderer().toString(), 'output equals')
  })
})

function renderer () {
  return html`
    <div>
      <span>render</span>
    </div>
  `
}
