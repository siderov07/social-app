export function validateImage(image: File): string | null {
  let error: string = null;

  if (image.type !== 'image/jpeg') {
    error = 'The only allowed image type is JPG!';

  } else if (image.size > 500000) {
    error = 'The size limit is 500kb!';
  }

  return error;
}
