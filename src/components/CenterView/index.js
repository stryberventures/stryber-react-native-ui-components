import React from 'react';
import {View} from 'react-native';
import style from './style';

interface ICenterView {
  middle: boolean;
  bottom: boolean;
}

const CenterView: React.FC<ICenterView> = ({children, middle, bottom}) => {
  const centerViewStyles = [middle && style.middle, bottom && style.bottom];
  return <View style={[style.main, ...centerViewStyles]}>{children}</View>;
};

CenterView.defaultProps = {
  children: null,
};

export default CenterView;
