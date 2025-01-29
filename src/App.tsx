import Form from "./components/form/Form";

import "./style/main.sass";

const data: any = {
  fields: {
    password: {
      type: "input",
      validateOn: "change",
      validation: {
        length: {
          min: 8,
          max: 12
        }
      }
    },
    email: {
      type: "input",
      validateOn: "blur",
      validation: {
        regExp: { reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
      }

    },
    date_of_birth: {
      type: "Date"
    },
    user_name: {
      type: "input",
      validation: {
        required: true
      }
    },
    gender: {
      type: "radio",
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
        required: false
      }
    }
  },
  steps: [["email", "password", "gender"], ["user_name", "date_of_birth"]]
}

function App() {
  return (
    <div>
      <Form config={data} />
    </div>
  );
}

export default App;
