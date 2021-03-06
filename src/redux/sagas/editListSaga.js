import axios from 'axios';
import { put } from 'redux-saga/effects';

function* editListSaga(action) {
    console.log('in edit list saga',action.payload.id)
    try {
        yield axios.put(`/api/list/${action.payload.id}`, action.payload)
        yield put({type:"GET_LIST", payload: {id: action.payload.id}});
    } catch (error) {
      console.log('Edit list request failed', error);
    }
  }

  export default editListSaga;
  