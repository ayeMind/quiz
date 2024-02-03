import { makeAutoObservable } from "mobx"
import { User } from "./interfaces";

function createGlobalStore() {
    return makeAutoObservable({
        theme: 'dark',
        changeTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        
        token: '',
        setToken(token: string) {
            this.token = token;
        },

        user: 'guest',
        email: '',
        avatar: 'guest.png',

        setUser(data: User) {
            this.user = data.user_name || 'guest';
            this.email = data.email || '';
            this.avatar = data.avatar || 'guest.png';
        },

        isAutorized: false,
        autorize() {
            this.isAutorized = true;
        },
        

        exit() {
            this.isAutorized = false;
            this.token = '';
        }
    })
}

const globalStore = createGlobalStore()
export default globalStore;