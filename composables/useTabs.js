import { useRoute, useRouter } from '#imports'
import { ref, watch } from 'vue'

/**
 * useTabs - composable to manage tabs
 * @param {[{name: String, value: String}] | [name: String]} tabs - list of tabs to manage
 * @param {String} defaultActiveTab - default active tab
 */
export default function (
  tabs,
  {
    defaultActiveTab = tabs?.length ? tabs[0]?.value ?? tabs[0] : '',
    onChange = () => null,
    trackInRoute = false,
    replace,
  } = {}
) {
  const activeTabName = 'active_tab'
  const route = useRoute()
  const router = useRouter()
  const activeTab = ref(
    trackInRoute && route.query[activeTabName]
      ? decodeURIComponent(route.query[activeTabName]) ?? defaultActiveTab
      : defaultActiveTab
  )

  if (trackInRoute && !route.query[activeTabName]) updateRoute(defaultActiveTab)

  if (trackInRoute)
    watch(route, (newValue) => {
      activeTab.value = newValue.query[activeTabName]
    })

  function setActiveTab(value) {
    activeTab.value = value
    if (trackInRoute) updateRoute(value)
    onChange()
  }

  function updateRoute(value) {
    router.push({
      ...route,
      query: { ...route.query, [activeTabName]: encodeURIComponent(value) },
      replace,
    })
  }

  function isTabActive(value) {
    return activeTab.value === value
  }

  const onSetActive = setActiveTab
  const onIsTabActive = isTabActive

  function getTabsProps() {
    return {
      activeTab: activeTab.value,
      onSetActive,
      onIsTabActive,
      tabs,
    }
  }

  return {
    activeTab,
    setActiveTab,
    isTabActive,
    getTabsProps,
  }
}
