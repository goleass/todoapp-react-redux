import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../tamplate/grid';
import IconButton from '../tamplate/iconButton';
import { descriptionChanged,search,handleAdd } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)

        this.keyHandle = this.keyHandle.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandle(e) {
        const { handleAdd,search,description } = this.props
        if(e.key === 'Enter') {
            e.shiftKey ? search(description) : handleAdd(description)
        } else if(e.key === 'Escape') {
            props.handleClear()
        }
    } 

    render() {
        const { handleAdd, search, description } = this.props
        return (
            <div className='todoForm' role='form'>
                <Grid cols='12 8 10'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.descriptionChanged}
                        onKeyUp={this.keyHandle}
                        value={description}></input>
                </Grid>
                <Grid cols='6 3 2'>
                    <IconButton style='primary' icon='plus' onClick={() => handleAdd(description)} ></IconButton>
                    <IconButton style='info' icon='search' onClick={() => search(description)}></IconButton>
                    <IconButton style='defaul' icon='close' ></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ descriptionChanged, search, handleAdd }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)