import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    posts: [],
    searchQuery: '',
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('setPosts', response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
  },
  getters: {
    filteredPosts: (state) => {
      return state.posts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },
  },
})
