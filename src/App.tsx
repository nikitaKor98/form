import Form from "./components/form/Form";

import "./style/main.sass";

const data = {
  fields: {
    password: {
      type: "input",
      validation: {
        length: {
          min: 8,
          max: 127
        }
      }
    },
    email: {
      type: "input"
    },
    date_of_birth: {
      type: "Date"
    }
  },
  steps: [[""], ["", ""]]
}

function App() {
  return (
    <div className="App">
      <Form
        config={data}
        onSubmit={console.log}
      />
    </div>
  );
}

export default App;
