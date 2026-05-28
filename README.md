# React Config Form

![npm](https://img.shields.io/npm/v/@korytnikov_n/react-config-form)
![typescript](https://img.shields.io/badge/TypeScript-ready-blue)
![license](https://img.shields.io/badge/license-MIT-green)

A configurable multi-step form library for React with built-in validation and TypeScript support.

The library allows developers to build forms using a configuration object instead of manually managing form state, validation logic, and step navigation.

---

## ✨ Why Use React Config Form?

- Build forms from configuration objects
- Reduce repetitive form boilerplate
- Centralize validation logic
- Easily create multi-step forms
- Handle client-side and server-side validation consistently
- Reuse form configurations across projects

---

## ✨ Features

- Config-driven form rendering
- Multi-step form support
- Built-in validation system
- Validation on `change` or `blur`
- Async submit handling
- Server-side error support
- TypeScript support
- Extensible field architecture
- Rollup library build setup
- Jest tests included

---

## 📋 Requirements

- React 18+
- TypeScript recommended

---

## 📦 Installation

```bash
npm install @korytnikov_n/react-config-form
```

---

## 🚀 Quick Start

```tsx
import Form, { Config, FieldsTypes } from "@korytnikov_n/react-config-form";

const config: Config = {
  fields: {
    email: {
      type: FieldsTypes.Input,

      validateOn: "blur",

      validation: {
        required: {
          isRequired: true,
        },

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
        {
          value: "f",
          name: "Female",
        },

        {
          value: "m",
          name: "Male",
          default: true,
        },
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

---

## ⚙️ Configuration

The form is controlled through a configuration object.

```ts
type Config = {
  fields: {
    [key: string]: FieldConfig;
  };

  steps: string[][];

  validateOnNext: boolean;
};
```

---

## 📘 Form Props

| Prop     | Type     | Description               |
| -------- | -------- | ------------------------- |
| config   | Config   | Form configuration object |
| onSubmit | Function | Async submit handler      |

---

## 🧩 Field Configuration

Example:

```ts
email: {
  type: FieldsTypes.Input,

  validateOn: "blur",

  validation: {
    required: {
      isRequired: true,
    },
  },
}
```

---

## 📚 Supported Field Types

```ts
FieldsTypes.Input;
FieldsTypes.Radio;
FieldsTypes.Date;
```

---

## ✅ Validation Rules

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

---

## 🔁 Multi-step Forms

Steps define which fields should be rendered together.

```ts
steps: [["email", "password"], ["gender"]];
```

When `validateOnNext` is enabled, the current step is validated before moving to the next step.

The form automatically provides:

- `Next` button
- `Back` button
- `Submit` button on the final step

---

## 🌐 Server-side Validation

The library supports async submit handlers and server-side validation errors.

Example:

```ts
function handleSubmit(data: unknown) {
  return apiRequest(data);
}
```

Example server response:

```ts
{
  email: "Email already exists",
  password: "Password is too weak",
}
```

Server-side errors are automatically mapped back to corresponding form fields.

---

## 🏗 Architecture Highlights

This project demonstrates:

- reusable React component architecture
- config-driven UI design
- custom validation engine
- multi-step form state management
- async form processing
- TypeScript library development
- Rollup-based package bundling
- npm package publishing
- unit testing with Jest

---

## 📁 Project Structure

```txt
src/
  components/
  hooks/
  utils/
  types.ts
  index.ts
```

---

## 🛠 Tech Stack

- React
- TypeScript
- Rollup
- Jest
- React Testing Library

---

## 📦 npm Package

https://www.npmjs.com/package/@korytnikov_n/react-config-form

---

## 🔮 Possible Improvements

- Checkbox support
- Select component support
- Textarea component support
- Custom validation messages
- Better styling customization
- Storybook documentation
- Additional unit tests
- Schema validation adapters

---

## 📄 License

MIT
