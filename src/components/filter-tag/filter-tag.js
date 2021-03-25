import React, {Component} from 'react';
import nextId from "react-id-generator";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import './filter-tag.scss';

export default class FilterTag extends Component {

    constructor (props) {
        super(props);
        this.state = {
            activeFiletTag:'All'
        };
    }

    onSetFilter (tag) {
        this.props.onFilter(tag);
        this.setState({
            activeFiletTag: tag
        });
    }

    render() {
        return (
            <div className="filter">
                <UncontrolledButtonDropdown
                    className="filter__name">
                    <DropdownToggle  className="filter__name-width"caret>
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
                    <h4 >
                        {this.state.activeFiletTag !== 'All' ? `Выбран тег: ${this.state.activeFiletTag}` : `Тег не выбра`}
                    </h4>
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
