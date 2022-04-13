import React, {FC} from 'react';
import './styles.css';

interface IWebUnsupportedPreview {
  title?: string;
  description: string;
  imageUrl: string;
}

const WebUnsupportedPreview: FC<IWebUnsupportedPreview> = ({
  title = 'This component is only available in native storybook',
  description,
  imageUrl,
}) => (
  <div className="wrapper">
    <div>
      <h1>Preview gif:</h1>
      <div className="image-wrapper">
        <img src={imageUrl} alt="DatePicker" />
      </div>
    </div>
    <div className="description">
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  </div>
);

export default WebUnsupportedPreview;
