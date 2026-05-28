# React Config Form

A lightweight configurable form component for React applications.

This project is a small form library built with **React** and **TypeScript**.
It allows developers to describe form fields, validation rules, and multi-step form flow using a single configuration object.

## ✨ Features

- Config-based form rendering
- Multi-step form support
- Input and radio field support
- Client-side validation
- Validation on `change` or `blur`
- Validation before moving to the next step
- Server-side error handling after submit
- TypeScript types included
- Rollup build with CommonJS, ES Modules, and type declarations
- Unit tests for validation logic
- Simple example app included

## 🛠 Tech Stack

- React
- TypeScript
- Rollup
- Jest
- React Testing Library
- GitHub Actions

## 📦 Installation

```bash
npm install
```

## 🚀 Build

```bash
npm run build
```

The library is built into the `dist` folder and includes:

- CommonJS build
- ES Module build
- TypeScript declaration file

## 🧪 Tests

```bash
npm test
```

## 🧩 Basic Usage

```tsx
import Form, { Config, FieldsTypes } from "form";

const config: Config = {
  fields: {
    email: {
      type: FieldsTypes.Input,
      validateOn: "blur",
      validation: {
        required: { isRequired: true },
        regExp: {
          reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      },
    },

    password: {
      type: FieldsTypes.Input,
      validateOn: "change",
      validation: {
        length: {
          min: 8,
          max: 12,
        },
      },
    },

    gender: {
      type: FieldsTypes.Radio,
      options: [
        { value: "f", name: "Female" },
        { value: "m", name: "Male", default: true },
      ],
    },
  },

  steps: [["email", "password"], ["gender"]],
  validateOnNext: true,
};

function handleSubmit(data: unknown) {
  console.log(data);
  return Promise.resolve({});
}

export default function App() {
  return <Form config={config} onSubmit={handleSubmit} />;
}
```

## ⚙️ Configuration

The form is controlled by a `config` object.

```ts
type Config = {
  fields: {
    [key: string]: FieldConfig;
  };
  steps: string[][];
  validateOnNext: boolean;
};
```

### `fields`

Describes all form fields.

Supported field types:

```ts
FieldsTypes.Input;
FieldsTypes.Radio;
FieldsTypes.Date;
```

Example:

```ts
fields: {
  email: {
    type: FieldsTypes.Input,
    validateOn: "blur",
    validation: {
      required: { isRequired: true },
    },
  },
}
```

### `steps`

Defines which fields are displayed on each form step.

```ts
steps: [
  ["email", "password"],
  ["user_name", "date_of_birth"],
];
```

### `validateOnNext`

If `true`, the form validates current step fields before moving to the next step.

```ts
validateOnNext: true;
```

## ✅ Validation Rules

The library currently supports:

### Required

```ts
required: {
  isRequired: true;
}
```

### Length

```ts
length: {
  min: 8,
  max: 12,
}
```

### Regular Expression

```ts
regExp: {
  reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}
```

## 🔁 Multi-step Flow

The form automatically renders fields for the current step and provides navigation:

- `Next` button
- `Back` button
- `Submit` button on the final step

Before moving forward, the current step can be validated depending on the `validateOnNext` option.

## 🌐 Server-side Errors

The `onSubmit` handler can return field errors from an API.

Example:

```ts
function handleSubmit(formData: unknown) {
  return apiRequest(formData).catch((errors) => errors);
}
```

Example server error format:

```ts
{
  email: "Email already exists",
  user_name: "Username already exists"
}
```

The form maps these errors back to the corresponding fields and shows the user the correct step.

## 📁 Project Structure

```txt
src/
  components/
    button/
    form/
    input/
    radio/
  hooks/
    useEvents.ts
    useValidation.ts
  utils/
    validation.ts
    validation.test.ts
  index.ts
  types.ts

examples/
  simple-form/
```

## 📌 What I Practiced in This Project

This project helped me practice:

- Building reusable React components
- Designing a config-driven API
- Working with TypeScript types
- Creating custom React hooks
- Implementing validation logic
- Handling multi-step form state
- Processing async submit errors
- Building a library with Rollup
- Writing unit tests
- Setting up GitHub Actions

## 🔮 Possible Improvements

- Add textarea, select, checkbox, and custom field components
- Add custom validation messages from config
- Improve accessibility for labels and error messages
- Add better styling customization
- Add more tests for hooks and form behavior
- Publish the package to npm
- Add Storybook documentation
