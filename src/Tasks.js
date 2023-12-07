import "./css/Tasks.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComp from "./NavbarComp";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Tasks = () => {
  const [tasks_list, setTaskslist] = useState([]);
  const tenantHeader = "b8e236df-4b26-49ef-9532-5e43ea0c10a4";
  const [filter, setFilter] = useState("");
  const [assigneeName, setassigneename] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [taskName, settaskName] = useState("");
  const [searchTask, setSearchTask] = useState("");

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
        setTaskslist(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(task));
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, status1) => {
    event.preventDefault();
    const draggedTask = JSON.parse(event.dataTransfer.getData("text/plain"));
    console.log("status:", status1);

    // Update the status of the dragged task
    console.log("dragged task is", draggedTask.id);
    console.log("before", draggedTask.status);
    const updatedTasksList = tasks_list.map((task) => {
      if (task.id === draggedTask.id) {
        const updated_task = { ...task, status: status1 };
        console.log("after", updated_task.status);
        return updated_task;
      }
      return task;
    });

    setTaskslist(updatedTasksList);
  };

  useEffect(() => {
    console.log("updated list", tasks_list);
    //filtering tasks
  }, [tasks_list]);

  const todo_list = tasks_list.filter((task) => {
    if (filter == "severity_low") {
      return task.status === "Ready" && task.priority === "Low";
    } else if (filter == "severity_medium") {
      return task.status === "Ready" && task.priority === "Medium";
    } else if (filter == "severity_high") {
      return task.status === "Ready" && task.priority === "High";
    } else if (filter == "assignee" && assigneeName !== "") {
      return task.status === "Ready" && task.assignee === assigneeName;
    } else if (filter === "startdate") {
      return task.status === "Ready" && task.startDate === startdate;
    } else if (filter === "enddate") {
      return task.status === "Ready" && task.endDate === enddate;
    } else if (taskName === task.name) {
      return task.status === "Ready" && task.name === searchTask;
    } else {
      return task.status === "Ready";
    }
  });

  //settodo_list(todolist);
  //console.log("todo_list is", todo_list);

  const inprogress_list = tasks_list.filter((task) => {
    if (filter == "severity_low") {
      return task.status === "In Progress" && task.priority === "Low";
    } else if (filter == "severity_medium") {
      return task.status === "In Progress" && task.priority === "Medium";
    } else if (filter == "severity_high") {
      return task.status === "In Progress" && task.priority === "High";
    } else if (filter == "assignee" && assigneeName !== "") {
      return task.status === "In Progress" && task.assignee === assigneeName;
    } else if (filter === "startdate") {
      return task.status === "In Progress" && task.startDate === startdate;
    } else if (filter === "enddate") {
      return task.status === "In Progress" && task.endDate === enddate;
    } else if (taskName === task.name) {
      console.log("entering");
      console.log("searchTask", searchTask, "taskname", task.name);
      return task.name === searchTask;
    } else {
      return task.status === "In Progress";
    }
  });
  //setinprogress_list(inprogresslist);
  //console.log("inprogress is", inprogress_list);

  const completed_list = tasks_list.filter((task) => {
    if (filter == "severity_low") {
      return task.status === "Done" && task.priority === "Low";
    } else if (filter == "severity_medium") {
      return task.status === "Done" && task.priority === "Medium";
    } else if (filter === "severity_high") {
      return task.status === "Done" && task.priority === "High";
    } else if (filter === "assignee" && assigneeName !== "") {
      return task.status === "Done" && task.assignee === assigneeName;
    } else if (filter === "startdate") {
      return task.status === "Done" && task.startDate === startdate;
    } else if (filter === "enddate") {
      return task.status === "Done" && task.endDate === enddate;
    } else {
      return task.status === "Done";
    }
  });
  //setcompleted_list(completedlist);
  //console.log("completed is", completed_list);

  const testing_list = tasks_list.filter((task) => {
    if (filter == "severity_low") {
      return task.status === "Testing" && task.priority === "Low";
    } else if (filter == "severity_medium") {
      return task.status === "Testing" && task.priority === "Medium";
    } else if (filter == "severity_high") {
      return task.status === "Testing" && task.priority === "High";
    } else if (filter == "assignee" && assigneeName !== "") {
      return task.status === "Testing" && task.assignee === assigneeName;
    } else if (filter === "startdate") {
      return task.status === "Testing" && task.startDate === startdate;
    } else if (filter === "enddate") {
      return task.status === "Testing" && task.endDate === enddate;
    } else {
      return task.status === "Testing";
    }
  });
  //setbacklog_list(backloglist);
  //console.log("completed is", completed_list);
  //displaying tasks for particular categories
  const margin = {
    margin: "10px",
  };
  const cardStyle = {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid black",
    margin: "10px",
    backgroundColor: "#f5f5f5",
    height: "130px",
  };
  const display_testing_list = testing_list.map((task) => {
    return (
      <div
        style={cardStyle}
        onDragStart={(e) => handleDragStart(e, task)}
        draggable="true"
      >
        <h6>{task.name}</h6>
        <p>
          <span style={margin}>{task.id}</span>
          <span style={margin}>{task.priority}</span>
        </p>
        <p>
          <span style={margin}>{task.startDate}</span>
          <span style={margin}>{task.endDate}</span>
        </p>
        <p>
          <span style={margin}>{task.assignee}</span>
          <span style={margin}>{task.effortSpent}</span>
        </p>
      </div>
    );
  });
  //console.log("jo", todo_list);
  const display_todo_list = todo_list.map((task) => {
    return (
      <div
        style={cardStyle}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, task)}
      >
        <h6>{task.name}</h6>
        <p>
          <span style={margin}>{task.id}</span>
          <span style={margin}>{task.priority}</span>
        </p>
        <p>
          <span style={margin}>{task.startDate}</span>
          <span style={margin}>{task.endDate}</span>
        </p>
        <p>
          <span style={margin}>{task.assignee}</span>
          <span style={margin}>{task.effortSpent}</span>
        </p>
      </div>
    );
  });
  //console.log("hi", display_todo_list);
  const display_inprogress_list = inprogress_list.map((task) => {
    return (
      <div
        style={cardStyle}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, task)}
      >
        <h6>{task.name}</h6>
        <p>
          <span style={margin}>{task.id}</span>
          <span style={margin}>{task.priority}</span>
        </p>
        <p>
          <span style={margin}>{task.startDate}</span>
          <span style={margin}>{task.endDate}</span>
        </p>
        <p>
          <span style={margin}>{task.assignee}</span>
          <span style={margin}>{task.effortSpent}</span>
        </p>
      </div>
    );
  });

  const display_completed_list = completed_list.map((task) => {
    return (
      <div
        style={cardStyle}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, task)}
      >
        <h6>{task.name}</h6>
        <p>
          <span style={margin}>{task.id}</span>
          <span style={margin}>{task.priority}</span>
        </p>
        <p>
          <span style={margin}>{task.startDate}</span>
          <span style={margin}>{task.endDate}</span>
        </p>
        <p>
          <span style={margin}>{task.assignee}</span>
          <span style={margin}>{task.effortSpent}</span>
        </p>
      </div>
    );
  });

  const handleFilter = (selectedKey, event) => {
    console.log("event is", event);
    setFilter(selectedKey);
    console.log("filter is", filter);
  };
  const handleassignee = (event) => {
    setassigneename(event.target.value);
  };
  const handleDate = (event) => {
    console.log("date is", event.target.value);
    if (event.target.name === "startdate") {
      setstartdate(event.target.value);
    }
    if (event.target.name === "enddate") {
      setenddate(event.target.value);
    }
  };
  const handleTaskName = (event) => {
    settaskName(event.target.value);
    console.log("taskName", taskName);
  };
  const handleSubmitTaskName = () => {
    console.log("taskName in submit", taskName);
    setSearchTask(taskName);
  };
  const todo_hr = {
    color: "red",
  };
  const progress_hr = {
    color: "orange",
  };
  const testing_hr = {
    color: "blue",
  };
  const complete_hr = {
    color: "green",
  };
  const colStyle = {
    margin: "10px",
  };
  const toolbarStyle = {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  };

  return (
    <>
      <NavbarComp />
      <div>
        <ButtonToolbar
          className="mb-3"
          aria-label="Toolbar with Button groups"
          style={toolbarStyle}
        >
          <DropdownButton
            as={ButtonGroup}
            title="Add Filter"
            id="bg-nested-dropdown"
            onSelect={handleFilter}
          >
            <Dropdown.Item eventKey="assignee">assignee</Dropdown.Item>
            <Dropdown.Item eventKey="severity_low">severity-Low</Dropdown.Item>
            <Dropdown.Item eventKey="severity_medium">
              severity-Medium
            </Dropdown.Item>
            <Dropdown.Item eventKey="severity_high">
              severity-High
            </Dropdown.Item>
            <Dropdown.Item eventKey="startdate">Start_Date</Dropdown.Item>
            <Dropdown.Item eventKey="enddate">End_Date</Dropdown.Item>
          </DropdownButton>
          {filter === "assignee" && (
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Input group example"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                value={assigneeName}
                onChange={(event) => handleassignee(event)}
              />
            </InputGroup>
          )}
          {filter === "startdate" && (
            <div>
              <label htmlFor="startdate">Start_Date:</label>
              <input
                type="date"
                id="startdate"
                name="startdate"
                value={startdate}
                onChange={(event) => handleDate(event)}
              />
            </div>
          )}
          {filter === "enddate" && (
            <div>
              <label htmlFor="enddate">End_Date</label>
              <input
                type="date"
                id="enddate"
                name="enddate"
                value={enddate}
                onChange={(event) => handleDate(event)}
              />
            </div>
          )}
          <Form className="d-flex mr-sm-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={taskName}
              onChange={handleTaskName}
            />
            <Button variant="outline-success" onClick={handleSubmitTaskName}>
              Search
            </Button>
          </Form>
        </ButtonToolbar>

        {/*<select
          onChange={(event) => {
            handleFilter(event);
          }}
        >
          <option value="">Add Filter</option>
          <option value="assignee">assignee</option>
          <option value="severity_low">severity-Low</option>
          <option value="severity_medium">severity-Medium</option>
          <option value="severity_high">severity_High</option>
          <option value="startdate">Start_Date</option>
          <option value="enddate">End_Date</option>
        </select>

        {filter === "assignee" && (
          <div>
            <label htmlFor="assigneeName">Assignee Name:</label>
            <input
              type="text"
              id="assigneeName"
              value={assigneeName}
              onChange={(event) => handleassignee(event)}
            />
          </div>
        )}

        {filter === "startdate" && (
          <input
            type="date"
            id="startdate"
            name="startdate"
            value={startdate}
            onChange={(event) => handleDate(event)}
          />
        )}
        {filter === "enddate" && (
          <input
            type="date"
            id="enddate"
            name="enddate"
            value={enddate}
            onChange={(event) => handleDate(event)}
          />
        )}*/}

        {/*<button>Ungrouped</button>
        <button>Users</button>
        <select>
          <option value="More">More</option>
        </select>
        <select>
          <option value="Board">Board</option>
      </select>*/}
      </div>

      <Container>
        <Row>
          <Col>
            TO DO<span>({todo_list.length})</span>
            <hr style={todo_hr} />
            <div
              onDrop={(e) => handleDrop(e, "Ready")}
              onDragOver={handleDragOver}
            >
              {display_todo_list}
            </div>
          </Col>
          <Col>
            In Progress<span>({inprogress_list.length})</span>
            <hr style={progress_hr} />
            <div
              id="progress"
              onDrop={(e) => handleDrop(e, "In Progress")}
              onDragOver={handleDragOver}
            >
              {display_inprogress_list}
            </div>
          </Col>
          <Col>
            TESTING<span>({testing_list.length})</span>
            <hr style={testing_hr} />
            <div
              onDrop={(e) => handleDrop(e, "Testing")}
              onDragOver={handleDragOver}
            >
              {display_testing_list}
            </div>
          </Col>
          <Col>
            Complete<span>({completed_list.length})</span>
            <hr style={complete_hr} />
            <div
              id="completed"
              onDrop={(e) => handleDrop(e, "Done")}
              onDragOver={handleDragOver}
            >
              {display_completed_list}
            </div>
          </Col>
        </Row>
      </Container>

      {/*<div className="categories">
        <div
          className="grid-item"
          onDrop={(e) => handleDrop(e, "Ready")}
          onDragOver={handleDragOver}
        >
          <h2>
            TO DO<span>{todo_list.length}</span>
          </h2>
          {display_todo_list}
        </div>
        <div
          className="grid-item"
          id="progress"
          onDrop={(e) => handleDrop(e, "In Progress")}
          onDragOver={handleDragOver}
        >
          <h2>
            In Progress<span>{inprogress_list.length}</span>
          </h2>
          {display_inprogress_list}
        </div>
        <div
          className="grid-item"
          onDrop={(e) => handleDrop(e, "Testing")}
          onDragOver={handleDragOver}
        >
          <h2>
            TESTING<span>{testing_list.length}</span>
          </h2>
          {display_testing_list}
        </div>
        <div
          className="grid-item"
          id="completed"
          onDrop={(e) => handleDrop(e, "Done")}
          onDragOver={handleDragOver}
        >
          <h2>
            Complete<span>{completed_list.length}</span>
          </h2>
          {display_completed_list}
        </div>
    </div>*/}
    </>
  );
};
