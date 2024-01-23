import { makeAutoObservable } from "mobx"

function createGlobalStore() {
    return makeAutoObservable({
        theme: 'dark',
        changeTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    })
}

const globalStore = createGlobalStore()
export default globalStore;