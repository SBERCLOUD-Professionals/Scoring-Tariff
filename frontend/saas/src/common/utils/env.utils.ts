const isServer = () => typeof window === 'undefined';
const isClient = () => typeof window !== 'undefined';

const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const envUtils = {isServer, isClient, isDevelopment};
