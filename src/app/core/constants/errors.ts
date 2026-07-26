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
    title: 'Something has gone seriously wrong',
    subtitle:
      "It's always time for a coffee break We should be back by the time you finish your coffee.",
    imgUrl: ASSETS.IMAGES.BAD_REQUEST,
  },
};
