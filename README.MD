# react-scrollbooster

[![npm version](https://badge.fury.io/js/react-scrollbooster.svg)](https://badge.fury.io/js/react-scrollbooster)

## Features

- 🎣 **Hooks or Component API**
- TypeScript support

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add react-scrollbooster
```

or NPM:

```sh
npm install react-scrollbooster --save
```

## Usage

### Hooks 🎣

#### `useScrollBoost`

```js
const [viewport, scrollbooster] = useScrollBoost(options)
```

Call the `useScrollBoost` hook with the (optional)
[options](#options) you need. It will return a tuple containing a `viewport` reference and the
scrollbooster `scrollbooster` (see:
[`ScrollBooster`](https://github.com/ilyashubin/scrollbooster).)
Assign the `viewport` to the DOM element that contains the content you want to make scrollable.

```jsx
import { useScrollBoost } from 'react-scrollbooster'

const Component = () => {
    const [viewport, scrollbooster] = useScrollBoost({
        direction: 'horizontal',
        friction: 0.2,
        scrollMode: 'native',
        // ...optional options
    });

    return (
        <div ref={viewport}>
            <div>
                <h2>Drag to scroll</h2>
            </div>
            <button onClick={() => {
                if(scrollbooster){
                    console.log(scrollbooster.getState());
                }
            }}>Click me!</button>
        </div>
  )
}
```

### Render props

If you prefer to use the good old render props approach, that's possible too. In order to use it, you need to use the `<ScrollBoost>` component and assign its reference prop (`viewport`) to the inner component.

If you need it, you can also access the
`ScrollBooster` instance.

```jsx
import { ScrollBoost } from 'react-scrollbooster'

const Component = () => (
    <ScrollBoost>
        {({ viewport, scrollbooster }) => (
            <div ref={viewport}>
                <div>
                    <h2>Drag to scroll</h2>
                </div>
                <button onClick={() => {
                    if(scrollbooster){
                        console.log(scrollbooster.getState());
                    }
                }}>Click me!</button>
            </div>
        )}
    </ScrollBoost>
)

export default Component
```

## FAQ

### How can i assign multiple ref's to a component?

You can wrap multiple `ref` assignments in a single `useCallback` which acts as a [`callback ref`]('https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node'):

```js
const setRefs = useCallback(
  node => {
    // Ref's from useRef needs to have the node assigned to `current`
    ref.current = node
    // Callback refs, like the one from `useScrollBoost`, is a function that takes the node as an argument
    viewport(node)
  },
  [viewport],
)
```

## TODO:

- [ ] write out readme more
- [ ] add documentation with JSDoc
- [ ] add codesandbox examples (basic, react-window)
- [ ] add tests with RTL?
