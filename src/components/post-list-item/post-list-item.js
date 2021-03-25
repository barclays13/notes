import React, {Component} from 'react';
import nextId from "react-id-generator";
import { Input, Alert} from 'reactstrap';

import ContentEditable from 'react-contenteditable'
import './post-list-item.scss';

export default class PostListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            label: this.props.label,
            tags: this.props.tags,
            change: false,
            htmlLabel: this.props.label
        };
    }

    onValueChande(value) {
        let elemValue = value.trim();

        if (elemValue.includes("&nbsp;")) {
            elemValue = elemValue.substring(0, elemValue.length-6);
        } if (elemValue.includes("&")) {
            elemValue = elemValue.substring(0, elemValue.length-1);
        } 

        this.setState({
            htmlLabel: elemValue,
            label: elemValue.replace(/<\/?[A-Za-z]+[^>]*>/gi, "")
        })
    }

    onValueTags(value) {
        this.setState({
            tags: value.split(',')
        });
    }
    
    onChangeItem(e) {
        const {label, tags, change} = this.state;
        const tag = tags.filter(elem => elem.trim()).map(elem => elem.trim()).join();
        e.preventDefault();
        if (change) {
            this.props.onEditItem(label, tag);
        }

        this.setState ({
            change: !this.state.change
        });
    }

    onDeleteTag(tag) {
        this.props.onDeleteTag(tag);
        const newTags = this.state.tags.filter(elem => elem !== tag);

        this.setState({
            tags: newTags
        });
    }

    render() {
        const {change, htmlLabel} = this.state;
        const {label, tags=[], onDelete} = this.props;
        let newLabelHTML = '';
    
        htmlLabel.replace(/<\/?[A-Za-z]+[^>]*>/gi, "").split(' ').map( elem => {
            if (elem.includes("&nbsp;")) {
                elem = elem.substring(0, elem.length-6);
            }
            return tags.includes(elem.trim()) ? newLabelHTML += `<span>${elem.trim()} </span>` : newLabelHTML += `${elem.trim()} `;
        })

        return (
        <div className="list-item">
            <div className="d-flex justify-content-between">
                <ContentEditable
                    className = { change ? "d-flex content-editable" : "d-none"}
                    html={newLabelHTML}
                    disabled={false}
                    onChange={(e) => this.onValueChande(e.target.value)}
                />
                <Input
                    className = { change ? "d-flex" : "d-none"}
                    type='text'
                    onChange={(e) => this.onValueTags(e.target.value)}
                    defaultValue={this.state.tags}/> 
                <span className={change ? 'd-none' : 'list-item__label'}>
                    {label}
                </span>
                <span className={change ? 'd-none' : 'list-item__label'}>
                    {tags.join()}
                </span>
                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                        type='button'
                        className='list-item__btn-pencil btn-sm'
                        onClick={(e) => this.onChangeItem(e)}>
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
