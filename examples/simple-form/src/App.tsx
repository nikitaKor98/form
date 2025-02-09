// import Form from "./components/form/Form";

import Form, {Config, FieldsTypes} from "form";


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
  steps: [["email", "password", "gender"], ["user_name", "date_of_birth"]]
}

function App() {
  return (
    <Form config={data} />
  );
}

export default App;
