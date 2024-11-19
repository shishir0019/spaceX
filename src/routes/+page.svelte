<script lang="ts">
  import { onMount } from "svelte";
  import { ButtonGroup, Button, Select } from "flowbite-svelte";
  import { ListOutline, GridOutline } from "flowbite-svelte-icons";
  
  import Datatable from "$lib/components/datatable";
  import Map from "$lib/components/map";
  import DoughnutChart from "$lib/components/chart";
  
  import type { ILandingZone } from "$lib/types";

  let data: ILandingZone[] = $state([]);
  let loading: boolean = $state(true);
  let listView: "list" | "grid" = $state("list");

  let params: any = $state({});

  let statusList = [
    { value: "active", name: "Active" },
    { value: "retired", name: "Retired" },
    { value: "under_construction", name: "Under construction" },
  ];

  async function fetchLandingZones(params: any = {}) {
    let url = new URL(`https://api.spacexdata.com/v3/landpads`);
    for (let key in params) {
      url.searchParams.append(key, params[key]);
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch landing zones");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching landing zones:", error);
      return [];
    }
  }

  const init = async (params: any) => {
    loading = true;
    data = await fetchLandingZones(params);
    loading = false;
  };

  onMount(() => init({}));
</script>

<div class="container mx-auto p-8">
  <div class="flex gap-5 flex-col lg:flex-row items-start">
    <div class="flex-1 order-2 lg:order-1">
      <div class="mb-3 flex justify-between">
        <ButtonGroup>
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
        <Select
          class="mt-2 max-w-[200px]"
          size="sm"
          items={statusList}
          bind:value={params.status}
          placeholder="Select by status"
          on:input={($event: any) => init({ status: $event.target.value })}
        />
      </div>
      <Datatable {data} {listView} {loading} />
    </div>
    <div
      class="w-full lg:min-w-[350px] lg:w-[350px] order-1 gap-5 lg:order-2 grid grid-cols-2 lg:grid-cols-1"
    >
      <Map {data} {loading} />
      <DoughnutChart {data} {loading} />
    </div>
  </div>
</div>
