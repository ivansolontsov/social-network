'use client';

import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';
import s from './PreloaderImage.module.scss';
import { Spin } from 'antd';

interface PrealoaderImageProps
  extends Omit<
    ImageProps,
    'className' | 'fill' | 'onLoadingComplete' | 'style'
  > {
  className?: string; // класснейм для враппера
  imgClassName?: string; // класснейм который будет присвоен NextImage тэгу
  position?: 'relative' | 'absolute' | 'static' | 'sticky' | 'fixed'; // position для враппера, тк у image всегда absolute
  preloader?: React.ReactNode; // если хотите использовать кастомный прелоадер
  objectFit?: 'contain' | 'cover'; // objectFit будет присвоен NextImage
  preloaderSize?: 'default' | 'large' | 'small'; // размер antd прелоадера, на кастомный не влияет
  isLoading?: boolean; // true - если хотите посмотреть как в итоге выглядит прелоадер :)
}

const PreloaderImage = (props: PrealoaderImageProps) => {
  const { isLoading = false } = props;
  const wrapperStyles: { [key: string]: string } = {};

  const [loading, setLoading] = useState(true);

  if (props.position) {
    wrapperStyles.position = props.position;
  }

  return (
    <div
      className={props.className}
      style={{
        ...wrapperStyles
      }}
    >
      {loading && props.preloader && (
        <div
          // className={'absolute left-0 top-0 w-full h-full flex justify-center items-center bg-black/10'}
          className={s.preloaderWrapper}
          style={{ zIndex: 2 }}
        >
          {props.preloader}
        </div>
      )}
      {loading && !props.preloader && (
        <div
          style={{ zIndex: 2 }}
          className={`${s.preloaderWrapper} ${s.preloaderGradient}`}
        >
          <Spin
            size={props.preloaderSize ? props.preloaderSize : 'default'}
          />
        </div>
      )}
      {isLoading ? (
        <></>
      ) : (
        <Image
          sizes={props.sizes}
          width={props.width}
          height={props.height}
          src={props.src}
          alt={props.alt}
          loading={props.loading}
          quality={props.quality}
          priority={props.priority}
          placeholder={props.placeholder}
          blurDataURL={props.blurDataURL}
          unoptimized={props.unoptimized}
          className={props.imgClassName}
          onClick={props.onClick}
          onLoadingComplete={() => setLoading(false)}
          style={{
            objectFit: props.objectFit ? props.objectFit : 'contain'
          }}
          fill
        />
      )}
    </div>
  );
};
export default PreloaderImage;
