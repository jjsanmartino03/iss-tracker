import {Html, Head, Main, NextScript} from 'next/document'
import {ColorModeScript} from "@chakra-ui/react";

export default function Document() {
  return (
    <Html>
      <Head/>
      <body>
      <ColorModeScript initialColorMode={'dark'} />
      <Main/>
      <NextScript/>
      <script
        src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js"
        type="text/javascript">
      </script>
      </body>
    </Html>
  )
}
