The system's action control; `primary` teal for the single main action per view, `secondary` outline for everything alongside it.

```jsx
<Button variant="primary" iconLeft={<Icon name="download" size={16} />}>Descargar informe</Button>
```

Variants: primary · secondary · ghost · inverse (on teal or dark) · danger. Sizes sm/md/lg (30/38/46px). Labels are sentence case Spanish, set in Bahnschrift with wide tracking. Corners are 4px — never pill-shaped. Hover darkens one teal step, press darkens a second; nothing scales.
