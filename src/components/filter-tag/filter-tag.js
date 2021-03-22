import React, {Component} from 'react';
import nextId from "react-id-generator";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import './filter-tag.scss';

export default class FilterTag extends Component {

    constructor (props) {
        super(props);
        this.onSetFilter = this.onSetFilter.bind(this);
    }

    onSetFilter (tag) {
        this.props.onFilter(tag);
    }

    render() {
        return (
            <div className="filter">
                <UncontrolledButtonDropdown
                                        className="filter__name">
                    <DropdownToggle caret>
                        Фильтрация по тегу
                    </DropdownToggle>
                    <DropdownMenu>

                        {this.props.tags.map(tag => { 
                            return (
                                <DropdownItem  
                                    onClick={() => this.onSetFilter(tag)}
                                    key={nextId()}>
                                        {tag.trim()}    
                                </DropdownItem >
                            )
                        })}
                    </DropdownMenu>
                    <button 
                        type='button' 
                        className='filter__btn btn-sm'
                        onClick={() => this.onSetFilter("All")}>
                            <i className='fa fa-times'></i>
                    </button>
                </UncontrolledButtonDropdown>
            </div>
        )
    }
}
