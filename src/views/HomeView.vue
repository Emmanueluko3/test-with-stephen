<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-10">
    <h2 class="text-center text-5xl font-bold mb-10 text-gray-800">
      Test by <span class="text-blue-600">Emmanuel Stephen</span>
    </h2>

    <div class="w-full max-w-md mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search posts..."
        class="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500 text-gray-900"
      />
    </div>

    <div v-if="loading" class="text-center text-lg font-semibold text-gray-600 animate-pulse my-48">
      Loading posts...
    </div>

    <div v-else-if="filteredPosts.length === 0" class="text-center text-lg text-gray-500 my-48">
      😔 No posts found.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl"
    >
      <RouterLink
        :to="`/post-details/${post.id}`"
        v-for="post in filteredPosts"
        :key="post.id"
        class="p-6 bg-white shadow-lg rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
      >
        <h2 class="text-base md:text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm md:text-base">{{ truncateText(post.body) }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { truncateText } from '@/utils/helpers'

export default {
  data() {
    return { loading: true, searchQuery: '' }
  },
  computed: {
    ...mapState(['searchQuery']),
    ...mapGetters(['filteredPosts']),
  },
  methods: {
    ...mapActions(['fetchPosts']),
    ...mapMutations(['setSearchQuery']),
    truncateText,
  },
  watch: {
    searchQuery(newQuery) {
      this.setSearchQuery(newQuery)
    },
  },
  async mounted() {
    await this.fetchPosts()
    this.loading = false
  },
}
</script>
