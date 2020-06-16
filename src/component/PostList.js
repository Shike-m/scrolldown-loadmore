import React, { Component } from 'react';
import RestAPI from '../api/RestAPI';
import { List, ListItem, ListItemText } from '@material-ui/core';

class PostList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reachTop: false,
            reachBottom: false,
            isLoadMore: true,
            posts:[]
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollLoadMore);
        RestAPI.getPosts(this.loadPosts); 
    }
    loadPosts = (data) => {
        let posts = this.state.posts;
        let isReachEnd = posts.length == data.length ? true : false;
        if (data && data.length > 0 && !isReachEnd) {
            let limit = this.state.posts.length+30;
            
            for (let i in data) {
                if (posts.length == limit) break;
                if (posts.indexOf(data[i])<0) posts.push(data[i]);
            }
            this.setState(()=>({
                posts: posts,
                reachBottom:isReachEnd
            }))
        }
        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollLoadMore);
    }
    scrollLoadMore = (e) => {
        console.log(e.target);
    }
    render() {
        let posts = this.state.posts;
        return (
            <div>
                <h1>List of Posts</h1>
                <List>
                  {
                    posts && posts.map((item, index) => (
                        <ListItem alignItems="flex-start" key={index}>
                            <ListItemText primary={item.title}
                                secondary={item.body}
                            />
                        </ListItem>
                    ))
                }  
                </List>     
           </div>
       )
    }
}

export default PostList;