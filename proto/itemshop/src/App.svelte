<script>
  import ItemGrid from './lib/ItemGrid.svelte';
  import { ITEMS } from './lib/data/items';

  const data = { title: 'Items', items: ITEMS };
</script>

<main class="page">
  <ItemGrid {data} />
</main>

<style>
  .page {
    min-height: 100svh;
    padding: 28px 18px;
    display: grid;
    place-items: start center;
    background:
      radial-gradient(1200px 700px at 50% -10%, rgba(255, 255, 255, 0.08), transparent 60%),
      radial-gradient(900px 600px at 8% 12%, rgba(168, 85, 247, 0.18), transparent 55%),
      radial-gradient(900px 600px at 92% 18%, rgba(59, 130, 246, 0.16), transparent 55%),
      linear-gradient(180deg, #050814 0%, #040611 100%);
  }
</style>
