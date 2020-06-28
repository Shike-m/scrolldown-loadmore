import React, { Component } from 'react';
import RestAPI from '../api/RestAPI';
import { List, ListItem, ListItemText } from '@material-ui/core';
import ProgressDialog from './ProgressDialog';

class PostList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reachTop: false,
            reachBottom: false,
            isLoadMore: true,
            posts: [],
            ids: [],
            loading: false,
            progressText:"Loading..."
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        RestAPI.getPosts(this.loadPosts); 
    }
    loadPosts = (data) => {
        let posts = this.state.posts;
        let isReachEnd = posts.length >= data.length ? true : false;
        let idList = this.state.ids;
        isReachEnd && this.setState({
             loading: false
        })
        if (data && data.length > 0 && !isReachEnd) {
            let limit = posts.length+30;
            for (let i in data) {
                if (posts.length >= data.length || posts.length === limit) break;
                if (idList.indexOf(data[i]['id']) < 0) {
                    posts.push(data[i]);
                    idList.push(data[i]['id']);
                }   
            }
            this.setState(()=>({
                posts: posts,
                reachBottom: isReachEnd,
                ids: idList,
                loading: false
            }))
            
        }
        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    onScroll = (e) => {
        let scrollEle = e.target.scrollingElement;
        let scrollHeight = scrollEle.scrollHeight;
        let scrollTop = scrollEle.scrollTop;
        let clientHeight = scrollEle.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
            this.timer && clearTimeout(this.timer);
            let self = this;
            this.setState(() => ({
                loading: true
            }));
            this.timer = setTimeout(() => {
                self._loadmorePosts();
            } 
            , 3000);
            
        }
        // console.log(scrollTop,scrollHeight,clientHeight);
    }
    _loadmorePosts = () => {
       RestAPI.getPosts(this.loadPosts); 
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
                <ProgressDialog open={this.state.loading} text={this.state.progressText}/>    
                </List>     
           </div>
       )
    }
}

export default PostList;