import React, { Component } from "react";
import {Button, Modal, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as sortingAlgorithms from "./Algorithms";

class Sort extends Component {

    timeouts = [];
    decreasing = false;
    showMergeFocus = false;
    endMargin = 40;
    maxArraySize = 200;

    state = { array: [], anim: [], btnActive: true, showModal: true, arraySize: this.maxArraySize, animDelay: 3, 
        arrayWidth: (window.innerWidth-this.endMargin*2)/(this.maxArraySize*2), 
        arrayMargin: (window.innerWidth-this.endMargin*2)/(this.maxArraySize*4) }

    componentDidMount() {
        this.resetArray(); 
        window.addEventListener('resize', this.updWidth);
    }

    componentWillUnmount() {
        for(var i = 0; i < this.timeouts.length; i++)
        {
            clearTimeout(this.timeouts[i]);
        }
        window.removeEventListener('resize', this.updWidth);
    }

    updWidth = () => {
        this.setState({ arrayWidth: (window.innerWidth-this.endMargin*2)/(this.maxArraySize*2), arrayMargin: (window.innerWidth-this.endMargin*2)/(this.maxArraySize*4) });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    //initialize array to random values
    resetArray = () => {
        const array = [];
        for(let i = 0; i < this.state.arraySize; i++)
        {
            array.push(randomInt(100, 500));
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
                case 0: //unselect two bars
                    this.timeouts.push(setTimeout(() => {
                        if(a !== -1) arrayBars[a].style.backgroundColor = "lightskyblue"; 
                        if(b !== -1) arrayBars[b].style.backgroundColor = "lightskyblue"; 
                    }, i*this.state.animDelay));
                break;
                case 1: //select two bars
                    this.timeouts.push(setTimeout(() => {
                        if(a !== -1) arrayBars[a].style.backgroundColor = "crimson"; 
                        if(b !== -1) arrayBars[b].style.backgroundColor = "crimson"; 
                    }, i*this.state.animDelay));
                break;
                case 2: //update height of one bar
                    this.timeouts.push(setTimeout(() => {
                        this.state.array[a] = b;
                        arrayBars[a].style.height = `${b/10}vh`;
                    }, i*this.state.animDelay));
                break;
                case 3: //swap heights of two bars
                    this.timeouts.push(setTimeout(() => {
                        var x = this.state.array[a]; this.state.array[a] = this.state.array[b]; this.state.array[b] = x;
                        arrayBars[a].style.height = `${this.state.array[a]/10}vh`;
                        arrayBars[b].style.height = `${this.state.array[b]/10}vh`;
                    }, i*this.state.animDelay));
                break;
                case 4: //update the segment which the merge sort algorithm is working on
                this.timeouts.push(setTimeout(() => {
                    for(let i = 0; i < arrayBars.length; i++)
                    {
                        if(a <= i && i <= b) arrayBars[i].style.opacity = `100%`;
                        else arrayBars[i].style.opacity = `30%`;
                    }
                }, i*this.state.animDelay));
                break;
                case 5: //update a bar to lightgreen
                    this.timeouts.push(setTimeout(() => {
                        arrayBars[a].style.backgroundColor = "lime"; 
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
        sortingAlgorithms.bubbleSort(this.state.array.slice(), this.state.anim, this.decreasing);
        this.playAnimations();
    }

    mergeSort = () => {
        this.setState({anim: [], btnActive: false});
        sortingAlgorithms.mergeSort(this.state.array.slice(), this.state.anim, 0, this.state.array.length-1, this.decreasing, this.showMergeFocus);
        this.playAnimations();
    }   

    quickSort = () => {
        
    }

    stopAlgorithm = () => {
        const arrayBars = document.getElementsByClassName("array-bar");
        for(let i = 0; i < arrayBars.length; i++) 
        {
            arrayBars[i].style.backgroundColor = "lightskyblue"; 
            arrayBars[i].style.opacity = `100%`;
        }
        for(let i = 0; i < this.timeouts.length; i++)
        {
            clearTimeout(this.timeouts[i]);
        }
        this.setState({btnActive: true});
    }

    //event for changing the size of the array
    changedSize = (event) => {
        this.setState({arraySize: event.target.value});
    }

    changedDecreasing = (event) => {
        this.decreasing = event.target.checked;
    }
    
    changedshowMergeFocus = (event) => {
        this.showMergeFocus = event.target.checked;
    }

    //event for changing the animation delay
    changedDelay = (event) => {
        this.setState({animDelay: event.target.value});
    }

    render() {
        const { array } = this.state;
        return (
            <div>
                <Modal onHide={this.hideModal} show={this.state.showModal}
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
                    <p>A divide and conquer sorting algorithm that uses O(n) merging of two sorted segments.</p>
                    <hr/>
                    <h5>Quick Sort</h5>
                    <p>A divide and conquer sorting algorithm that uses a pivot to sort subarrays recursively.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <div className="array-bar-fake" style={{ height: `${500/10}vh` }}></div>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value/10}vh`, width: this.state.arrayWidth, 
                    margin: `0px ${this.state.arrayMargin}px` }}></div>
                ))}
                <div className="array-bar-fake" style={{ height: `${500/10}vh` }}></div>
                <hr/>
                <div style={{display: "inline-block"}}>
                    <Button variant="success" disabled={!this.state.btnActive} onClick={this.resetArray}>New Array</Button>
                    <Button variant="primary" disabled={!this.state.btnActive} onClick={this.bubbleSort}>Bubble Sort</Button>
                    <Button variant="info" disabled={!this.state.btnActive} onClick={this.mergeSort}>Merge Sort</Button>
                    <Button variant="dark" disabled={!this.state.btnActive} onClick={this.quickSort}>Quick Sort</Button>
                    <Button variant="danger" disabled={this.state.btnActive} onClick={this.stopAlgorithm}>Stop Algorithm</Button>

                    <Form>
                    <Form.Check 
                        inline
                        type="checkbox" 
                        label="Sort in decreasing order"
                        onChange={this.changedDecreasing}
                        disabled={!this.state.btnActive}
                    />
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>
                        Highlights the segment of the array processed by each recursive call of merge sort
                        as well as the current element being adjusted.
                      </Tooltip>}
                    >
                        <Form.Check 
                        inline
                        type="checkbox" 
                        label="Show focus of merge sort"
                        onChange={this.changedshowMergeFocus}
                        disabled={!this.state.btnActive}
                    />
                    </OverlayTrigger>

                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Array Size: {this.state.arraySize}</Form.Label>
                        <Form.Control disabled={!this.state.btnActive} type="range" defaultValue={this.state.arraySize} 
                        min="10" max={this.maxArraySize} tooltip="auto" onChange = {(event) => this.changedSize(event)}/>
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