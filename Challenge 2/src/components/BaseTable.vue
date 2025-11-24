<template>
  <div class="w-full">
    <table class="min-w-full divide-y divide-gray-200 border">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, rowIndex) in displayedRows"
          :key="rowIndex"
          class="hover:bg-gray-50 cursor-pointer"
          @click="$emit('row-click', row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showPagination && totalPages > 1" class="mt-3">
      <BasePagination
        :page="page"
        :perPage="perPage"
        :total="rows.length"
        @update:page="onPageUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BasePagination from './BasePagination.vue'

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  perPage: { type: Number, default: 10 },
  initialPage: { type: Number, default: 1 },
  showPagination: { type: Boolean, default: true }
})

const emit = defineEmits(['row-click', 'page-change'])

const page = ref(props.initialPage)

const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / props.perPage)))

const displayedRows = computed(() => {
  if (!props.showPagination) return props.rows
  const start = (page.value - 1) * props.perPage
  return props.rows.slice(start, start + props.perPage)
})

watch(() => props.rows, () => {
  if (page.value > totalPages.value) page.value = 1
})

watch(page, (p) => emit('page-change', p))

function onPageUpdate(p) {
  page.value = p
}
</script>

<style scoped>
/* Minimal scoped styling - layout is via Tailwind CSS */
</style>
