import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../tamplate/iconButton';
import { markedIsDone,markedIsPendding,remove } from './todoActions'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(item => (
            <tr key={item._id}>
                <td className={item.done?'markedAsDone':''}>{item.description}</td>
                <td>
                    <IconButton hide={item.done} style='success' icon='check' onClick={() => props.markedIsDone(item)}></IconButton>
                    <IconButton hide={!item.done} style='danger' icon='trash-o' onClick={() => props.remove(item)}></IconButton>
                    <IconButton hide={!item.done} style='warning' icon='undo' onClick={() => props.markedIsPendding(item)}></IconButton>
                </td>
            </tr>
        ))
    }
    return (
        <table className='table'>
            <thead >
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Acão</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ markedIsDone,markedIsPendding,remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)