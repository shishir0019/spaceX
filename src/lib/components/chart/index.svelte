<script lang="ts">
  import DoughnutChart from "./DoughnutChart.svelte";
  import type { ILandingZone } from "$lib/types";

  interface Props {
    data: ILandingZone[];
    loading?: boolean;
  }
  const { data, loading }: Props = $props();
</script>

<div>
  <div>
    {#if loading}
      <div class="w-full h-[350px] bg-gray-100 rounded-lg"></div>
    {:else}
      <DoughnutChart locations={data} {loading} />
    {/if}
  </div>
</div>
