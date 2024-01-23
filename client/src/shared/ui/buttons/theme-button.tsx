import { Sun, SunMoon } from 'lucide-react';
import globalStore from '../../../app/globalStore';
import { observer } from 'mobx-react-lite';
import Cookies from 'universal-cookie'

const ThemeButton = observer(() => {
  const cookies = new Cookies(null, { path: '/' });

  function changeTheme() {
    const root = document.getElementById('root');

    if (globalStore.theme === 'dark') {
      root?.classList.remove('dark');
    } else {
      root?.classList.add('dark');
    }

    globalStore.changeTheme();
    cookies.set('theme', globalStore.theme);
  }

  return (
    <button onClick={changeTheme}>
      {globalStore.theme === 'dark' ? (
        <Sun color='#f3f3f3' opacity={0.7} />
      ) : (
        <SunMoon color='#000000' />
      )}
    </button>
  ); 
});

export default ThemeButton;
