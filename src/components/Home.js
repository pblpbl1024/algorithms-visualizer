import React, { Component } from "react";

//this is where everything should be to get rendered in index.html
class Home extends Component {

    //update state on initialization
    //state = { displayBio : false, displayScores : false };
    render() {
        return (
            <div>
                <h2>Algorithms Visualizer</h2>
                <p>This is a project I made to visualize various algorithms in computer science.</p>
                <hr/>
                <h4>Sort</h4>
                <p>Simulates various sorting algorithms on an array. Includes merge sort, bubble sort, and quick sort.</p>
                <hr/>
                <h4>Graph</h4>
                <p>Simulates graph theory algorithms on a grid of nodes.</p>
            </div>
        )
    }
}

export default Home;