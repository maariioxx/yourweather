import { MenuRowPropsType } from '../types/MenuRowPropsType';
import { Menu, Switch } from '@headlessui/react';
import { useEffect } from 'react';

export default function MenuRow({
  state,
  setState,
  localStorageName,
  title,
  leftinfo,
  rightinfo,
}: MenuRowPropsType) {
  useEffect(() => {
    localStorage.setItem(localStorageName, state.toString());
  }, [state, localStorageName]);
  return (
    <div className="flex flex-col gap-4 text-center justify-center p-4 items-center">
      <p>{title}</p>
      <Menu.Item key={crypto.randomUUID()} as={'div'} className="flex gap-2">
        {leftinfo}
        <Switch
          checked={state}
          onChange={setState}
          className={`${
            state ? 'bg-yellow-400' : 'bg-gray-200'
          } hover relative rounded-full inline-flex h-6 w-11 items-center transition-transform`}
        >
          <span
            className={`${
              state ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 rounded-full bg-white transition-all`}
          />
        </Switch>
        {rightinfo}
      </Menu.Item>
    </div>
  );
}
