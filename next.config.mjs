/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
      config.module.rules.push({
        test: /\.glb$/,
        use: ['file-loader'],
      });
  
      return config;
    },
  };

export default nextConfig;
