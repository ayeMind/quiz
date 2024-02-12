import { makeAutoObservable } from "mobx"
import { User } from "./interfaces";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function createGlobalStore() {
    return makeAutoObservable({
        theme: cookie.get("theme") || 'light',
        changeTheme() {
            this.theme = (this.theme === 'light' ? 'dark' : 'light');
        },
        
        token: '',
        setToken(token: string) {
            this.token = token;
        },

        user_id: -1,
        user: 'guest',
        email: '',
        avatar: 'guest.png',

        setUser(data: User) {
            if (data.id === 0) {
                this.user_id = 0;
            } else {
                this.user_id = data.id  || -1;
            }
            
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
            this.user = 'guest';
            this.email = '';
            this.avatar = 'guest.png';
        }
    })
}

const globalStore = createGlobalStore()
export default globalStore;