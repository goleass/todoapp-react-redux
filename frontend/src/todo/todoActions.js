import axios from 'axios'
const URL = 'http://localhost:3004/api/todos/'

const descriptionChanged = e => ({
    type: 'DESCRIPTION_CHANGED',
    payload: e.target.value
})

const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type:'TODO_SEARCHED',payload:resp.data}))
    }
}

// const handleAdd = description => {
//     const request = axios.post(URL, { description })
//     return {
//         type: 'HANDLE_ADD',
//         payload: request
//     }
// }

const handleAdd = description => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch({type: 'HANDLE_ADD',payload:resp  }))
            .then(resp => dispatch(search()))
    }
}

const markedIsDone = item => {
    return dispatch => {
        axios.put(`${URL}${item._id}`, { ...item,done:true })
            .then(resp => dispatch({ type:'TODO_DONE',payload:resp }))
            .then(resp => dispatch(search()))
    }
}

const markedIsPendding = item => {
    return dispatch => {
        axios.put(`${URL}${item._id}`, { ...item,done:false })
            .then(resp => dispatch({ type:'TODO_PENDDING',payload:resp }))
            .then(resp => dispatch(search()))
    }
}

const remove = item => {
    return dispatch => {
        axios.delete(`${URL}${item._id}`)
            .then(resp => dispatch({ type:'TODO_DELETE',payload:resp }))
            .then(resp => dispatch(search()))
    }
}

export {
    descriptionChanged,
    search,
    handleAdd,
    markedIsDone,
    markedIsPendding,
    remove
}