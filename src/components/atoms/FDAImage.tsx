import {Image, ImageSourcePropType} from 'react-native';
import React, {useState} from 'react';

import {isValidHttpUrl} from 'src/utils/helpers';
import type {FDAImage as FDAImageProps} from 'src/types/global';

import defautImage from 'src/assets/default.png';

const FDAImage = ({url, source, ...restProps}: FDAImageProps) => {
  const firstSrc = url
    ? isValidHttpUrl(url)
      ? {uri: url}
      : defautImage
    : source;
  const [src, setSrc] = useState<ImageSourcePropType>(firstSrc);

  const onError = () => {
    setSrc(defautImage);
  };

  return <Image source={src} {...restProps} onError={onError} />;
};

export default FDAImage;
