import { AntdRegistry } from '@ant-design/nextjs-registry';
import ReactQuery from './components/ReactQuery';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
        }}>
        <AntdRegistry>
          <ReactQuery>{children}</ReactQuery>
        </AntdRegistry>
      </body>
    </html>
  );
}
