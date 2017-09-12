import BleManager from "react-native-ble-manager"
import {NativeAppEventEmitter} from "react-native"
import base64 from "base64-js"

let deviceId

BleManager.start()
console.log("BleManager.start")

export function getDevices() {
  const devices = {}
  return new Promise(res => {
    const discoverPeripheral = NativeAppEventEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      data => (devices[data.id] = data),
    )
    const stopScan = NativeAppEventEmitter.addListener(
      "BleManagerStopScan",
      () => {
        discoverPeripheral.remove()
        stopScan.remove()
        res(devices)
      },
    )
    BleManager.scan(["aa00"], 2, true)
  })
}

export async function connectDevice(dId) {
  await BleManager.connect(dId)
  deviceId = dId
}

export async function disconnectDevice() {
  await BleManager.disconnect(deviceId)
  deviceId = undefined
}

export async function getCount() {
  const data = await BleManager.read(deviceId, "AA00", "AA04")
  return parseInt(data, 16)
}

export async function getIndex() {
  const data = await BleManager.read(deviceId, "AA00", "AA01")
  return parseInt(data, 16)
}

export async function setIndex(index) {
  const data = base64.fromByteArray([index])
  await BleManager.write(deviceId, "AA00", "AA01", data, 512)
}

export async function getSsid() {
  const data = await BleManager.read(deviceId, "AA00", "AA02")
  const bytes = data.match(/.{1,2}/g).map(s => parseInt(s, 16))
  return String.fromCharCode(...bytes)
}

export async function setSsid(ssid) {
  await BleManager.write(deviceId, "BB00", "BB01", ssid, 512)
}

export async function setPassword(password) {
  await BleManager.write(deviceId, "BB00", "BB02", password, 512)
}
