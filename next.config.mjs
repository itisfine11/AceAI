/** @type {import('next').NextConfig} */
export const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", 
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://ace-ai-ashen.vercel.app", 
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT", 
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version", 
          },
        ],
      },
    ];
  },
};
