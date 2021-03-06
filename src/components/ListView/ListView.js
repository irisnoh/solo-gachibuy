import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerNav from '../DrawerNav/DrawerNav'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Fab, Card, Grid, CardContent, List, TextField, Button, Chip, Typography, Divider, ListItem, ListItemText, ListItemIcon,RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from '@material-ui/core'
import Swal from 'sweetalert2';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    textWeight: 'bold'
  },
  list: {
    fontSize: 20,
    textAlign: 'center',
    textWeight: 'bold',
    color: "#48b9b6"
  },
  buttonStyle: {
    margin: 14,
    top: 'auto',
    left: 'auto'
  },
  fabStyle: {
    margin: 0,
    top: 'auto',
    right: 20,
    left: 'auto',
    position: 'fixed'
  },

};
class ListView extends Component {
  state = {
    groupName: this.props.findGroupReducer.name,
    img_src: this.props.findGroupReducer.img_src,
    edit: true,
    addUsers: "",
    seeUsers: false,
  }

  componentDidMount() {
    this.onGet();
  }
 // get list with payload of group id 
  onGet = () => {
    console.log('in get list???/');
    this.props.dispatch({ type: "GET_LIST", payload: this.props.findGroupReducer.group_id });
  }
// on back goes back to home page
  onBack = () => {
    this.props.history.push('/home')
  }
// on create click, takes to list form page
  onCreate = () => {
    this.props.history.push('/Listform')
  }
// on click see users, sees which users are in group
  onUsers = () => {
    this.setState({
      ...this.state,
      seeUsers: !this.state.seeUsers
    })
    this.props.dispatch({ type: "FIND_USERS", payload: this.props.findGroupReducer.group_id})
  }
// takes to specific list with items in a list
  onListClick = (list) => {
    // dispatches to "FIND_LIST" to grab that list id
    this.props.dispatch({ type: "FIND_LIST", payload: list })
    // gets list
    this.onGet();
    // goes back to item page
    this.props.history.push(`/item`)
  }
// on edit turns from truthy to falsey
  onEdit = () => {
    console.log('edit button clicked')
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }
// saves the new edits and takes back to home page
  saveButton = (group) => {
    this.props.dispatch({ type: "EDIT_GROUP", payload: { id: this.props.findGroupReducer.group_id, groupName: this.state.groupName, img_src: this.state.img_src } })
    this.setState({
      ...this.state,
      edit: true
    })
    this.props.history.push(`/home`)
  };
// handles changes for
  handleChangeFor = (property, event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    })
  }


  //function to trigger the delete group route and delete group from database
  onDelete = (group) => {
    console.log('clicked delete group!');
    //add sweet alert to confirm the deletion
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete group!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your group has been deleted.',
          'success'
        );
        this.props.dispatch({
          type: 'DELETE_GROUP', payload: this.props.findGroupReducer.group_id
        })
        this.onBack();
      } else {
        //if cancel do nothing
        Swal.fire(
          'Cancelled',
          'Did not delete group!'
        )
      }
    })
  }

  render() {
    return (
      <>
        <div>
          <DrawerNav />
          <ArrowBackIosIcon style={styles.buttonStyle} onClick={this.onBack} />
          {/* <Button variant="contained" color="primary" onClick={this.onUsers}>To see Users</Button> */}

          {this.state.seeUsers && 
          <Typography variant="body1">Users in Group: </Typography>}
          {/* conditional rendering for edit group name */}
          <Button style={{ fontWeight: 'bold' }} onClick={this.onEdit} variant="contained" size="small" startIcon={<EditIcon />} color="primary" ><Typography variant="button" style={{ fontWeight: 'bold' }}
          >Edit Group</Typography></Button>
          {this.state.edit ?

            <Grid item xs={12}>
              <Card style={styles.card}>
                <CardContent style={styles.content}>
                  <Typography style={styles.title}>{this.props.findGroupReducer.name}</Typography> </CardContent>
              </Card> </Grid> : <>
              <Grid item xs={12}>
                <Card style={styles.card}>
                  <CardContent style={styles.content}>
                    <Typography style={styles.title}>{this.props.findGroupReducer.name}</Typography> </CardContent>
                </Card> </Grid>
              <Typography variant="h6" >Edit Group Name: </Typography>
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
                    fullWidth
                    label="Update Group"
                    margin="normal"
                    onChange={(event) => this.handleChangeFor("groupName", event)}
                    value={this.state.groupName}
                  />
                )}
              />
              <Typography variant="h6"> Edit Image: </Typography>
               <FormControl component="fieldset">
                            <FormLabel component="legend" style={styles.radio}>Edit Image</FormLabel>
                            <RadioGroup style={styles.radio} defaultValue="Images" aria-label="Images">
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Space" />
                                <FormControlLabel value="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} onChange={(event) => this.handleChangeFor('img_src', event)} label="Flowers" />
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Mountains" />
                                <FormControlLabel
                                    onChange={(event) => this.handleChangeFor('img_src', event)}
                                    value="https://images.unsplash.com/photo-1432457990754-c8b5f21448de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                                    control={<Radio />} label="Lemons" />
                            </RadioGroup>
                            <Button onClick={this.onImageClick} color="secondary" variant="contained">Upload own Image</Button>
                            </FormControl>

          <Button style={{ fontWeight: 'bold' }} variant="contained" color="primary" onClick={() => this.saveButton(this.props.findGroupReducer.name)}>Save</Button>
          
          <Button style={{ fontWeight: 'bold' }} onClick={this.onEdit} variant="contained" size="small" startIcon={<EditIcon />} color="primary" ><Typography variant="button" style={{ fontWeight: 'bold' }}
          >Cancel</Typography></Button>
          
          </>
          
          }

          {/* conditional rendering only creator of group can delete group */}
          {this.props.findGroupReducer.creator === this.props.user.id &&
            < Button style={{ fontWeight: 'bold' }} onClick={(group) => this.onDelete(group)} variant="contained" size="small" startIcon={<DeleteIcon />} color="primary" style={{ fontWeight: 'bold' }} >DELETE GROUP</Button>
          }
          <Fab color="primary" aria-label="add" style={styles.fabStyle} onClick={this.onCreate}>
            <AddIcon />
          </Fab>
          {/* map function to get all my lists */}
          <Card style={styles.card}>
            <Typography variant="h6" color="seconday">Lists: </Typography>
            {this.props.listReducer.map((list, i) =>
              <div key={i}>
                <CardContent>
                  <List onClick={() => this.onListClick(list)} >
                    <ListItem button>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText><Typography style={styles.list}> {list.list_name}</Typography></ListItemText>
                    </ListItem>
                  </List>
                </CardContent>
                <Divider variant="middle" />
              </div>)}
          </Card>

        </div>
        {/* <pre> {JSON.stringify(this.state, null, 2)}</pre> */}

      </>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapReduxStateToProps)(ListView);


