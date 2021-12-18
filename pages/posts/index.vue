<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>

export default {
  middleware:'log',
  computed:{
    loadedPosts(){
     return this.$store.getters.loadedPosts
  }
}
  // data() {
  //   return {
  //     loadedPosts: [
  //       {
  //         id: '1',
  //         title: "First Post",
  //         previewText: "This is our first post!",
  //         thumbnail:
  //           "_nuxt/assets/images/coding2.jpeg"
  //       },
  //       {
  //         id: '2',
  //         title: "Second Post",
  //         previewText: "This is our second post!",
  //         thumbnail:
  //           "_nuxt/assets/images/coding3.png"
  //       }
  //     ]
  //   };
  // },
  // asyncData(ctx) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: '1',
  //             title: "First Post",
  //             previewText: "This is our first post!",
  //             thumbnail:
  //               "_nuxt/assets/images/coding2.jpeg"
  //           },
  //           {
  //             id: '2',
  //             title: "Second Post",
  //             previewText: "This is our second post!",
  //             thumbnail:
  //               "_nuxt/assets/images/coding3.png"
  //           }
  //         ]
  //       });
  //     }, 1000);
  //     //reject(new Error())
  //   })
  //     .then(data => {
  //       return data
  //     })
  //     .catch(e => {
  //       return e
  //     })
  // },
  // created(){
  //   this.$store.dispatch('setPosts',this.loadedPosts)
  // }
  // asyncData(ctx, callback) {
  //   console.log(ctx)
  //   setTimeout(() => {
  //     callback(null, {
  //
  //       loadedPosts: [
  //         {
  //           id: '1',
  //           title: "First Post",
  //           previewText: "This is our first post!",
  //           thumbnail:
  //             "_nuxt/assets/images/coding2.jpeg"
  //         },
  //         {
  //           id: '2',
  //           title: "Second Post",
  //           previewText: "This is our second post!",
  //           thumbnail:
  //             "_nuxt/assets/images/coding3.png"
  //         }
  //       ]
  //     });
  //   }, 1000);
  // }

}
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
