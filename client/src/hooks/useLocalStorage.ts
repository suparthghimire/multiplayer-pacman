import { useState } from "react";

export default function useLocalStorage() {
  function GetItem(key: string) {
    return localStorage.getItem(key);
  }
  function SetItem(key: string, value: any) {
    if (typeof value !== "string") value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  return {
    GetItem,
    SetItem,
  };
}
