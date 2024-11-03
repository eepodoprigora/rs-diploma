import React, { useEffect, useState } from "react";
import s from "./map.module.scss";

interface YandexMapProps {
  latitude: string | null;
  longitude: string | null;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const MapComponent = ({ latitude, longitude }: YandexMapProps) => {
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps) {
        initMap();
      } else {
        const existingScript = document.getElementById("yandex-map-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.src =
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=d75691da-a8a4-49d6-a893-26b581c783b3";
          script.async = true;
          script.id = "yandex-map-script";
          script.onload = () => {
            window.ymaps.ready(initMap);
          };
          document.body.appendChild(script);
        }
      }
    };

    const initMap = () => {
      if (window.ymaps && latitude && longitude) {
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          try {
            if (typeof window.ymaps.Map === "function") {
              const newMapInstance = new window.ymaps.Map("map", {
                center: [+latitude, +longitude],
                zoom: 12,
              });
              const placemark = new window.ymaps.Placemark([
                +latitude,
                +longitude,
              ]);
              newMapInstance.geoObjects.add(placemark);
              setMapInstance(newMapInstance);
            } else {
              console.error(
                "window.ymaps.Map is not a constructor. Check if ymaps is loaded correctly."
              );
            }
          } catch (error) {
            console.error("Error initializing the map:", error);
          }
        }
      }
    };

    loadYandexMap();

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (mapInstance && latitude && longitude) {
      mapInstance.setCenter([+latitude, +longitude]);
      mapInstance.geoObjects.each((placemark: any) => {
        mapInstance.geoObjects.remove(placemark);
      });
      const newPlacemark: any = new window.ymaps.Placemark([
        +latitude,
        +longitude,
      ]);
      mapInstance.geoObjects.add(newPlacemark);
    }
  }, [latitude, longitude, mapInstance]);

  if (!latitude || !longitude) {
    return <p>Loading map...</p>;
  }

  return <div id="map" className={s.map} />;
};

export const Map = React.memo(MapComponent);
