import { ErrorContent, HttpErrorCode } from '@core/models/errors.model';
import { AssetPaths } from './assets';

export const ErrorMap: Partial<Record<HttpErrorCode, ErrorContent>> = {
  404: {
    title: 'Page not found',
    subtitle:
      'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
    imgUrl: AssetPaths.images.NOT_FOUND,
  },
};
