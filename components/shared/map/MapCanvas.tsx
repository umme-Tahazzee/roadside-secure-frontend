"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";

export type MarkerKind = "customer" | "mechanic" | "closest" | "me";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  kind: MarkerKind;
  label?: string;
}

export interface MapLine {
  from: [number, number];
  to: [number, number];
  label?: string;
}

// Dhaka, used only when there is nothing to show yet
const DEFAULT_CENTER: [number, number] = [23.8103, 90.4125];

const COLORS: Record<MarkerKind, string> = {
  customer: "#dc2626",
  mechanic: "#2563eb",
  closest: "#16a34a",
  me: "#7c3aed",
};

const SYMBOLS: Record<MarkerKind, string> = {
  customer: "!",
  mechanic: "M",
  closest: "M",
  me: "Me",
};

// coloured dots made with CSS, so no marker image files are needed
function makeIcon(kind: MarkerKind) {
  const size = kind === "closest" ? 36 : 30;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${COLORS[kind]};color:#fff;font:600 12px sans-serif;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4)">${SYMBOLS[kind]}</div>`,
  });
}

// zooms so every marker is visible
function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();
  const key = markers.map((m) => `${m.id}:${m.lat}:${m.lng}`).join("|");

  // biome-ignore lint/correctness/useExhaustiveDependencies: key already describes markers
  useEffect(() => {
    if (markers.length === 0) return;
    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 15);
      return;
    }
    map.fitBounds(
      L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number])),
      { padding: [48, 48], maxZoom: 16 },
    );
  }, [key, map]);

  return null;
}

function ClickToPick({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({ click: (e) => onPick(e.latlng.lat, e.latlng.lng) });
  return null;
}

export default function MapCanvas({
  markers,
  lines = [],
  onPick,
  fit = true,
  height = 360,
}: {
  markers: MapMarker[];
  lines?: MapLine[];
  onPick?: (lat: number, lng: number) => void;
  fit?: boolean;
  height?: number;
}) {
  return (
    <MapContainer
      center={markers[0] ? [markers[0].lat, markers[0].lng] : DEFAULT_CENTER}
      zoom={markers[0] ? 14 : 11}
      scrollWheelZoom
      style={{ height, width: "100%", borderRadius: "1rem", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fit && <FitBounds markers={markers} />}
      {onPick && <ClickToPick onPick={onPick} />}

      {lines.map((line) => (
        <Polyline
          key={`${line.from}-${line.to}`}
          positions={[line.from, line.to]}
          pathOptions={{ color: "#16a34a", weight: 4, dashArray: "8 8" }}
        >
          {line.label && (
            <Tooltip permanent sticky>
              {line.label}
            </Tooltip>
          )}
        </Polyline>
      ))}

      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={makeIcon(m.kind)}>
          {m.label && <Popup>{m.label}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
}
