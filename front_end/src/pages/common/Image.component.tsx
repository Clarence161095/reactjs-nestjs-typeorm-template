import { useEffect, useId, useState } from 'react';

export default function Image(props: any) {
  const [image, setImage] = useState('');

  useEffect(() => {
    props.setState(setImage);
  }, [props, props.setState]);

  const id = useId();

  return (
    <img
      key={id}
      src={image}
      alt={props?.alt || 'image'}
      className={`${props?.className}`}
      style={{ ...props?.style }}
      onClick={(call: any) => {
        if (props?.onClick) props?.onClick(call);
      }}
      onLoad={(call: any) => {
        if (props?.onLoad) props?.onLoad(call);
      }}
    />
  );
}
