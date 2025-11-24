# BaseTable + BasePagination (Vue + Tailwind)

Files added:
- `src/components/BaseTable.vue` — table component with props `columns`, `rows`, automatic headers/rows rendering, scoped slots `#cell-[key]`, emits `row-click`, integrates pagination.
- `src/components/BasePagination.vue` — reusable pagination component (`page`, `perPage`, `total`) emits `update:page`.
- `src/App.vue` — small demo showing usage and a custom `#cell-name` slot.

Quick usage

1. Ensure your project is a Vue 3 app with Tailwind CSS configured.
2. Copy the components into `src/components/` and import `BaseTable` where needed.

Example columns format:

```
[ { key: 'name', label: 'Name' } ]
```

Scoped cell slot example:

```
<BaseTable :columns="columns" :rows="rows">
  <template #cell-name="{ row, value }">
    <span class="text-blue-600">{{ value }}</span>
  </template>
</BaseTable>
```

Events:
- `row-click` — emitted with the clicked row object.
- `page-change` — emitted when the current page changes.

Customization:
- Toggle pagination by passing `:show-pagination="false"` to `BaseTable`.
- Adjust `:per-page` to change page size.

If you want, I can wire this into your project's main entry, add a demo page, or create unit tests. Do you want me to commit these files to git next? 
