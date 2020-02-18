import axios from 'axios'
const RPCWebsockets = require('rpc-websockets').Client

const defaultOptions = {
  url: 'ws://localhost:11212',
  autoconnect: true,
  reconnect: true,
  reconnect_interval: 1000,
  max_reconnects: 0,
}

class ApiClient {
  options
  ws

  constructor(options) {
    this.options = options || defaultOptions
    this.ws = new RPCWebsockets(this.options.url, { ...this.options })
  }

  withOptions(opts) {
    return new ApiClient({ ...this.options, ...opts })
  }

  async notify(method, params) {
    return this.ws.notify(method, params)
  }

  async request(method, params) {
    return this.ws.call(method, params)
  }

  async subscribe(method) {
    return this.ws.subscribe(method)
  }

  async unsubscribe(method) {
    return this.ws.unsubscribe(method)
  }

  async open(handler) {
    return this.ws.on('open', handler)
  }

  async on(event, handler) {
    return this.ws.on(event, handler)
  }
}

export class WalletApi {
  client

  constructor() {
    this.client = new ApiClient()
  }
  // TODO(#594): Handle errors in a proper way
  _handleResponse(response) {
    return response && response.error ? response : { result: response || true }
  }

  _handleError(error) {
    return { error }
  }

  _callApiMethod(methodName) {
    return params =>
      this.client
        .request(methodName, params)
        .then(this._handleResponse)
        .catch(this._handleError)
  }

  async subscribeToNotifications(params, cb) {
    return this._callApiMethod('subscribe_notifications')([params.sessionId])
      .then(_ => {
        this.client.on('notifications', cb)
      })
      .catch(this._handleError)
  }
  async createDataRequest(params) {
    return this._callApiMethod('create_data_request')(params)
  }

  async createMnemonics(params) {
    return this._callApiMethod('create_mnemonics')(params)
  }

  async createWallet(params) {
    return this._callApiMethod('create_wallet')(params)
  }

  async generateAddress(params) {
    return this._callApiMethod('generate_address')(params)
  }

  async getTransactions(params) {
    return this._callApiMethod('get_transactions')(params)
  }

  async getBalance(params) {
    return this._callApiMethod('get_balance')(params)
  }

  async getWalletInfos(params) {
    return this._callApiMethod('get_wallet_infos')(params)
  }

  async importSeed(params) {
    return this._callApiMethod('import_seed')(params)
  }

  async lockWallet(params) {
    return this._callApiMethod('lock_wallet')(params)
  }

  async runRadRequest(params) {
    return this._callApiMethod('run_rad_request')(params)
  }

  async sendDataRequest(params) {
    return this._callApiMethod('send_data_request')(params)
  }

  async createVTT(params) {
    const defaultParams = { timeLock: 0 }
    return this._callApiMethod('create_vtt')({ ...defaultParams, ...params })
  }

  async unlockWallet(params) {
    return this._callApiMethod('unlock_wallet')(params)
  }

  async closeSession(params) {
    return this._callApiMethod('close_session')(params)
  }

  getAddresses(params) {
    return this._callApiMethod('get_addresses')(params)
  }

  sendTransaction(params) {
    return this._callApiMethod('send_transaction')(params)
  }

  saveItem(params) {
    return this._callApiMethod('set')(params)
  }

  getItem(params) {
    return this._callApiMethod('get')(params)
  }
}

export class MarketplaceApi {
  baseUrl = process.env.marketplaceUrl || 'https://witnet-marketplace-api-test.herokuapp.com'

  _handleResponse(response) {
    if (response && response.data) {
      return response.data
    }
  }

  _handleError(error) {
    return { error }
  }

  _get(url) {
    return axios
      .get(url)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  getTemplates() {
    return this._get(`${this.baseUrl}/templates`)
  }

  getTemplate(id) {
    return axios
      .get(`${this.baseUrl}/templates/${id}`)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  postTemplate() {}
}
