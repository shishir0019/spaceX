<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
    Modal,
    Badge,
    Progressbar
  } from "flowbite-svelte";

  import {LinkOutline } from "flowbite-svelte-icons";

  interface Props {
    data: ILandingZone[];
    loading: boolean;
    listView: "list" | "grid";
  }

  const { data, loading, listView }: Props = $props();

  import type { ILandingZone } from "$lib/types";
  import GridView from "./GridView.svelte";

  let selected: ILandingZone | null = $state(null);
  let isModalOpen: boolean = $state(false);

  const successRate = (landingZone: ILandingZone): number => {
    return Math.round(
      (landingZone.successful_landings / landingZone.attempted_landings) * 100
    );
  };

  const modalOpenHandler = (landingZone: ILandingZone): void => {
    selected = landingZone;
    isModalOpen = true;
  };

  const modalCloseHandler = (): void => {
    selected = null;
    isModalOpen = false;
  };
</script>
{#if loading}
  <div class="w-full h-[400px] bg-gray-100"></div>
{:else}
  {#if listView === "list"}
    <Table items={data}>
      <TableHead>
        <TableHeadCell>FULL NAME</TableHeadCell>
        <TableHeadCell>LOCATION NAME</TableHeadCell>
        <TableHeadCell>REGION</TableHeadCell>
        <TableHeadCell>DETAILS</TableHeadCell>
        <TableHeadCell>SUCCESS RATE</TableHeadCell>
        <TableHeadCell>WIKIPEDIA LINK</TableHeadCell>
        <TableHeadCell>STATUS</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        <TableBodyRow slot="row" let:item>
          <TableBodyCell class="px-3 py-0"
            >{(item as ILandingZone).full_name}</TableBodyCell
          >
          <TableBodyCell class="px-3 py-0"
            >{(item as ILandingZone).location.name}</TableBodyCell
          >
          <TableBodyCell class="px-3 py-0"
            >{(item as ILandingZone).location.region}</TableBodyCell
          >
          <TableBodyCell class="px-3 py-0">
            <Button
              size="xs"
              color="alternative"
              on:click={() => modalOpenHandler(item as ILandingZone)}
              >View Details</Button
            >
          </TableBodyCell>
          <TableBodyCell class="px-3 py-0">
            <div class="my-4">
              {#if successRate(item as ILandingZone)}
                <Progressbar
                  progress={successRate(item as ILandingZone)}
                  color="green"
                />
                <div
                  class="mb-1 text-base font-medium text-green-700 dark:text-green-500"
                >
                  {successRate(item as ILandingZone)} %
                </div>
              {:else}
                <span>N/A</span>{/if}
            </div>
          </TableBodyCell>
          <TableBodyCell class="px-3 py-0">
            <a
              class="text-blue-500"
              href={(item as ILandingZone).wikipedia}
              target="_blank"
            >
              <LinkOutline />
            </a>
          </TableBodyCell>
          <TableBodyCell class="px-3 py-0">
            <Badge
              rounded
              color={(item as ILandingZone).status === "active"
                ? "green"
                : (item as ILandingZone).status === "retired"
                  ? "red"
                  : "blue"}>{(item as ILandingZone).status}</Badge
            >
          </TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  {:else}
    <div class="grid md:grid-cols-4 gap-2">
      {#each data as item, i}
        <GridView {item} showMessage={modalOpenHandler} />
      {/each}
    </div>
  {/if}

  <Modal
    title={selected?.full_name}
    bind:open={isModalOpen}
    on:close={modalCloseHandler}
  >
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      {selected?.details}
    </p>
  </Modal>
{/if}
