import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import shorthash from 'shorthash';
import RNFetchBlob from 'rn-fetch-blob';

export default class CacheImage extends React.Component {
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
          uri: path,
        },
      });
      return;
    }
    const newImage = await RNFetchBlob.config({path}).fetch('GET', uri);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
  };

  render() {
    return <Image {...this.props} source={this.state.source} />;
  }
}

CacheImage.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
};
