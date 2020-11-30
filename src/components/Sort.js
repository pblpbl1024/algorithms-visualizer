import React, { Component } from "react";
import {Button, Modal, Form} from "react-bootstrap";
import * as sortingAlgorithms from "./Algorithms";

class Sort extends Component {

    state = { array: [], anim: [], btnActive: true, showModal: true, arraySize: 180, animDelay: 3 }
    timeouts = [];

    componentDidMount() {
        this.resetArray(); 
    }

    componentWillUnmount() {
        for(var i = 0; i < this.timeouts.length; i++)
        {
            clearTimeout(this.timeouts[i]);
        }
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    //initialize array to random values
    resetArray = () => {
        const array = [];
        for(let i = 0; i < this.state.arraySize; i++)
        {
            array.push(randomInt(100, 600));
        }
        this.setState({array: array});
    }

    playAnimations = () => 
    {
        //these algorithms do the sorting on a copy of the official array, then push all of the modification data to the animation array
        //the animation array is read here and changes are made to the original array
        for(let i = 0; i < this.state.anim.length; i++)
        {
            const arrayBars = document.getElementsByClassName("array-bar");
            const [a, b, action] = this.state.anim[i];
            //action: 0 = set bars to blue, 1 = set bars to red, 2 = update a single value, 3 = swap two values
            switch(action)
            {
                case 0:
                    this.timeouts.push(setTimeout(() => {
                        if(a !== -1) arrayBars[a].style.backgroundColor = "lightskyblue"; 
                        if(b !== -1) arrayBars[b].style.backgroundColor = "lightskyblue"; 
                    }, i*this.state.animDelay));
                break;
                case 1:
                    this.timeouts.push(setTimeout(() => {
                        if(a !== -1) arrayBars[a].style.backgroundColor = "crimson"; 
                        if(b !== -1) arrayBars[b].style.backgroundColor = "crimson"; 
                    }, i*this.state.animDelay));
                break;
                case 2:
                    this.timeouts.push(setTimeout(() => {
                        this.state.array[a] = b;
                        arrayBars[a].style.height = `${b/15}vh`;
                    }, i*this.state.animDelay));
                break;
                case 3:
                    this.timeouts.push(setTimeout(() => {
                        var x = this.state.array[a]; this.state.array[a] = this.state.array[b]; this.state.array[b] = x;
                        arrayBars[a].style.height = `${this.state.array[a]/15}vh`;
                        arrayBars[b].style.height = `${this.state.array[b]/15}vh`;
                    }, i*this.state.animDelay));
                break;
                default:
                break;
            }
        }
        this.timeouts.push(this.timeout = setTimeout(() => {
            this.setState({btnActive: true});
        }, this.state.anim.length*this.state.animDelay));
        
    }

    bubbleSort = () => {
        this.setState({anim: [], btnActive: false});
        sortingAlgorithms.bubbleSort(this.state.array.slice(), this.state.anim, 0, this.state.array.length-1);
        this.playAnimations();
    }

    mergeSort = () => {
        this.setState({anim: [], btnActive: false});
        sortingAlgorithms.mergeSort(this.state.array.slice(), this.state.anim, 0, this.state.array.length-1);
        this.playAnimations();
    }   

    quickSort = () => {
        
    }

    heapSort = () => {
        
    }

    stopAlgorithm = () => {
        const arrayBars = document.getElementsByClassName("array-bar");
        for(var i = 0; i < arrayBars.length; i++) arrayBars[i].style.backgroundColor = "lightskyblue"; 
        for(var i = 0; i < this.timeouts.length; i++)
        {
            clearTimeout(this.timeouts[i]);
        }
        this.setState({btnActive: true});
    }

    //event for changing the size of the array
    changedSize = (event) => {
        this.setState({arraySize: event.target.value});
    }

    //event for changing the animation delay
    changedDelay = (event) => {
        this.setState({animDelay: event.target.value});
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <Modal show={this.state.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                    <h4>Sorting Visualizer</h4>
                    <p>This app visualizes sorting algorithms on an array. Here are the algorithms it supports:</p>
                    <hr/>
                    <h5>Bubble Sort</h5>
                    <p>A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements 
                        and swaps them if they are in the wrong order.</p>
                    <hr/>
                    <h5>Merge Sort</h5>
                    <p>A divide and conquer sorting algorithm that merges two sorted arrays in O(n) time.</p>
                    <hr/>
                    <h5>Heap Sort</h5>
                    <p>A comparison-based sorting algorithm that reduces unsorted regions by extracting the largest element from it and 
                        inserting it into the sorted regions.</p>
                    <hr/>
                    <h5>Quick Sort</h5>
                    <p>A divide and conquer sorting algorithm that uses a pivot to sorts subarrays recursively.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <div className="array-bar-fake" style={{ height: `${650/15}vh` }}></div>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value/15}vh` }}></div>
                ))}
                <div className="array-bar-fake" style={{ height: `${650/15}vh` }}></div>
                <hr/>
                <div style={{display: "inline-block"}}>
                    <Button variant="success" disabled={!this.state.btnActive} onClick={this.resetArray}>New Array</Button>
                    <Button variant="primary" disabled={!this.state.btnActive} onClick={this.bubbleSort}>Bubble Sort</Button>
                    <Button variant="info" disabled={!this.state.btnActive} onClick={this.mergeSort}>Merge Sort</Button>
                    <Button variant="secondary" disabled={!this.state.btnActive} onClick={this.quickSort}>Quick Sort</Button>
                    <Button variant="dark" disabled={!this.state.btnActive} onClick={this.heapSort}>Heap Sort</Button>
                    <Button variant="danger" disabled={this.state.btnActive} onClick={this.stopAlgorithm}>Stop Algorithm</Button>
                    <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Array Size: {this.state.arraySize}</Form.Label>
                        <Form.Control disabled={!this.state.btnActive} type="range" defaultValue={this.state.arraySize} 
                        min="10" max="180" tooltip="auto" onChange = {(event) => this.changedSize(event)}/>
                        <Form.Label>Animation Delay: {this.state.animDelay} ms</Form.Label>
                        <Form.Control disabled={!this.state.btnActive} type="range" defaultValue={this.state.animDelay} 
                        min="1" max="200" tooltip="auto" onChange = {(event) => this.changedDelay(event)}/>
                    </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

//random int in the range [min, max]
function randomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

export default Sort;