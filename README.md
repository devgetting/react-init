# @devgetting/react-init

A React library with easier configuration  🚀

## Basic installation

We need to have already installed these libraries with correct versions.

## Libraries
 
- [React](https://www.npmjs.com/package/react)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [Typescript 4.8.3 and later](https://www.npmjs.com/package/typescript)
- [@types/react 18.0.18 and later](https://www.npmjs.com/package/@types/react)
- [@types/react-dom 18.0.6 and later](https://www.npmjs.com/package/@types/react-dom)

These libraries are required to start with React development (obviously 😜).

#### Installing @devgetting/react-init via `npm`
```bash
  npm install @devgetting/react-init
```

## Usage/Examples

### Initializing our React project

The first configuration is calling the `ReactApplication` class with the static `run` method. The method requires the id from `index.html` file into our `index.ts`

```typescript
import { ReactApplication } from '@devgetting/react-init';

ReactApplication.run("root")
```

### Creating our first view
To create our first view into this implementation, we need create some files.

#### Component.tsx
```typescript
import React from 'react';

export default function() {
    return <h1>This is our first component</h1>
}
```

This file requires to be exported with normal function to work with the current class instance that we are going to see bellow.

#### ComponentView.ts 
```javascript
import { View } from '@devgetting/react-init/decorators';
import Component from '../components/Component';

@View({
    component: Component,
    baseUrl: '/'
})
export class ComponentView {}
```

#### Registering view

```javascript
import { ReactApplication } from '@devgetting/react-init'
import { ComponentView } from './views/ComponentView';

ReactApplication.run("root")
  .view(ComponentView)
```

## Component actions

This library doesn't use `useState` hook to make changes to the current components. To create events like hook does, we need to use the `@action` decorator.

```javascript
// ===============================================

import { View } from '@devgetting/react-init/decorators';
import Component from '../component/Component';

@View({
  component: Component,
  baseUrl: '/'
})
export class ComponentView {
  email: string;

  @action
  setEmail(email: string) {
    this.email = email;
  }
}

// =======================================
import React from 'react';
import { ComponentView } from '../views/ComponentView';

export function(this: ComponentView) {
  return (
    <React.Fragment>
      <input 
        type="text" 
        value={this.username} 
        onChange={(e) => this.setEmail(e.target.value)} 
      />
      <p>{ this.email }</p>
    </React.Fragment>
  )
}
```

## @routing decorator

If you want to manage redirection from a view to another one, you have to use the `@routing` decorator and the `Routing` Type.

#### ComponentView.ts
```javascript
import Component from '../components/Component';
import { Routing } from '@devgetting/react-init';
import { routing, View } from '@devgetting/react-init/decorators';

@View({
  component: Component,
  baseUrl: '/'
})
export class ComponentView {
  @routing
  history: Routing;
}
```

#### Component.tsx
```javascript
import React from 'react';
import { ComponentView } from '../views/ComponentView';

export default function(this: ComponentView) {
  return (
    <button onClick={() => this.history.redirect('/about')}>Go to About</button>
  )
}
```

## Registering new views

In case you want to add a new view you just have to add it into the `ReactApplication` class on your `index.ts` file.

```javascript
import { ReactApplication } from '@devgetting/react-init';
import { ComponentView } from './views/ComponentView';
import { AboutView } from './views/AboutView';

ReactApplication.run("root")
  .view(ComponentView)
  .view(AboutView)
```
