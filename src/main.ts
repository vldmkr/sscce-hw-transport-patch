import 'core-js/actual'
import Transport from '@ledgerhq/hw-transport'
import TransportWebUSB_6_27_13 from '@ledgerhq/hw-transport-webusb-6.27.13'
import TransportWebUSB_6_27_14 from '@ledgerhq/hw-transport-webusb-6.27.14'
import HwAptos from './aptos'

const $main = document.getElementById('main')!
const $btn_t_6_27_13 = document.getElementById('transport_6_27_13')!
const $btn_t_6_27_14 = document.getElementById('transport_6_27_14')!

$btn_t_6_27_13.addEventListener('click', async () =>
  getAptosVersion(TransportWebUSB_6_27_13)
)

$btn_t_6_27_14.addEventListener('click', async () =>
  getAptosVersion(TransportWebUSB_6_27_14)
)

async function getAptosVersion (itransport: ITransport) {
  $main.innerHTML = ''
  try {
    const transport = await itransport.create()
    const aptos = new HwAptos(transport)
    const version = await aptos.getVersion()

    const $code = document.createElement('code')
    $code.textContent = `Aptos App Version: ${version}`
    $main.appendChild($code)
  } catch (e) {
    console.error(e)
    const $err = document.createElement('code')
    $err.style.color = '#f66'
    $err.textContent = String(e.message || e)
    $main.appendChild($err)
  }
}

interface ITransport {
  create(): Promise<Transport>
}
