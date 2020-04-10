import * as React from 'react';
import {Image, Platform} from 'react-native';
// @ts-ignore
import shorthash from 'shorthash';
import RNFetchBlob from 'rn-fetch-blob';
interface ICacheImageProps {
  source: {
    uri: string;
  };
}
type CacheImageState = {
  source?: {uri: string} | null;
};
export default class CacheImage extends React.Component<
  ICacheImageProps,
  CacheImageState
> {
  state = {
    source: null,
  };
  componentDidMount = async () => {
    const {uri} = this.props.source;
    const name = shorthash.unique(uri);
    const path = `${RNFetchBlob.fs.dirs.CacheDir}/${name}`;
    const exists = await RNFetchBlob.fs.exists(path);
    if (exists) {
      this.setState({
        source: {
          uri: Platform.OS === 'android' ? 'file://' + path : '' + path,
        },
      });
      return;
    }
    const newImage = await RNFetchBlob.config({path}).fetch('GET', uri);
    this.setState({
      source: {
        uri:
          Platform.OS === 'android'
            ? 'file://' + newImage.path()
            : '' + newImage.path(),
      },
    });
  };
  render() {
    // @ts-ignore
    return <Image {...this.props} source={this.state.source} />;
  }
}
