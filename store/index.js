import Vuex from 'vuex';
// import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token
      },
    },
    actions: {
      authenticateUser(vuexContext, authData) {
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if (authData.isLogin) {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        }
        return this.$axios.$post(url + process.env.fbAPIKey, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(data => {
              vuexContext.commit('setToken', data.idToken);
            }
          )
          .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios.$put('/posts/' + editedPost.id + '.json?auth='+vuexContext.state.token, editedPost)
          .then(data => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },
      addPost(vuexContext, postData) {
        return this.$axios.$post('/posts.json?auth='+vuexContext.state.token, {
          ...postData, updatedDate: new Date()
        })
          .then(data => {
            vuexContext.commit('addPost', {...postData, id: data.name})
          })
          .catch(e => console.log(e))
      },
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios.$get('/posts.json')
          .then(data => {
            // console.log(res)
            const postsArray = [];
            for (const key in data) {
              postsArray.push({...data[key], id: key});
            }
            vuexContext.commit('setPosts', postsArray)

          })
          .catch(e => context.error(e));
      },
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
      // },
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
