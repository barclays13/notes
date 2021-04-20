import React, {Component} from 'react';

import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import FilterTag from  '../filter-tag';
import './app.scss';

export default class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            activeTag : '',
            url: "https://json-server-notes.herokuapp.com/data"
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.getData = this.getData.bind(this);
        this.postData = this.postData.bind(this);
        this.putItem = this.putItem.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    createItem(label, tags) {
        this.id = Date.now();
        this.label = label;
        this.tags = tags;
    }

    changeItem(id ,label, tags) {
        this.id = id;
        this.label = label;
        this.tags = tags;
    }

    async getData() {
        let response = await fetch(`${this.state.url}`);
        let data = await response.json();
        this.setState({
            data
        });
    }

    async postData(note) {
          await fetch(`${this.state.url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(note)
          });
          this.getData();
    }

    async deleteItem(id) {
        await fetch(`${this.state.url}/${id}`, {
          method: 'DELETE',
          headers: {
              id: id
          } 
        });
        this.getData();
    }

    async putItem(id, item) {
        await fetch(`${this.state.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
            });
        this.getData();
    }

    addItem(item) {
        const {newLabel : label, newTags : tag} = item;
        const arrTags = tag.split(',').filter(elem => elem.trim());

        if (label.trim() && tag.trim().length) {
            const newItem = new this.createItem(label, arrTags);
            this.postData(newItem);
        }
    }

    editItem(id, label, tags) {
        if (label.match(/#\w+/g) && !tags.includes(label.match(/#\w+/g))) {
            tags = `${tags.trim()},${label.match(/#\w+/g).join()}`;
        } 

        const newItem = new this.changeItem(id, label, tags.split(','));
        this.putItem(id, newItem);
        this.getData();
    }

    deleteTag(id, tag) {
        console.log(tag)
        this.state.data.forEach(elem => {
            if( elem.id === id ) {
                const newArrTag = elem.tags.filter(elem => elem !== tag);
                const newItem = new this.changeItem(id, elem.label, newArrTag);
                this.putItem(id, newItem);
            }
        });
        // this.getData();
    }

    filterItems(setActiveTag) {
        this.setState(({activeTag}) => {
            if (setActiveTag === "All") {
                setActiveTag = "";
            }
            return {
                activeTag: setActiveTag
            }
        });
    }

    render() {
        const {data = [],  activeTag} = this.state;

        let allTags = [];

        data.forEach( item => {
            allTags = allTags.concat(item.tags);
        })
        const uniqueTags = [...new Set(allTags)]; 

        let activeData;
        if (activeTag) {
          activeData = data.filter(elem => elem.tags.includes(activeTag));
        } else {
            activeData = data;
        }

        return (
            <div className="notes">
                <PostAddForm
                    className="notes__add-item"
                    onAdd={(item) => this.addItem(item)}/>
                <FilterTag
                    className="notes__filter"
                    onFilter={this.filterItems}
                    tags={uniqueTags}
                    />
                <PostList 
                    posts={activeData}
                    onDeleteTag={this.deleteTag}
                    onEditItem={(id, label, tags) => this.editItem(id, label, tags)}
                    onDelete={this.deleteItem}
                /> 
            </div>
        )
    }
}