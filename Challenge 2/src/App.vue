<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">BaseTable demo</h1>

    <BaseTable
      :columns="columns"
      :rows="rows"
      :per-page="5"
      @row-click="onRowClick"
      @page-change="onPageChange"
    >
      <template #cell-name="{ value }">
        <span class="text-blue-600 font-semibold">{{ value }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from './components/BaseTable.vue'

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
])

const rows = ref(Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
})))

function onRowClick(row) {
  // demo behaviour — replace with application logic
  console.log('row clicked', row)
}

function onPageChange(page) {
  console.log('page changed to', page)
}
</script>

<style>
/* If Tailwind is configured in the project, styles will apply. */
</style>
