import { makeAutoObservable } from "mobx"

function createGlobalStore() {
    return makeAutoObservable({
        theme: 'dark',
        changeTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },

        user: 'guest',
        isAutorized: false,
        autorize() {
            this.isAutorized = true;
        }
    })
}

const globalStore = createGlobalStore()
export default globalStore;