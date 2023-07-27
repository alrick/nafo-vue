export const useFilterStore = defineStore('filter', () => {

  const filterMultiselectStore = useFilterMultiselectStore()
  const filterTextStore = useFilterTextStore()

  const filter = computed(() => {
    return {
      _and: [...filterMultiselectStore.filter, ...filterTextStore.filter]
    }
  })

  const filters = computed(() => {
    return (filterMultiselectStore.filters as Filter[])
      .concat(filterTextStore.filters as Filter[])
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  })

  async function fetch() {
    await filterMultiselectStore.fetch()
  }

  function resetAll() {
    filterMultiselectStore.resetAll()
    filterTextStore.resetAll()
  }

  return { filter, filters, fetch, resetAll }
})