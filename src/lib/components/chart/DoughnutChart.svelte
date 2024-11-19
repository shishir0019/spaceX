<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import ChartJS from "chart.js/auto";
  import type { Chart, ChartData, ChartOptions } from "chart.js";
  import type { ILandingZone } from "$lib/types";
  import { Card } from "flowbite-svelte";

  interface Props {
    locations: ILandingZone[];
    loading?: boolean;
  }

  const props: Props = $props();

  let chart: Chart | null = null;

  const chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      // @ts-ignore
      legend: false,
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} units`;
          },
        },
      },
    },
    cutout: 90
  };

  const successRate = (landingZone: ILandingZone): number => {
    return Math.round(
      (landingZone.successful_landings / landingZone.attempted_landings) * 100
    );
  };

  const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  onMount(() => {
    const chartData: ChartData = {
      labels: props.locations.map((location) => location.full_name),
      datasets: [
        {
          label: "Success Rate Chart",
          data: props.locations.map((location) => successRate(location)),
          backgroundColor: props.locations.map((location) => getRandomRGB()),
          borderWidth: 0,
          spacing: 1
        },
      ],
    };

    const ctx = document.getElementById("chat-container") as HTMLCanvasElement;
    chart = new ChartJS(ctx, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>
<Card padding="none">
  <h5 class="font-bold tracking-tight text-gray-900 mx-5 my-3">Success Rate Chart</h5>
  <div class="flex items-center justify-center relative p-5 h-[300px]">
    <div class="absolute inset-0 flex flex-col justify-center items-center">
      <span class="text-5xl font-bold">{props.locations.length}</span>
      <span>Landing Pads</span>
    </div>
    <canvas id="chat-container"></canvas>
  </div>
</Card>
