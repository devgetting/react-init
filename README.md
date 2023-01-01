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

  ### About Create React App CLI
  This library is not supported into CRA projects, due decorator structure is an experimental proposal and it may change in the future. But don't worry, if this change in the future, we'll fix it 🥲.

  If you want to see more about why CRA is not accepting this structure, see [Can I Use Decorators?](https://create-react-app.dev/docs/can-i-use-decorators/)

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
```typescript
import { View } from '@devgetting/react-init';
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
  .start()
```

## Component actions

This library doesn't use `useState` hook to make changes to the current components. To create events like hook does, we need to use the `@action` decorator.

```typescript
// ===============================================

import { View } from '@devgetting/react-init/';
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
import { Routing, routing, View } from '@devgetting/react-init';

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

## Route Params

If you require params into the URL you can add params into `params` array of `@View` decorator.

```typescript
@View({
  component: Component,
  baseUrl: '/user',
  params: [':userid']
})
export class ComponentView {}
```

This will make available a route like this: `http://localhost:3000/dashboard/<userid>`

## Getting specific param

If you want to catch a view param is necessary use the `@param` decorator.

```typescript
@View({
  component: Component,
  baseUrl: '/dashboard',
  params: [':userid']
})
export class ComponentView {
  @param('userid')
  userId: string;
}
```

If route is `http://localhost:3001/dashboard/2` this property will retreive `2`.

## Registering new views

In case you want to add a new view you just have to add it into the `ReactApplication` class on your `index.ts` file.

```typescript
import { ReactApplication } from '@devgetting/react-init';
import { ComponentView } from './views/ComponentView';
import { AboutView } from './views/AboutView';

ReactApplication.run("root")
  .view(ComponentView)
  .view(AboutView)
  .start();
```
## Custom Not Found View

In case user access to a not registered URL, a 404 page is going to be show it by default but if you want a custom 404 view, you can do it creating a simple React component.

```typescript
// components/NotFound.tsx
import React from 'react';

const NotFound = () => (
  <>
    <h1>Page not found</h1>
    <p>This route is not available</p>
  </>

);

export default NotFound;

// src/index.ts

import { ReactApplication } from '@devgetting/react-init';
import { ComponentView } from './views/ComponentView';
import { AboutView } from './views/AboutView';
import NotFound from './components/NotFound';

ReactApplication.run("root")
  .view(ComponentView)
  .view(AboutView)
  .notFound(NotFound)
  .start()
```

## Context & Listener
An important feature into react is the way we can create context to share information between components avoiding cascade props with the child components. `@devgetting/react-init` provides us a simple way to share this information into different components.

#### Creating a Listener
to create a Listener we just need to create a new class and add the `@Listener` decorator.

```typescript
import { Listener } from '@devgetting/react-init';

@Listener
export class HomeViewListener {}
```

We need register our `Listener` into our view class

```typescript
@View({
  //baseUrl & component defined too

  listener: HomeViewListener
})
export class ComponentView {}
```

Once we have registered out `Listener` into our view, We need to create a context class that will manage all the shared data. This class needs to be registered as a Context and we need to tell it which Listener is going to be notified once we make a change.

```typescript
import { Context, notify } from '@devgetting/react-init';

@Context(HomeViewListener)
export class ApplicationContext {
	public userList: string[] = [];
	public value: string;

    @notify //notify decorator will send a message to listener for data dispatch 
	public registerUser(user: string) {
		this.userList.push(user);
	}

	@notify
	public setValue(value: string) {
		this.value = value;
	}
}
```

#### Implementing the shared component
This is how our `Component` view looks like

```typescript
export function Component() {
  return (
    <>
      <h1>Home View</h1>
      <RegisterUser />
      <UserList />
    </>
  );
}
```

This is how `RegisterUser` and `UserList` are implementing the context data.

```typescript
import { Receiver } from '@devgetting/react-init';

class RegisterUserService {
  @Receiver(HomeViewContext)
  private homeViewContext: HomeViewContext;

  get username() {
    return this.applicationContext.value || "";
  }

  changeUsername(username: string) {
    this.applicationContext.setValue(username);
  }

  registerUser() {
    this.applicationContext.registerUser();
  }
}

const registerUserService = new RegisterUserService();

export const RegisterUser = () => {
  const actions = {
    registerUser: () => registerUserService.registerUser(),
    changeUsername: (e: React.ChangeEvent<HTMLInputElement>) =>
      registerUserService.changeUsername(e.target.value),
  };

  const { registerUser, changeUsername } = actions;

  return (
    <>
      <input value={registerUserService.username} onChange={changeUsername} />
      <button onClick={registerUser}>Register</button>
    </>
  );
};
```

```typescript
class UserListService {
  @Receiver(ApplicationContext)
  private applicationContext: ApplicationContext;

  get userList() {
    return this.applicationContext.userList;
  }
}

const userListService = new UserListService();

export const UserList = () => {
  return (
    <ul>
      {userListService.userList.map((user) => (
        <li>{user}</li>
      ))}
    </ul>
  );
};
```

And this is how it looks like!

![](https://github.com/devgetting/react-init/blob/main/example.gif)
