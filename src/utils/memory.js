/* 内存数据 */
import store from 'store'

export const getUser = () => (store.get('USER_KEY') || {});

export default {
    user: getUser()
}