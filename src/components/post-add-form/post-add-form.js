import React, {Component} from 'react';
import { Button, Input} from 'reactstrap';

import './post-add-form.scss';

export default class PostAddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newLabel:'',
            newTags:'' 
        }
        this.onValueChande = this.onValueChande.bind(this);
        this.onValueTags = this.onValueTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChande (event) {
        this.setState({
            newLabel: event.target.value
        })
    }

    onValueTags (event) {
        this.setState({
            newTags: event.target.value
        })
    }
    
    onSubmit (event) {
        event.preventDefault();
        this.props.onAdd(this.state);
        this.setState ({
            newLabel:'',
            newTags:''
        });
    }

    render() {
        return (
            <form 
                className="add-item"
                onSubmit={this.onSubmit}>
                <Input
                    type='newLabel'
                    placeholder='Введите вашу заметку...'
                    onChange={this.onValueChande}
                    value={this.state.newLabel}
                />
                <Input
                    type='tags'
                    placeholder='Введите тэги через запятую'
                    onChange={this.onValueTags}
                    value={this.state.newTags}
                />
                <Button
                    type='submit'
                    outline 
                    color="secondary">
                    Добавить
                </Button>
            </form>
        )
    }
}

