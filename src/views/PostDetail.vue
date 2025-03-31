<template>
  <div class="flex items-center justify-center flex-col w-full min-h-screen">
    <div
      v-if="loading"
      class="text-center text-base lg:text-lg font-semibold text-gray-600 animate-pulse"
    >
      Loading posts...
    </div>

    <div
      v-else-if="!Object.keys(post).length > 0"
      class="text-center text-base lg:text-lg text-gray-500"
    >
      😔 No posts found.
    </div>
    <div v-else class="w-10/12 md:w-1/2 flex items-center justify-center flex-col">
      <div class="bg-white shadow-lg rounded-xl border border-gray-100 p-10">
        <h1 class="text-lg md:text-2xl text-gray-900 font-bold mb-3 w-full text-center">
          {{ post.title }}
        </h1>
        <p class="text-gray-700 text-sm md:text-base">{{ post.body }}</p>
      </div>
      <RouterLink
        to="/"
        class="mt-4 block text-blue-500 text-xl py-1.5 px-5 border rounded-xl hover:text-[#fff] hover:bg-blue-500 transition-all"
        >Go Home</RouterLink
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      post: {},
    }
  },

  created() {
    const postId = this.$route.params.id
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        this.post = response.data
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        console.error('Error fetching post:', error)
      })
  },
}
</script>
