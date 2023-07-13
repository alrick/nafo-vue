import { MultiSelectFilter } from '~/types/MultiSelectFilter'
import { TextFilter } from '~/types/TextFilter'

export const useFilterStore = defineStore('filter', () => {
  const filters: Ref<(TextFilter | MultiSelectFilter)[]> = ref([])

  // Generate the filter object based on active filters
  const filter = computed(() => {
    return {
      _and: filters.value.map(filter => filter.getFilterValue())
    }
  })

  async function fetch() {
    if(filters.value.length === 0) {
      const multiSelectOptions = await fetchOptions()
      const data = await queryContent('filter').sort({ id: 1 }).find()

      filters.value = data.map((filterData: any) => {
        if (filterData.type === 'multiselect') {
          let list = sanitizeAndSort(multiSelectOptions.map((option: any) => option[filterData.criteria]))
          return new MultiSelectFilter(filterData.id, filterData.title, filterData.type, filterData.criteria, list)
        } else if (filterData.type === 'text') {
          return new TextFilter(filterData.id, filterData.title, filterData.type, filterData.criteria, filterData.placeholder)
        }
      }).filter(isDefined)
    }
  }

  function resetAll() {
    filters.value.forEach(filter => {
      filter.reset()
    })
  }

  return {
    filter, filters, fetch, resetAll
  }
})

function isDefined<T>(arg: T | undefined): arg is T {
  return arg !== undefined;
}

async function fetchOptions() {
  const { data } = await useAsyncGql('GetMultiSelectOptions')
  return data?.value?.filters || []
}