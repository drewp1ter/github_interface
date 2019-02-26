import * as localStorage from './local-storage-service'
import { ajax } from 'rxjs/ajax'

export default {
  getJSON: ajax.getJSON,
  localStorage
}
