export const getInputDevices = async () => {
  console.log("Checking for Media Devices.....");
  let cameras = [];
  let mics = [];
  let devices = await navigator.mediaDevices.enumerateDevices()
  console.log("List of available media devices :: ", devices);
  if (devices[0].label === '') {
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
    return getInputDevices();
  }

  devices.forEach((device, i) => {
    if (device.kind === "videoinput") {
      cameras.push({
        deviceId: device.deviceId,
        label: device.label || "Camera " + (i + 1),
      });
    } else if (device.kind === "audioinput") {
      mics.push({
        deviceId: device.deviceId,
        label: device.label || "Mic " + (i + 1),
      });
    }
  });
  return {
    cameras: cameras,
    mics: mics,
  }
}