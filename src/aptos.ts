import Transport from '@ledgerhq/hw-transport'

const LEDGER_CLA = 0x5b
const P1_NON_CONFIRM = 0x00
const P2_LAST = 0x00
const GET_VERSION = 0x03
const STATUS_CODE_OK = 0x9000

export default class Aptos {
  readonly transport: Transport

  constructor (transport: Transport) {
    this.transport = transport
    this.transport.decorateAppAPIMethods(this, ['getVersion'], 'aptos')
  }

  async getVersion (): Promise<string> {
    const reply = await this.transport.send(
      LEDGER_CLA,
      GET_VERSION,
      P1_NON_CONFIRM,
      P2_LAST
    )
    const status = reply.readUInt16BE(reply.length - 2)
    if (status !== STATUS_CODE_OK) {
      throw new Error(`Failure with status code: 0x${status.toString(16)}`)
    }
    const [major, minor, patch] = reply.subarray(0, reply.length - 2)
    return `${major}.${minor}.${patch}`
  }
}
