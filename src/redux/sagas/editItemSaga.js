import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editItemSaga(action) {
    console.log('in edit itemsaga',action.payload.id)
    try {
        yield axios.put(`/api/item/${action.payload.id}`, action.payload)
        yield put({type:"GET_ITEM", payload: {id: action.payload.id, list_name: action.payload.list_name}});
    } catch (error) {
      console.log('Edit item request failed', error);
    }
  }

  export default editItemSaga;
  