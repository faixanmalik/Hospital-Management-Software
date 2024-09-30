import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
  <Html lang="en">
    <Head>
      {/* Add the external script within the Head */}
      <script
        src="https://www.chatbase.co/embed.min.js"
        chatbotId="JCJChWG3lLA4z5f5NA70G"
        domain="www.chatbase.co"
        defer
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.embeddedChatbotConfig = {
            chatbotId: "JCJChWG3lLA4z5f5NA70G",
            domain: "www.chatbase.co"
          };
        `,
      }}
    />
  </Html>
  );
}
