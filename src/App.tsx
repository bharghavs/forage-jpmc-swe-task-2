import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  /* Bharghav - 07/02/2023 - add - To display graph results */
  showGraph: boolean,
  /* Bharghav - 07/02/2023 - end - To display graph results */
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
  /* Bharghav - 07/02/2023 - add - set to false, so that the graph displays only when user clicks the button */
      showGraph: false,
  /* Bharghav - 07/02/2023 - end - set to false, so that the graph displays only when user clicks the button */
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
     /* Bharghav - 07/02/2023 - del - change the condition as below */
     /* return (<Graph data={this.state.data}/>) */
     /* Bharghav - 07/02/2023 - end - change the condition as below */

     /* Bharghav - 07/02/2023 - add - to show graph only when showGraph is true */
     if (this.state.showGraph) {
        return (<Graph data={this.state.data}/>)
     }
     /* Bharghav - 07/02/2023 - end - - to show graph only when showGraph is true */
  }

  /**
   * Get new data from server and update the state with the new data
   */

/* Bharghav - 07/02/2023 - del - change the condition as below */
  /*
  getDataFromServer() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
      this.setState({ data: [...this.state.data, ...serverResponds] });
    });
  } */
/* Bharghav - 07/02/2023 - del - change the condition as below */

/* Bharghav - 07/02/2023 - add - change the condition as below */
  /*
  for every 100 milliseconds of time, the graph with data will be displayed for 500 iterations.
  */
  getDataFromServer() {
    let count = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      count++;
      if (count > 500) {
        clearInterval(interval);
      }
    }, 100);
  }
/* Bharghav - 07/02/2023 - end - change the condition as below */

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
