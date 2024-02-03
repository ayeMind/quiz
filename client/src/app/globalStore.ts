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
        },
        
        token: '',
        setToken(token: string) {
            this.token = token;
        }
    })
}

const globalStore = createGlobalStore()
export default globalStore;