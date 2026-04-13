<script lang="ts">
  interface Props {
    theme?: 'light' | 'dark';
    size?: number;
  }

  let { theme = 'light', size = 24 }: Props = $props();

  const colors = {
    light: { text: '#1A1A18', accent: '#B5521E', gridOpacity: 0.22 },
    dark: { text: '#E4E4DC', accent: '#D4793A', gridOpacity: 0.22 },
  };

  let c = $derived(colors[theme]);
  let markSize = $derived(size * 0.85);
  let gap = $derived(size * 0.3);
  let cellSize = $derived((markSize - markSize * 0.24) / 3);
  let cellGap = $derived(markSize * 0.12);
  let radius = $derived(cellSize * 0.18);
  let strokeWidth = $derived(Math.max(1, markSize * 0.035));

  const cells: [number, number][] = [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2]
  ];
</script>

<span class="paer-logo" style="display: inline-flex; align-items: center; gap: {gap}px;">
  <svg width={markSize} height={markSize} viewBox="0 0 {markSize} {markSize}" aria-hidden="true" role="img">
    <title>Paer</title>
    {#each cells as [row, col]}
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
  </svg>

  <span
    style="font-size: {size}px; font-family: 'Literata', Georgia, serif; font-weight: 400; letter-spacing: -0.03em; color: {c.text}; line-height: 1;"
    aria-label="Paer"
  >p<span style="color: {c.accent}; letter-spacing: -0.06em;">æ</span>r</span>
</span>
