import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head/>
      <body>
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
