<script lang="ts">
  import { onMount } from "svelte";
  import "ol/ol.css";
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
  import { Point } from "ol/geom";
  import Feature from "ol/Feature";
  import { Vector as VectorLayer } from "ol/layer";
  import { Vector as VectorSource } from "ol/source";
  import { Style, Circle, Fill, Stroke } from "ol/style";
  import type { ILandingZone } from "$lib/types";
  import { Card } from "flowbite-svelte";

  interface Props {
    locations: ILandingZone[];
    loading?: boolean;
  }

  const props: Props = $props();

  let map;
  const fromLonLat = (lonLat: any) => {
    return [
      (lonLat[0] * 20037508.34) / 180,
      Math.log(Math.tan(((90 + lonLat[1]) * Math.PI) / 360)) / (Math.PI / 180),
    ];
  };

  onMount(() => {
    const features = props.locations.map((location) => {
      const feature = new Feature({
        geometry: new Point(
          fromLonLat([location.location.longitude, location.location.latitude])
        ),
      });
      feature.set("name", location.full_name);
      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color:
                location.status === "active"
                  ? "#0f0"
                  : location.status === "retired"
                    ? "#f00"
                    : "#00f",
            }),
            stroke: new Stroke({
              color: "#fff",
              width: 1,
            }),
          }),
        })
      );
      return feature;
    });

    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: features,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 0,
      }),
    });
  });
</script>

<Card padding="none">
  <h5 class="font-bold tracking-tight text-gray-900 mx-5 my-3">Map View</h5>
  <div id="map" class="h-[300px] w-full"></div>
</Card>
