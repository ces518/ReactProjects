import { all, call } from 'redux-saga/effects';
import user from './user';

export default function* rootSaga () {
    yield all([
        call(user),
    ]);
};
