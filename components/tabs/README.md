# Tabs

## Content
- TabsProvider: Provide context for tabs
- Tabs: Control tab selection
- TabsPanel: Wrap view for each tab

## TabsProvider
### Props
- tabs: An array of strings of in the format
  `[{name: String, value: String | Number | Symbol>]`

## Tabs
Render inside TabsProvider to render controls for tabs context

## TabsPanel
Insert one for each tab inside the TabsProvider context.
Renders active based on index.

    i.e. the content inside the third
    <TabsPanel></TabsPanel> is rendered 
    when the third tab is active
