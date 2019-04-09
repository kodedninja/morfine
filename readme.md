# morfine
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
  <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" alt="Stability"/>
</a>
<a href="https://www.npmjs.com/package/morfine">
  <img src="https://img.shields.io/npm/v/morfine.svg?style=flat-square" alt="NPM version"/>
</a>

Pure, stateless wrapper around [nanomorph](https://github.com/choojs/nanomorph).


## Installation
```
npm i morfine
```

## Usage
```javascript
var morfine = require('morfine')
var html = require('nanohtml')

window.text = 'hello'

function render () {
  return html`
    <div>
      <a href="#">${window.text}</a>
    </div>
  `
}

var wrapper = morfine(render)
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

```

## API
#### `wrapper = morfine(renderer[, beforerender, afterrender])`
Takes a `renderer` function that returns a `Node` (manually defined or from [`nanohtml`](https://github.com/choojs/nanohtml) for example). Optionally you can set the lifecycle methods here. You must do this if calling `afterrender` on the first render is needed. Returns a `wrapper` object.

#### `wrapper.el`
The `Node` itself. This is what you add to the `body`.

#### `wrapper.rerender()`
Calls the `renderer` again and morphs the DOM.

#### `wrapper.r()`
Alias for `wrapper.rerender()`

#### `wrapper.beforerender(el)`
Optional lifecycle method. Called after the new tree has been generated, but before the wrapper update. You can directly access and modify `el`.

#### `wrapper.afterrender(el)`
Optional lifecycle method. Called after the wrapper has been updated. You can directly access and modify `el`, the current element in the DOM.

Note: [`nanocomponent`](https://github.com/choojs/nanocomponent) uses the `afterupdate` name instead of `afterrender`, but in this case we always try to update, so let's stick to render.

## Why?
Similar to what I've tried to achieve in [`bik`](https://github.com/kodedninja/bik), using the power of `nanomorph` on the lowest level possible in a non-Choo environment. Plus lifecycle methods, because they might come handy.

## See Also
- [choojs/nanomorph](https://github.com/choojs/nanomorph)
- [choojs/nanocomponent](https://github.com/choojs/nanocomponent)
- [tornqvist/fun-component](https://github.com/tornqvist/fun-component)
