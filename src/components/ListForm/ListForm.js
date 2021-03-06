import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { Button, Chip, TextField } from '@material-ui/core'


class ListItem extends Component {

    state = {
        list_name: "",
        createdDate: '',
        shoppingDate: '',
        listSaved: false,
    }

    // cancel create list goes back to list view
    onCancel = () => {
        this.props.history.push('/list')
    }
    // submit new list
    onSubmitList = () => {
        this.props.dispatch({
            type: 'ADD_LIST', payload: {
                list_name: this.state.list_name,
                shoppingDate: this.state.shoppingDate,
                setListId: this.props.findGroupReducer.group_id
            }
        });
        this.setState({
            listSaved: !false
        })
        console.log('onSave')
        // dispatch get list to get most updated list 
        this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer.group_id });
        // goes back to list page
        this.props.history.push('/list')

    }
// when list name is changed
    onListNameChange = (event) => {
        console.log(...this.state.list_name)
        this.setState({
            ...this.state,
            list_name: event.target.value
        })
    }
// takes in shopping list date
    onShoppingDate = (event) => {
        console.log(...this.state.shoppingDate)
        this.setState({
            ...this.state,
            shoppingDate: event.target.value
        })
    }
    render() {
        console.log("state: ", this.state)
        return (
            <>
                <div className="Inputs">
                    <h1>New List: </h1>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip color="primary" label={option} value={option} {...getTagProps({ index })} />

                            ))}
                        renderInput={params => (
                            <TextField  {...params}
                                variant="outlined"
                                label="List Name"
                                margin="normal"
                                fullWidth
                                onChange={this.onListNameChange}
                                value={this.state.list_name} />
                        )} />

                    <Autocomplete
                        multiple
                        id="tags-filled"
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip color="primary" label={option} value={option} {...getTagProps({ index })} />

                            ))}
                        renderInput={params => (
                            <TextField  {...params}
                                variant="outlined"
                                label="Shopping Date"
                                margin="normal"
                                fullWidth
                                onChange={this.onShoppingDate}
                                value={this.state.shoppingDate} />
                        )} />
                    <Button onClick={this.onCancel} variant="contained" size="small" startIcon={<CancelIcon />} color="secondary" >Cancel</Button>
                    <Button onClick={this.onSubmitList} variant="contained" size="small" startIcon={<SaveIcon />} color="secondary" >Submit</Button>
                    {/* conditonal rendering for save button click */}
                    {/* {this.state.listSaved == false ?
                        <>Created On:<TextField></TextField>
                            Shopping Date:<TextField></TextField>
                            <Button onClick={this.onCancel} variant="outlined" size="small" startIcon={<CancelIcon />} color="primary" >Cancel</Button>
                            <Button onClick={this.onSubmitAdd} variant="outlined" size="small" startIcon={<SaveIcon />} color="primary" >Save</Button> </>
            
                    }

                    <Grid container spacing={24} style={{ padding: 24 }} />
                    {/* <pre> {JSON.stringify(this.state, null, 2)}</pre> */}
                </div>
            </>
        )
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(ListItem);

