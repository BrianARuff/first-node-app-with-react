import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    people: [],
    error: null,
    newPerson: {
      name: "",
      age: "",
      hobby: ""
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/")
      .then(resp => this.setState({ people: resp.data }))
      .catch(err => this.setState({ error: new Error(err) }));
  }

  handleInput = e => {
    this.setState({
      newPerson: { ...this.state.newPerson, [e.target.name]: e.target.value }
    });
  };

  newPost = (e) => {
    axios
      .post("http://localhost:5000/", this.state.newPerson)
      .then(resp => this.setState({people: resp.data}))
      .catch(err => this.setState({ error: new Error(err) }));
  };

  render() {
    return (
      <div className="App">
        <h1>
          My Very First Server (made all by myself) with NodeJS & Express &
          React!!
        </h1>
        <ul>
          {this.state.error ? (
            <div>
              {this.state.error.message}
            </div>
          ) : (
            this.state.people.map(person => {
              return (
                <li key={person.name + person.age + person.hobby}>
                  <p>Name: {person.name}</p>
                  <p>Age: {person.age}</p>
                  <p>Hobby: {person.hobby}</p>
                </li>
              );
            })
          )}
        </ul>
        <div>
          <input onChange={this.handleInput} type="text" name="name" />
          <input onChange={this.handleInput} type="text" name="age" />
          <input onChange={this.handleInput} type="text" name="hobby" />
          <button type="submit" onClick={this.newPost}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
