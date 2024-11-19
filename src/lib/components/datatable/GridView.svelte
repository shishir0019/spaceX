<script lang="ts">
  import { Button, Progressbar, Card, Badge } from "flowbite-svelte";
  import { LinkOutline } from "flowbite-svelte-icons";

  import type { ILandingZone } from "$lib/types";

  let { item, showMessage }: { item: ILandingZone; showMessage: Function } =
    $props();

  const successRate = (landingZone: ILandingZone): number => {
    return Math.round(
      (landingZone.successful_landings / landingZone.attempted_landings) * 100
    );
  };
</script>

<Card class="shadow-none">
  <blockquote class="text-gray-500 flex flex-col h-full">
    <div class="flex-1">
      <div>
        <Badge
          rounded
          color={(item as ILandingZone).status === "active"
            ? "green"
            : (item as ILandingZone).status === "retired"
              ? "red"
              : "blue"} class="capitalize">{(item as ILandingZone).status}</Badge
        >
        <h3 class="text-lg font-semibold text-gray-900">{item.full_name}</h3>
      </div>
      <small class="text-gray-500">{item.location.name}</small>
      <small class="text-green-700 font-bold">({item.location.region})</small>
    </div>
    <div class="">
      <p class="my-4 font-light">
        <Button size="xs" color="alternative" on:click={() => showMessage(item)}
          >View Details</Button
        >
      </p>
      <div>
        {#if successRate(item as ILandingZone)}
          <Progressbar
            progress={successRate(item as ILandingZone)}
            color="green"
          />
          <div
            class="mb-1 text-xs text-base font-medium text-green-700 dark:text-green-500"
          >
            Success: {successRate(item as ILandingZone)} %
          </div>
        {:else}
          <span>N/A</span>{/if}
      </div>
      <div>
        <a
          href="#"
          class="text-orange-500 text-xs hover:underline flex items-center gap-1"
        >
          <LinkOutline class="w-3 h-3" />
          Wikipedia</a
        >
      </div>
    </div>
  </blockquote>
</Card>
