import React from 'react';
import PostListItem from '../post-list-item';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './post-list.scss';

const PostList = ({posts, onDelete, onEditItem, onDeleteTag}) => {
        
        const elements = posts.filter((elem) => (typeof(elem) === 'object')).map((item) => {
            const {id, ...itemProps} = item;
    
            return (
                <ListGroupItem key={id} >
                    <PostListItem 
                    {...itemProps} 
                    onDeleteTag={(tag) => onDeleteTag(id, tag)}
                    onEditItem={(label, tag) => onEditItem(id, label, tag)}
                    onDelete={() => onDelete(id)}/>
                </ListGroupItem>
            )
        });
    
        return (
            <ListGroup className="list">
                {elements}
            </ListGroup>
        )
            

}

export default PostList;
