import localforage from 'localforage'
localforage.config({ name: 'zimdocs' })
export default {
  async save(k,v){ return localforage.setItem(k,v) },
  async get(k){ return localforage.getItem(k) },
  async remove(k){ return localforage.removeItem(k) }
}
