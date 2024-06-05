import Description from '../client/components/description/Description';
import Footer from '../client/components/footer/Footer';
import Header from '../client/components/header/Header';

const Home = () => {
  return (
    <div className="page home">
      <Header />
      <Description />
      <Footer />
    </div>
  );
};

export default Home;
