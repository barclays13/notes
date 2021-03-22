import React, {Component} from 'react';
import nextId from "react-id-generator";
import { Input, Alert} from 'reactstrap';

import './post-list-item.scss';

export default class PostListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            newLabel: this.props.label,
            newTags: this.props.tags,
            change: false 
        }

        this.onValueChande = this.onValueChande.bind(this);
        this.onValueTags = this.onValueTags.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }


    onValueChande(event) {
        this.setState({
            newLabel: event.target.value
        })
    }

    onValueTags(event) {
        this.setState({
            newTags: event.target.value
        })
    }
    
    onChangeItem(event) {
        event.preventDefault();
        if (this.state.change) {
            this.props.onEditItem(this.state);
        }

        this.setState ({
            change: !this.state.change
        });
    }

    onDeleteTag(tag) {
        this.props.onDeleteTag(tag);

    }

    render() {
        const {label, tags, onDelete } = this.props;
        const {change} = this.state;

        return (
        <div className="list-item">
            <div className="d-flex justify-content-between">
                <Input 
                    className = { change ? "d-flex" : "d-none"}
                    type='text'
                    onChange={this.onValueChande}
                    defaultValue={label}/>
                <Input
                    className = { change ? "d-flex" : "d-none"}
                    type='text'
                    onChange={this.onValueTags}
                    defaultValue={tags}/>
                <span className={change ? 'd-none' : 'list-item__label'}>
                    {label}
                </span>
                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                    type='button'
                    className='list-item__btn-pencil btn-sm'
                    onClick={this.onChangeItem}>
                        <i className={change ? 'fa fa-check' : 'fa fa-pencil'}></i>
                    </button>
                    <button 
                    type='button' 
                    className='list-item__btn-trash btn-sm'
                    onClick={onDelete}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </div>
            </div>
            <hr/>
            <div className={change ? 'd-none' : 'd-flex'}>
                {tags.map(tag => { 
                    return (
                        <Alert  
                            key={nextId()}>
                                {tag.trim()}
                            <button 
                                type='button' 
                                onClick={() => this.onDeleteTag(tag.trim())}
                                className='btn-times btn-sm'>
                                    <i className='fa fa-times'></i>
                            </button>
                        </Alert >
                    )
                })}
            </div>
        </div>
        )
    }
}
