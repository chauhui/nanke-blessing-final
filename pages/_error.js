import NextErrorComponent from 'next/error';

function MyError({ statusCode }) {
  return <NextErrorComponent statusCode={statusCode} />;
}

// SSR / CSR 兩側都能拿到 statusCode
MyError.getInitialProps = ({ res, err }) => {
  const status = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: status };
};

export default MyError; 