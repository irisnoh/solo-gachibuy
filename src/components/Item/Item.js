import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, InputAdornment, Button } from '@material-ui/core'
import DrawerNav from '../DrawerNav/DrawerNav'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import ListView from '../ListView/ListView'

class Item extends Component {
    state = {
        listItems: "",
        createdDate: '',
        shoppingDate: '',
        listSaved: false,
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_ITEM" });

    }

    onChangeList = (event) => {
        console.log(...this.state.listItems)
        this.setState({
            // ...this.state.listItems,
            //colleection of eveyrthing and that list
            listItems: event.target.value

        })
    }
  
    onSubmitAdd = () => {
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state });
    }
    handleClick = () => {
        console.info('You clicked the Chip.');
      };
  

    render() {
        return (
            <>
                <div>
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
                                label="List Items"
                                margin="normal"
                                fullWidth
                                onChange={this.onChangeList}
                                value={this.state.listItem} />
                        )} /> <Button color="primary" variant="outlined" onClick={this.onSubmitAdd}>Submit</Button>
                    {/* <DrawerNav /> */}
                    <h1>ITEMS</h1>
                  

                    {this.props.itemReducer.map((list, i) =>
                        <>
                            <div key={i}>
                                <Chip color="primary" variant="outlined" label={list.item_name} onClick={this.handleClick} />
                                <Button color="primary">edit</Button>
                                <Button color="primary">delete</Button>
                            </div>
                        </>
                    )}

                </div>
                <pre> {JSON.stringify(this.state, null, 2)}</pre>

                <pre> {JSON.stringify(this.props.itemReducer, null, 2)}</pre>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(Item);


