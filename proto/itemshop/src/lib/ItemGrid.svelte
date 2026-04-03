<script>
  import ItemDetailModal from './ItemDetailModal.svelte';

  /** @type {{ title: string; items: Array<any> }} */
  export let data;

  /** @type {any | null} */
  let selected = null;
</script>

<section class="wrap" aria-label={data.title}>
  <header class="header">
    <h2 class="title">{data.title}</h2>
  </header>

  <div class="grid" role="list">
    {#each data.items as item, i (item.id)}
      <button
        class="tile"
        type="button"
        aria-label={`${item.name} - ${item.price} gold`}
        on:click={() => (selected = item)}
      >
        <span class="iconFrame" style={`--h:${(i * 33) % 360}deg`}>
          <img class="icon" src={item.iconSrc} alt="" loading="lazy" />
        </span>
        <span class="price">{item.price}</span>
      </button>
    {/each}
  </div>
</section>

<ItemDetailModal data={{ open: !!selected, item: selected }} on:close={() => (selected = null)} />

<style>
  .wrap {
    width: min(1120px, 100%);
    background: radial-gradient(1200px 600px at 25% 0%, rgba(82, 44, 171, 0.28), transparent 55%),
      radial-gradient(900px 500px at 85% 15%, rgba(17, 170, 255, 0.18), transparent 60%),
      linear-gradient(180deg, #0a1020 0%, #070b16 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 18px 18px 22px;
    box-shadow:
      rgba(0, 0, 0, 0.5) 0 18px 50px -18px,
      rgba(0, 0, 0, 0.35) 0 10px 22px -12px;
  }

  .header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .title {
    margin: 0;
    letter-spacing: 1.2px;
    font-weight: 800;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.92);
    text-transform: uppercase;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
    gap: 12px;
    align-items: start;
    justify-items: center;
  }

  .tile {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 8px;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    text-align: center;
  }

  .tile:focus-visible {
    outline: 2px solid rgba(96, 165, 250, 0.9);
    outline-offset: 3px;
    border-radius: 10px;
  }

  .iconFrame {
    width: 64px;
    height: 64px;
    margin: 0 auto;
    border-radius: 8px;
    position: relative;
    display: grid;
    place-items: center;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
      radial-gradient(70px 70px at 30% 25%, hsla(var(--h), 95%, 65%, 0.45), transparent 60%),
      radial-gradient(75px 75px at 70% 75%, hsla(calc(var(--h) + 120deg), 95%, 60%, 0.35), transparent 55%),
      #0d1222;
    box-shadow:
      rgba(0, 0, 0, 0.65) 0 10px 22px -14px,
      inset rgba(255, 255, 255, 0.08) 0 1px 0;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .iconFrame::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    box-shadow: inset rgba(0, 0, 0, 0.35) 0 0 0 1px;
    pointer-events: none;
  }

  .tile:hover .iconFrame {
    border-color: rgba(255, 255, 255, 0.28);
    transform: translateY(-1px);
    transition: transform 140ms ease, border-color 140ms ease;
  }

  .icon {
    width: 54px;
    height: 54px;
    display: block;
    filter: drop-shadow(0 10px 12px rgba(0, 0, 0, 0.45));
    user-select: none;
    pointer-events: none;
  }

  .price {
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0.2px;
    color: #d6b45a;
    text-shadow: rgba(0, 0, 0, 0.8) 0 2px 0;
    line-height: 1;
  }

  @media (max-width: 520px) {
    .wrap {
      padding: 14px 14px 18px;
      border-radius: 12px;
    }

    .grid {
      grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
      gap: 10px;
    }

    .iconFrame {
      width: 60px;
      height: 60px;
    }

    .icon {
      width: 50px;
      height: 50px;
    }
  }
</style>
