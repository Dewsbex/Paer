<script>
  /** @type {'light' | 'dark'} */
  export let theme = 'light';
  /** @type {number} */
  export let size = 24;

  const colors = {
    light: { text: '#1A1A18', accent: '#B5521E', gridOpacity: 0.22 },
    dark: { text: '#E4E4DC', accent: '#D4793A', gridOpacity: 0.22 },
  };

  $: c = colors[theme];
  $: markSize = size * 0.85;
  $: gap = size * 0.3;
  $: cellSize = (markSize - markSize * 0.24) / 3;
  $: cellGap = markSize * 0.12;
  $: radius = cellSize * 0.18;
  $: strokeWidth = Math.max(1, markSize * 0.035);
  $: fontSize = size;
</script>

<span class="paer-logo" style="display: inline-flex; align-items: center; gap: {gap}px;">
  <!-- Sieve Mark -->
  <svg width={markSize} height={markSize} viewBox="0 0 {markSize} {markSize}" aria-label="Paer logo mark">
    {#each [0, 1, 2] as row}
      {#each [0, 1, 2] as col}
        {@const isHighlight = row === 1 && col === 2}
        {@const x = col * (cellSize + cellGap)}
        {@const y = row * (cellSize + cellGap)}
        <rect
          {x} {y}
          width={cellSize} height={cellSize}
          rx={radius}
          fill={isHighlight ? c.accent : 'none'}
          stroke={isHighlight ? c.accent : c.text}
          stroke-width={strokeWidth}
          opacity={isHighlight ? 1 : c.gridOpacity}
        />
      {/each}
    {/each}
  </svg>

  <!-- Wordmark -->
  <span
    style="font-size: {fontSize}px; font-family: 'Literata', Georgia, serif; font-weight: 400; letter-spacing: -0.03em; color: {c.text}; line-height: 1;"
    aria-label="Paer"
  >p<span style="color: {c.accent}; letter-spacing: -0.06em;">æ</span>r</span>
</span>
