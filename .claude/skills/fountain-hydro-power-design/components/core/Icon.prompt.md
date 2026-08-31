Renders a single stroke icon from the substituted Lucide set; use anywhere a glyph is needed instead of emoji or Unicode characters.

```jsx
<Icon name="droplet" size={20} />
<Icon name="alert-triangle" size={16} color="var(--status-warning)" label="Advertencia" />
```

Requires the Lucide UMD script on the page. Stroke is fixed at 1.5px; icons inherit `currentColor` unless `color` is set. Never mix filled glyph sets with these.
