export function getOrSetDeviceID(): string {
  // Check if localStorage is available (it's not in server-side rendering)
  if (typeof localStorage === 'undefined') {
    // Fallback or error handling if localStorage is not available
    // For server-side calls that might indirectly call this, this check is important.
    // However, this function is primarily intended for client-side use.
    console.warn("localStorage is not available. Cannot get/set device ID.");
    return "server-context-no-device-id"; // Or throw an error, or return a temporary ID
  }

  let deviceId = localStorage.getItem("blgcUserDeviceID");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("blgcUserDeviceID", deviceId);
  }
  return deviceId;
}
