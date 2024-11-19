<script lang="ts">
  import type { ILandingZone } from "$lib/types";
  import Map from "./Map.svelte";

  interface Props {
    data: ILandingZone[];
    loading?: boolean;
  }
  const { data, loading }: Props = $props();
</script>

<div>
  {#if loading}
    <div class="w-full h-[350px] bg-gray-100 rounded-lg"></div>
  {:else}
    <Map locations={data} {loading} />
  {/if}
</div>
