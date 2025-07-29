interface propTypes {
  error: string;
  entityNameFormatted: string;
}

export const PostErrorConfig = ({ error, entityNameFormatted }: propTypes) => {
  let errorMessage = `Error Creating ${entityNameFormatted}`;

  if (error.includes('User already exists')) {
    errorMessage = 'This email is already registered. Please use another';
  } else if (error.includes('Duplicate entry')) {
    errorMessage = 'This entry already exists. Please use another';
  }

  return errorMessage;
};

interface patchPropTypes {
  error: any;
  entityNameFormatted: string;
}

export const PatchErrorConfig = ({
  entityNameFormatted,
  error,
}: patchPropTypes) => {
  switch (error) {
  }
};
