import { Sun, SunMoon } from 'lucide-react';
import globalStore from '../../../app/globalStore';
import { observer } from 'mobx-react-lite';
import Cookies from 'universal-cookie'

const ThemeButton = observer(() => {
  const cookies = new Cookies(null, { path: '/', secure: true, sameSite: "none"});

  function changeTheme() {
    const root = document.getElementById('root');

    if (globalStore.theme === 'light') {
      root?.classList.add('dark');
    } else {
      root?.classList.remove('dark');
    }

    globalStore.changeTheme();
    cookies.set('theme', globalStore.theme);
  }

  return (
    <button onClick={changeTheme}>
      {globalStore.theme === 'light' ? (
         <SunMoon color='#000000' />
      ) : (
        <Sun color='#f3f3f3' opacity={0.7} />
      )}
    </button>
  ); 
});

export default ThemeButton;
