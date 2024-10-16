import type {ApolloError} from '@apollo/client';

const handleGqlError = ({
  location = '',
  error,
}: {
  location: string;
  error: ApolloError;
}) => {
  console.warn(location, JSON.stringify(error));
};

export {handleGqlError};
