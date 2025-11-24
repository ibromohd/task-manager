<template>
  <nav class="flex items-center justify-center space-x-1" aria-label="Pagination">
    <button
      class="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
      :disabled="page <= 1"
      @click="setPage(page - 1)"
    >
      Prev
    </button>

    <button
      v-for="p in pages"
      :key="p"
      @click="setPage(p)"
      :class="['px-3 py-1 rounded border', { 'bg-blue-600 text-white': p === page, 'bg-white hover:bg-gray-50': p !== page } ]"
    >
      {{ p }}
    </button>

    <button
      class="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
      :disabled="page >= totalPages"
      @click="setPage(page + 1)"
    >
      Next
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  perPage: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
  maxPagesToShow: { type: Number, default: 7 }
})

const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

const pages = computed(() => {
  const totalP = totalPages.value
  const maxShow = Math.max(3, props.maxPagesToShow)
  if (totalP <= maxShow) return Array.from({ length: totalP }, (_, i) => i + 1)

  let start = Math.max(1, props.page - Math.floor(maxShow / 2))
  let end = start + maxShow - 1
  if (end > totalP) {
    end = totalP
    start = end - maxShow + 1
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

function setPage(p) {
  p = Math.max(1, Math.min(totalPages.value, p))
  if (p !== props.page) emit('update:page', p)
}
</script>

<style scoped>
/* small visual tweaks may go here if desired */
</style>
