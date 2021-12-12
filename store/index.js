import Vuex from 'vuex';
import axios from 'axios';
import posts from "~/pages/posts";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost){
        const postIndex = state.loadedPosts.findIndex(post=>post.id===editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      editPost(vuexContext, editedPost){
        return axios.put('https://fir-nuxt-blog-2-default-rtdb.firebaseio.com/posts/' + editedPost.id + '.json',editedPost)
          .then(res=>{
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e=>console.log(e))
      },
      addPost(vuexContext, postData) {
        return axios.post('https://fir-nuxt-blog-2-default-rtdb.firebaseio.com/posts.json', {
          ...postData, updatedDate: new Date()
        })
          .then(res=>{
            vuexContext.commit('addPost', {...postData, id:res.data.name})
          })
          .catch(e => console.log(e))
      },
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://fir-nuxt-blog-2-default-rtdb.firebaseio.com/posts.json')
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({...res.data[key], id: key});
            }
            vuexContext.commit('setPosts', postsArray)

          })
          .catch(e => context.error(e));
        // return new Promise((resolve,reject)=>{
        //   setTimeout(()=>{
        //     vuexContext.commit('setPosts',[{
        //       id: '1',
        //       title: "First Post",
        //       previewText: "This is our first post!",
        //       thumbnail:
        //         "_nuxt/assets/images/coding2.jpeg"
        //     },
        //       {
        //         id: '2',
        //         title: "Second Post",
        //         previewText: "This is our second post!",
        //         thumbnail:
        //           "_nuxt/assets/images/coding3.png"
        //       }])
        //     resolve();
        //   }, 3000)
        // })
      },
      setPosts(VuexContext, posts) {
        VuexContext.commit('setPosts', posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
