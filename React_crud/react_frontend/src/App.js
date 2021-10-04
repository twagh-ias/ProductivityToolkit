import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
// import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <div className="container">
            <Switch>
              <Route path= "/" exact component={ListEmployeeComponent} ></Route>
              <Route path= "/employees" component={ListEmployeeComponent} ></Route>

              {/* step 1 */}
              <Route path= "/add-employee/:id" component={CreateEmployeeComponent} ></Route>
              <Route path= "/view-employee/:id" component={ViewEmployeeComponent} ></Route>
              {/* <Route path= "/update-employee/:id" component={UpdateEmployeeComponent} ></Route> */}
                <ListEmployeeComponent />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
