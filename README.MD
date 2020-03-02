# react-scrollbooster

## Features

- 🎣 **Hooks or Component API**

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
const [viewport, content, scrollbooster] = useScrollBoost(options)
```

Call the `useScrollBoost` hook with the (optional)
[options](#options) you need. It will return a tuple containing a `viewport` and `content` reference and the
scrollbooster `scrollbooster` (see:
[`ScrollBooster`](https://github.com/ilyashubin/scrollbooster).)
Assign the `viewport` to the DOM element that contains the content and the `content` to the DOM element you want to make scrollable.

```jsx
import { useScrollBoost } from 'react-scrollbooster'

const Component = () => {
    const [viewport, content, scrollbooster] = useScrollBoost({
        direction: 'horizontal',
        friction: 0.2,
        scrollMode: 'native',
        // optional options
    });

    return (
        <div ref={viewport}>
            <div ref={content}>
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

If you prefer to use the good old render props approach, that's possible too. In order to use it, you need to use the `<ScrollBoost>` component and assign its reference props (`viewport`, `content`) to the inner component.

If you need it, you can also access the
`ScrollBooster` instance.

```jsx
import { ScrollBoost } from 'react-scrollbooster'

const Component = () => (
    <ScrollBoost>
        {({ viewport, content, scrollbooster }) => (
            <div ref={viewport}>
                <div ref={content}>
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

## TODO:

- [ ] write out readme more
- [ ] add codesandbox examples (basic, react-window)
- [ ] add tests with RTL?
- [ ] implement types from [`@types/scrollbooster`](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42745) (opened PR)
