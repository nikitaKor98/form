import Form, { Config, FieldsTypes } from "form";

import "./style/main.sass";

const data: Config = {
  fields: {
    password: {
      type: FieldsTypes.Input,
      validateOn: "change",
      validation: {
        length: {
          min: 8,
          max: 12
        }
      }
    },
    email: {
      type: FieldsTypes.Input,
      validateOn: "blur",
      validation: {
        required: { isRequired: true },
        regExp: { reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
      }

    },
    date_of_birth: {
      type: FieldsTypes.Date
    },
    user_name: {
      type: FieldsTypes.Input,
      validation: {
        required: { isRequired: true }
      }
    },
    gender: {
      type: FieldsTypes.Radio,
      options: [
        {
          value: "f",
          name: "female",
        },
        {
          value: "m",
          name: "male",
          default: true
        }
      ],
      validation: {
        required: { isRequired: false }
      }
    }
  },
  steps: [["email", "password", "gender"], ["user_name", "date_of_birth"]],
  validateOnNext: true
}

function apiRequest(...args: any[]) {
  return new Promise((res, rej) => {
    setTimeout(() => rej({
      email: "email already exists",
      user_name: "user_name already exists",
    }), 1000);
  })
}

function handleFormSubmit(formData: any) {
  return apiRequest(formData).then(() => {
    console.log("success registration");
  }).catch(err => err);

  // => {
  //   Object.entries(err).forEach(([field, message]) => {
  //     setFieldError(field, message);
  //   })
  // }
}

function App() {
  return (
    <Form
      config={data}
      onSubmit={handleFormSubmit}
    />
  );
}

export default App;