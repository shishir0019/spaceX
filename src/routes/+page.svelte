<script lang="ts">
  import type { ILandingZone } from "$lib/types";
  import { onMount } from "svelte";
  import { ButtonGroup, Button, Card } from "flowbite-svelte";
  import { ListOutline, GridOutline } from "flowbite-svelte-icons";

  import Datatable from "$lib/components/datatable";

  import Map from "$lib/components/Map.svelte";

  let data: ILandingZone[] = $state([]);
  let loading: boolean = $state(true);
  let listView: "list" | "grid" = $state("list");

  async function fetchLandingZones() {
    try {
      const response = await fetch("https://api.spacexdata.com/v3/landpads");
      if (!response.ok) {
        throw new Error("Failed to fetch landing zones");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching landing zones:", error);
      return [];
    }
  }
  onMount(async () => {
    loading = true;
    data = await fetchLandingZones();
    loading = false;
  });
</script>

<div class="p-8">
  <div class="grid grid-cols-12 gap-5 items-start">
    <div class="col-span-8">
      <div class="mb-3">
        <ButtonGroup size="xs">
          <Button
            size="xs"
            on:click={() => (listView = "list")}
            class={listView === "list" ? "text-orange-500" : ""}
            ><ListOutline /></Button
          >
          <Button
            size="xs"
            on:click={() => (listView = "grid")}
            class={listView === "grid" ? "text-orange-500" : ""}
            ><GridOutline /></Button
          >
        </ButtonGroup>
      </div>
      <Datatable {data} {listView} {loading} />
    </div>
    <div class="col-span-4 border shadow-lg rounded-lg overflow-hidden">
      {#if loading}
        <div class="w-full h-[450px] bg-gray-100"></div>
      {:else}
        <div class="my-2 mx-3 font-bold">Map View</div>
        <Map locations={data} />
      {/if}
    </div>
  </div>
</div>
