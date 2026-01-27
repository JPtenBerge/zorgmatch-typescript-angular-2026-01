# Lab 12: Modules

If you didn't finish the previous lab, you can use the lab solution of lab 10 to get started.

Make sure the server is started:

```shell
npx json-server ./date-picker.json
```

## Exercise 1: Add a shared module

In our application we're standalone for all our components and pipes. This is considered the best approach. In order learn how the old way of doing things was, we're going to move the `MenuComponent` to a shared module.

Note: This is just for learning purposes. In a real application, you would probably want to migrate to standalone components. [ESLint also has this suggestion](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-standalone.md).

This is an example of what the outcome may look like:

```text
src/app/
├── app.ts
├── app.config.ts
├── contacts
│   ├── contact-form
│   ├── contact-list
│   ├── contacts-page
│   ├── models
│   │   ├── contact.ts
│   ├── services
│   │   ├── contact.service.spec.ts
│   │   └── contact.service.ts
│   └── pipes
│       ├── contact-name.pipe.spec.ts
│       └── contact-name.pipe.ts
├── events
│   ├── edit-event
│   ├── events-list
│   ├── events-page
│   ├── planned-event.ts
│   └── services
│       └── event.service.ts
├── interceptors
│   └── error.interceptor.ts
├── shared
|   ├── shared.module.ts
|   └── menu
|       ├── menu.component.html
|       ├── menu.component.scss
|       └── menu.component.ts
├── models
├── routes.ts
└── shared
    ├── form-validation.scss
    └── toastr.scss
```

Make sure your tests can still run.

```shell
ng test
```

The tests should still pass if you did it right.
