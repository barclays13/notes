import React, {Component} from 'react';
import { Button, Input} from 'reactstrap';

import './post-add-form.scss';

export default class PostAddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newLabel:'',
            newTags:'' 
        };
    }

    onValueChande (value) {
        this.setState({
            newLabel: value
        });
    }

    onValueTags (value) {
        this.setState({
            newTags: value
        });
    }
    
    onSubmit (e) {
        e.preventDefault();
        this.props.onAdd(this.state);
        this.setState ({
            newLabel:'',
            newTags:''
        });
    }

    render() {
        const {newLabel, newTags} = this.state;
        return (
            <form 
                className="add-item"
                onSubmit={(e) => this.onSubmit(e)}>
                <Input
                    type='newLabel'
                    placeholder='Введите вашу заметку...'
                    onChange={(e) => this.onValueChande(e.target.value)}
                    value={newLabel}
                />
                <Input
                    type='tags'
                    placeholder='Введите тэги через запятую'
                    onChange={(e) => this.onValueTags(e.target.value)}
                    value={newTags}
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

