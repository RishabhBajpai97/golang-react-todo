import React, { Component } from "react";
import axios from "axios";
import { Container, Heading, HStack, VStack, Text, Spacer, Input, Button } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon, } from "@chakra-ui/icons"


const endpoint = "https://protected-ocean-71899.herokuapp.com"


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            items: []
        }
    }
    componentDidMount() {
        this.getTask();
    }

    onChange = (event) => {
        console.log(this.state.task)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = (event) => {
        console.log("In Onsubmit")
        let { task } = this.state;
        if (task !== "") {
            console.log("Task")
            axios.post(endpoint + "/api/task", { task, }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log(res.data)
                this.getTask();
                this.setState({
                    task: ""
                });
                console.log(res)
            })
        }
        else {
            console.log("Empty Task")
        }
    }
    getTask = () => {
        axios.get(endpoint + "/api/task").then(res => {
            if (res.data) {
                console.log(res.data)
                this.setState({
                    items: res.data
                });
            } else {
                this.setState({
                    items: []
                })
            }
        })
    }
    updateTask = (id) => {
        axios.put(endpoint + "/api/task/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res);
            this.getTask();

        })
    }
    undoTask = (id) => {
        axios.put(endpoint + "/api/task/undo/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res)
            this.getTask()
        })
    }
    deleteTask = (id) => {
        console.log(id)
        axios.delete(endpoint + "/api/deleteTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res)
            this.getTask()
        }).catch(err => {
            console.log(err)
        })
    }
    deleteAllTask = () => {
        axios.delete(endpoint + '/api/deleteTask', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data)
            this.getTask()
        })
    }
    render() {
        return (
            <Container centerContent width="100%">
                <VStack width="100%">
                    <Container margin="50px" width="100%">
                        {
                            this.state.items.length == 0 ? <Heading>No Todos.... Add Them</Heading> :
                                this.state.items.map(item => {
                                    return (
                                        <Container key={item._id} marginY="20px" boxShadow="md" backgroundColor={item.status == true ? "green.100" : "white"} color={item.status == true ? "green" : "black"} width="100%" border="1px" borderColor="blackAlpha.100" borderRadius="8px">
                                            <HStack paddingY="10px">
                                                <Text onClick={() => this.updateTask(item._id)} key={item._id} style={{
                                                    cursor: "pointer"
                                                }}>{item.task}</Text>
                                                <Spacer />
                                                <Button colorScheme="blue" variant="outline" height="30px" onClick={() => this.undoTask(item._id)}><Text fontSize="14px" fontWeight="semi-bold">Undo</Text></Button>
                                                <Container width="inherit">
                                                    <CheckIcon color="green.500" visibility={item.status == true ? "visible" : "hidden"} />
                                                </Container>
                                                <DeleteIcon color="red.500" onClick={() => this.deleteTask(item._id)} />
                                            </HStack>
                                        </Container>
                                    )
                                })
                        }
                    </Container>
                    <Container>

                        <HStack>
                            <form onSubmit={this.onSubmit} >
                                <Input type="text" onChange={this.onChange} value={this.state.task} placeholder="Create Task" name="task" marginBottom="20px" />
                                <HStack >
                                    <Button colorScheme='blue' type="submit" >
                                        <Text padding="20px">Add Todo</Text>
                                    </Button>
                                    <Button colorScheme="red" onClick={this.deleteAllTask} >
                                        <Text>Delete All Todos</Text>
                                    </Button>
                                </HStack>
                            </form>
                        </HStack>
                    </Container>
                </VStack>
            </Container>
        );
    }

}
export default Todo