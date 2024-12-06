import '../styles/globals.css';
import NavigationBar from './components/NavigationBar';

function App({ Component, pageProps }) {
  return (
    <div>
      <NavigationBar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
