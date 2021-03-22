import React, {Component} from 'react';
import nextId from "react-id-generator";

import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import FilterTag from  '../filter-tag';

import './app.scss';

export default class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data : [
                {label:"Going to learn react", tags:['react', "redux"], id: nextId()},
                {label:"That is so good" , tags:['js', "html", "css"], id: nextId()}
            ],
            activeTag : ''
        };
        
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        // this.getData = this.getData.bind(this);
    }
    
    // async getData() {
    //     let  json = await require('../../data.json');
    //     console.log('json', json)
    //     let data = await JSON.parse(json)
    //     console.log('data2  ', data)
    // }

    addItem(body) {
        if (body.newLabel.trim().length > 0) {
            const newItem = {
                label: body.newLabel,
                tags: body.newTags.split(','),
                id: nextId()
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            });
        }
    }
    
    filterItems(setActiveTag) {
        this.setState(({activeTag}) => {
            if (setActiveTag === "All") {
                setActiveTag = ""
            }
            return {
                activeTag: setActiveTag
            }
        });
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice (0, index), ...data.slice (index+1)];
            return {
                data: newArr
            }
        });
    }
                     
    editItem(id, body) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            if (body.newLabel.match(/#\w+/g)) {
                const addTags = body.newLabel.match(/#\w+/g);
                body.newTags = `${body.newTags}, ${addTags.toString()}`
            }

            const changeItem = {label : body.newLabel.replace(/[\#]/g, ''), tags:[], id: id};
            typeof body.newTags == 'string' ? changeItem.tags = body.newTags.split(',') : changeItem.tags = body.newTags;
            
            data[index] = changeItem;
            return {
                data: data
            }
        });
    }

    deleteTag(id, tag) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            let newItem = data.filter(elem => elem.id === id);                            
            const newArrTags = newItem[0].tags.filter( elem => elem !== tag);
            data[index].tags = newArrTags
            return {
                data: data
            }
        });
    }

    render() {
        const {data, activeTag} = this.state;
        
        let allTags = [];
        data.forEach( item => {
            allTags = allTags.concat(item.tags)
        })
        const uniqueTags = [...new Set(allTags)]; 
        let activeData;
        if (activeTag) {
          activeData = data.filter(elem => elem.tags.includes(activeTag))
        } else {
            activeData = data
        }

        return (
            <div className="notes">
                <PostAddForm
                    className="notes__add-item"
                    onAdd={this.addItem}/>
                <FilterTag
                    className="notes__filter"
                    onFilter={this.filterItems}
                    tags={uniqueTags}/>
                <PostList 
                    posts={activeData}
                    onDeleteTag={this.deleteTag}
                    onEditItem={this.editItem}
                    onDelete={this.deleteItem}
                />
            </div>
        )
    }
}
