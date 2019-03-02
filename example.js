var morfine = require('.')
var html = require('nanohtml')

window.text = 'hello'

function render () {
  return html`
    <div>
      <a href="#">${window.text}</a>
    </div>
  `
}

// initialize wrapper
var wrapper = morfine(render)
// append it to body
document.body.appendChild(wrapper.el)

// attach optional lifecycle methods
wrapper.beforerender = function (el) {
  console.log(el, ' will be rendered')
}
wrapper.afterrender = function (el) {
  console.log(el, ' was rerendered')
}

// attach the function to window for testing purposes
window.rerender = wrapper.rerender
