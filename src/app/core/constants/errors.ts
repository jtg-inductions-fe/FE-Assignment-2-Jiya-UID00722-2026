import { ErrorContent, HttpErrorCode } from '@core/models/errors.model';
import { ASSETS } from './assets';

export const ErrorMap: Partial<Record<HttpErrorCode, ErrorContent>> = {
  404: {
    title: 'Page not found',
    subtitle:
      'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
    imgUrl: ASSETS.IMAGES.NOT_FOUND,
  },
  400: {
    title: 'Something went wrong',
    subtitle: 'Please try again later',
  },
};
