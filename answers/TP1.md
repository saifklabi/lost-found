# TP1 — Campus Lost & Found: Answers & Report

## Exercise 7 (CP6) — The Empty List
**Why does an app need an empty state?**  
An app needs an empty state to clearly inform the user that no items exist yet rather than presenting a confusing blank or seemingly frozen screen, confirming that the system is operating correctly and guiding the user on how to add their first item.

---

## Exercise 9 (CP8) — Running on the Web
**Visual difference between the emulator and the browser:**  
In the web browser, the viewport default stretches horizontally across the screen without physical phone bezels, standard web browser scrollbars appear upon vertical overflow, and web-specific text selection highlights and input focus outlines are visible, compared to the mobile emulator which renders platform-native touches, native fonts, and virtual device status bar/navigation insets.

---

## Bonus — Remove an Item
A long-press handler (`onLongPress`) was implemented on each item card. When an item is long-pressed:
- On native (Android emulator / iOS): A native confirmation dialog (`Alert.alert`) prompts the user to confirm deletion.
- On web: A browser confirmation modal (`window.confirm`) prompts the user to confirm deletion.
- Upon confirmation, the item is removed immutably from the list state using `items.filter((item) => item.id !== id)`.

---

## Exit Questions

### 1. What is the difference between a prop and state?
- **Props (Properties):** Read-only configuration passed from a parent component down to a child component (like arguments to a function). The receiving component cannot modify its own props.
- **State:** Mutable data managed internally within a component (via hooks like `useState`). State can change over time in response to user actions or network events, and updating state triggers React to re-render the component.

### 2. Why do we write `setItems([newItem, ...items])` instead of `items.push(newItem)`?
React relies on shallow reference equality (`Object.is`) to detect when state changes and schedule a re-render. 
`items.push(newItem)` mutates the existing array in place without changing its memory reference, so React does not detect any change and will not update the UI. 
Using `setItems([newItem, ...items])` creates a brand new array instance containing the new item prepended to the previous items, ensuring immutability and triggering React to re-render the screen.

### 3. Why must every text be inside `<Text>`?
React Native does not use a browser DOM with HTML elements like `<div>` or `<p>`. Instead, React Native components directly map to platform-native UI widgets (such as `TextView` on Android and `UILabel` on iOS). Native containers (`<View>`) cannot directly render raw string primitives; only the React Native `<Text>` component bridges to native text rendering views with font, line height, and text layout metrics. Placing plain text outside `<Text>` throws a runtime error.
