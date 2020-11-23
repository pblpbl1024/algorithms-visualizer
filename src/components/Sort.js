import React, { Component } from "react";
import {Button, Modal} from "react-bootstrap";
import * as sortingAlgorithms from "./MergeSort";

class Sort extends Component {

    state = { array: [], anim: [], btnActive: true, showModal: true }
    animSpeed = 10;

    componentDidMount() {
        this.resetArray(); 
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    //initialize array to random values
    resetArray = () => {
        const width = window.innerWidth - 150;
        const n = Math.max(width/10, 10);
        const array = [];
        for(let i = 0; i < n; i++)
        {
            array.push(randomInt(100, 600));
        }
        this.setState({array: array});
    }

    bubbleSort = () => {
        
    }

    mergeSort = () => {
        this.setState({anim: [], btnActive: false});
        sortingAlgorithms.mergeSort(this.state.array.slice(), this.state.anim, 0, this.state.array.length-1);
        console.log(this.state.array);
        console.log(this.state.anim);
        const temp = []; for(let i = 0; i < this.state.array.length; i++) temp.push(0);
        for(let i = 0; i < this.state.anim.length; i++)
        {
            const arrayBars = document.getElementsByClassName("array-bar");
            const [a, b, action] = this.state.anim[i];
            if(action !== 2)
            {
                const color = action === 1 ? "crimson" : "lightskyblue";
                setTimeout(() => {
                    if(a !== -1) arrayBars[a].style.backgroundColor = color; 
                    if(b !== -1) arrayBars[b].style.backgroundColor = color; 
                }, i*this.animSpeed);
            }
            else
            {
                setTimeout(() => {
                    temp[a] = b;
                    arrayBars[a].style.height = `${b/15}vh`;
                }, i*this.animSpeed);
            }
        }
        this.timeout = setTimeout(() => {
            this.setState({btnActive: true, array: temp});
        }, this.state.anim.length*this.animSpeed);
    }   

    quickSort = () => {
        
    }

    heapSort = () => {
        
    }

    changeArraySize = () => {
        
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <Modal show={this.state.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                    <h4>Sorting Visualizer</h4>
                    <p>This app visualizes sorting algorithms on an array. Here are the algorithms it supports:</p>
                    <hr/>
                    <h5>Bubble Sort</h5>
                    <p>A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements 
                        and swaps them if they are in the wrong order.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value/15}vh` }}></div>
                ))}
                </div>
                <hr/>
                <Button variant="success" disabled={!this.state.btnActive} onClick={this.resetArray}>New Array</Button>
                <Button variant="primary" disabled={!this.state.btnActive} onClick={this.bubbleSort}>Bubble Sort</Button>
                <Button variant="info" disabled={!this.state.btnActive} onClick={this.mergeSort}>Merge Sort</Button>
                <Button variant="secondary" disabled={!this.state.btnActive} onClick={this.quickSort}>Quick Sort</Button>
                <Button variant="dark" disabled={!this.state.btnActive} onClick={this.heapSort}>Heap Sort</Button>
            </div>
        )
    }
}

//random int in the range [min, max]
function randomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

export default Sort;