import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import Serializable from '../errors/Serializable'
import { ag } from '../interfaces/index'
import TYPES from '../ioc/types'
import PendingState from './PendingState'

@provide(TYPES.UpdatesState)
export default class UpdatesState extends PendingState<ag.UpdatesStateDoc> implements ag.UpdatesState {
  public storeKey = 'updates'
  private storeNamespace: string

  constructor (
    @inject(TYPES.Logger) public logger: ag.Logger,
    @inject(TYPES.UpdatesStateStore) public store: ag.Store<ag.UpdatesStateDoc>
  ) {
    super(logger)
  }

  public configure (client: ag.Client) {
    this.storeNamespace = client.name
  }

  public async get (key?: string) {
    return this.store.get(this.resolveKey())
      .then((data) => data || {})
      .then((data) => key ? data[key] : data)
      .catch((error) => {
        this.logger.error(`get() ${new Serializable(error)}`)
        throw error
      })
  }

  public async set (nextState: Partial<ag.UpdatesStateDoc>) {
    this.store.set(this.resolveKey(), nextState).catch((error) => {
      this.logger.error(`set() ${new Serializable(error)}`)
    })
  }

  private resolveKey (): string {
    return `${this.storeNamespace}:${this.storeKey}`
  }
}
