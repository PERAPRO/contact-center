"use client";

import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

/**
 * Custom hook to manage WebSocket data.
 *
 * @template T - The type of data being managed.
 * @param {function(T): boolean} matchFilters - A function to filter the data items.
 * @param {keyof T} key - The key to identify unique items in the data.
 * @returns {{ data: T[], setData: React.Dispatch<React.SetStateAction<T[]>> }} - An object containing the data array and a function to update it.
 *
 * @example
 * const { data, setData } = useWebSocketData<MyType>((item) => item.isActive, 'id');
 */
export default function useWebSocketData<T>(matchFilters: (item: T) => boolean, key: keyof T) {
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";
  const [data, setData] = useState<T[]>([]);
  const { lastMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectInterval: 5000,
  });

  useEffect(() => {
    if (lastMessage !== null) { 
      try {
        const updatedItem: T = JSON.parse(lastMessage.data);
        setData((prevData) => {
          const updatedIndex = prevData.findIndex((item) => item[key] === updatedItem[key]);
          if (updatedIndex !== -1) {
            return prevData.map((item) => (item[key] === updatedItem[key] ? updatedItem : item)).filter(matchFilters);
          }
          return [...prevData, updatedItem].filter(matchFilters);
        });
      } catch (error) {
        console.error("Error procesando el mensaje del WebSocket", error);
      }
    }
  }, [lastMessage]);

  return { data, setData };
}
