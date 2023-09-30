'use client';

import React from 'react';
import Icon from '@ant-design/icons';
import {type CustomIconComponentProps} from '@ant-design/icons/lib/components/Icon';

export const BubbleTipIcon = (
  props: Partial<CustomIconComponentProps>
) => {
  const BubbleTipIcon = () => (
    <svg
      width='15'
      height='12'
      viewBox='0 0 15 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 0C6 0 11.7379 0 13.2 0C14.6621 0 15 1.5 13.65 3C12.3 4.5 6.49937 9.5 6 11C5.50064 12.5 6 0 6 0Z'
        fill='currentColor'
      />
      <rect width='6' height='12' fill='currentColor' />
    </svg>
  );
  return <Icon component={BubbleTipIcon} {...props} />;
};
