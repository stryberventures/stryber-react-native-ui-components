import * as React from 'react';
import * as Icons from './index';

const IconsPack = () => (
  <>
    <h1>Default Icons Pack:</h1>
    <Icons.ArrowDown />
    <Icons.Calendar />
    <Icons.Check />
    <Icons.Close />
    <Icons.Eye />
    <Icons.EyeDisabled />
    <Icons.Minus />
    <Icons.Plus />
    <Icons.Search />
    <Icons.Speaker />
    <Icons.SpeakerMute />
    <Icons.UserIcon />
  </>
);

export default {
  title: 'IconsPack',
  component: IconsPack,
};

export const Default = () => <IconsPack />;
