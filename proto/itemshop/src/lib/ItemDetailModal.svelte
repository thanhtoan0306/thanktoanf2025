<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  /** @type {{ open: boolean; item: any }} */
  export let data;

  const dispatch = createEventDispatcher();

  /** @type {HTMLElement | null} */
  let panelEl = null;

  function close() {
    dispatch('close');
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  let prevOverflow = '';
  $: if (data?.open) {
    prevOverflow = document?.body?.style?.overflow ?? '';
    if (document?.body) document.body.style.overflow = 'hidden';
  } else {
    if (document?.body) document.body.style.overflow = prevOverflow;
  }

  onMount(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  });

  onDestroy(() => {
    if (document?.body) document.body.style.overflow = prevOverflow;
  });

  $: if (data?.open && panelEl) {
    queueMicrotask(() => panelEl?.focus());
  }
</script>

{#if data?.open && data?.item}
  <div class="backdrop" on:mousedown|self={close} aria-hidden="true"></div>

  <div class="modal" role="dialog" aria-modal="true" aria-label={`${data.item.name} details`}>
    <div class="panel" bind:this={panelEl} tabindex="-1">
      <header class="head">
        <div class="meta">
          <div class="nameRow">
            <img class="icon" src={data.item.iconSrc} alt="" />
            <div class="nameCol">
              <div class="name">{data.item.name}</div>
              <div class="sub">
                <span class="tier">{data.item.tier}</span>
                <span class="dot">•</span>
                <span class="gold">{data.item.price} gold</span>
              </div>
            </div>
          </div>
        </div>

        <button class="x" type="button" on:click={close} aria-label="Close dialog">
          ✕
        </button>
      </header>

      <div class="body">
        {#if data.item.descriptionText}
          <p class="desc">{data.item.descriptionText}</p>
        {/if}

        {#if data.item.categories?.length}
          <div class="chips" aria-label="Categories">
            {#each data.item.categories as c (c)}
              <span class="chip">{c}</span>
            {/each}
          </div>
        {/if}

        {#if data.item.stats?.length}
          <div class="stats" aria-label="Stats">
            {#each data.item.stats as s (s.label)}
              <div class="stat">
                <div class="label">{s.label}</div>
                <div class="value">{s.value}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <footer class="foot">
        <button class="btn" type="button" on:click={close}>Close</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.62);
    backdrop-filter: blur(3px);
    z-index: 50;
  }

  .modal {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 18px;
    z-index: 60;
  }

  .panel {
    width: min(640px, 100%);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      radial-gradient(900px 520px at 20% 0%, rgba(82, 44, 171, 0.35), transparent 55%),
      radial-gradient(700px 450px at 90% 10%, rgba(17, 170, 255, 0.22), transparent 55%),
      linear-gradient(180deg, #0a1020 0%, #070b16 100%);
    box-shadow:
      rgba(0, 0, 0, 0.65) 0 30px 90px -30px,
      rgba(0, 0, 0, 0.45) 0 18px 38px -22px;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.9);
  }

  .head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 16px 16px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nameRow {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
  }

  .name {
    font-weight: 900;
    letter-spacing: 0.2px;
    font-size: 20px;
    line-height: 1.2;
  }

  .sub {
    margin-top: 4px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 13px;
  }

  .tier {
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid rgba(214, 180, 90, 0.35);
    background: rgba(214, 180, 90, 0.12);
    color: rgba(214, 180, 90, 0.95);
    font-weight: 800;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    font-size: 11px;
  }

  .gold {
    color: #d6b45a;
    font-weight: 900;
  }

  .x {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    flex: 0 0 auto;
  }

  .x:hover {
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.1);
  }

  .x:focus-visible {
    outline: 2px solid rgba(96, 165, 250, 0.9);
    outline-offset: 2px;
  }

  .body {
    padding: 14px 16px 16px;
  }

  .desc {
    margin: 0 0 14px;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.45;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 14px;
  }

  .chip {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.78);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.2px;
  }

  .stats {
    display: grid;
    gap: 10px;
  }

  .stat {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
  }

  .label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .value {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 900;
    font-size: 14px;
    text-align: right;
  }

  .foot {
    padding: 12px 16px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    padding: 10px 12px;
    font-weight: 900;
    cursor: pointer;
  }

  .btn:hover {
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.12);
  }

  .btn:focus-visible {
    outline: 2px solid rgba(96, 165, 250, 0.9);
    outline-offset: 2px;
  }
</style>

