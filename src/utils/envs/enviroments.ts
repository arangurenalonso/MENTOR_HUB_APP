const getEnvVariable = () => {
  const env = {
    AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL,
  };

  return env;
};

export default getEnvVariable;
