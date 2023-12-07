/*import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const tenantHeader = "b8e236df-4b26-49ef-9532-5e43ea0c10a4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stage-mock.apiwiz.io/v1/tasks",
          {
            headers: {
              "x-tenant": tenantHeader,
            },
          }
        );

        // Assuming the response data is an array of tasks
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.status}</li>
          // Replace 'name' with the actual property you want to display
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
*/

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function AddTask() {
  return (
    <>
      <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
        <DropdownButton
          as={ButtonGroup}
          title="Dropdown"
          id="bg-nested-dropdown"
        >
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
        </InputGroup>
      </ButtonToolbar>
    </>
  );
}

export default AddTask;
