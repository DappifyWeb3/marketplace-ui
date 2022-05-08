import { useContext } from 'react';
import CollectionSlider from 'components/CollectionSlider';
import NFTSlider from 'components/NFTSlider';
import TopSellersList from 'components/TopSellersList';
import Categories from 'components/Categories';
import Footer from 'components/Segment/Footer';
import CenteredText from 'components/Segment/CenteredText';
import LeftTextAndImage from 'components/Segment/LeftTextAndImage';
import SliderMultiImage from 'components/Segment/SliderMultiImage';
import SliderSingleImage from 'components/Segment/SliderSingleImage';
import SliderCarousel from 'components/Segment/SliderCarousel';
import News from 'components/Segment/News';
import { DappifyContext } from 'react-dappify';

const CenteredTextSection = (context, t) => (
  <section className='jumbotron no-bg h-vh landing-background' key='introCenter'>
      <CenteredText context={context} t={t} />
  </section>
);

const LeftTextAndImageSection = (context, t) => (
  <section className='jumbotron no-bg h-vh landing-background' key='introTitle'>
      <LeftTextAndImage context={context} t={t} />
  </section>
);

const SliderMultiImageSection = (context, t) => (
  <section className='jumbotron no-bg h-vh landing-background' key='introMulti'>
      <SliderMultiImage context={context} t={t} />
  </section>
);

const SliderSingleImageSection = (context, t) => (
  <section className='jumbotron no-bg h-vh landing-background' key='introSingle'>
      <SliderSingleImage context={context} t={t} />
  </section>
);

const HotCollectionsSection = (context, t) => (
  <section className='container no-bottom onStep fadeIn' key='collections'>
    <div className='row'>
      <div className='col-lg-12'>
        <div className='text-center'>
          <h2>{context.label || t('Hot collections')}</h2>
          <div className="small-border"></div>
        </div>
      </div>
      <div className='col-lg-12'>
        <CollectionSlider context={context} t={t} />
      </div>
    </div>
  </section>
);

const NewItemsSection = (context, t) => (
  <section className='container no-bottom onStep fadeIn' key='newsItem'>
    <div className='row'>
      <div className='col-lg-12'>
        <div className='text-center'>
          <h2>{context.label || t('New items')}</h2>
          <div className="small-border"></div>
        </div>
      </div>
      <div className='col-lg-12'>
        <NFTSlider context={context} t={t} />
      </div>
    </div>
  </section>
);

const TopSellersSection = (context, t) => (
  <section className='container no-bottom onStep fadeIn' key='sellers'>
    <div className='row'>
      <div className='col-lg-12'>
        <div className='text-center'>
          <h2>{context.label || t('Top sellers')}</h2>
          <div className="small-border"></div>
        </div>
      </div>
      <div className='col-lg-12'>
        <TopSellersList context={context} t={t} />
      </div>
    </div>
  </section>
);

const BrowseByCategorySection = (context, t) => (
  <section className='container onStep fadeIn' key='browse'>
    <div className='row'>
      <div className='col-lg-12'>
        <div className='text-center'>
          <h2>{context.label || t('Browse by category')}</h2>
          <div className="small-border"></div>
        </div>
      </div>
    </div>
    <Categories context={context} t={t} />
  </section>
)

const FooterSection = (context, t) => (
  <Footer context={context} key='footer' t={t} />
)

const SliderCarouselSection = (context, t) => (
  <section className='container onStep fadeIn' key='slider'>
    <SliderCarousel context={context} t={t} />
  </section>
);

const NewsSection = (context, t) => (
  <section className='container' key='news'>
    <div className='row'>
      <div className='col-lg-12'>
        <div className='text-center'>
          <h2>{context.label || t('Latest news')}</h2>
          <div className="small-border"></div>
        </div>
      </div>
    </div>
    <News context={context} t={t} />
  </section>
);

const sectionMapping = {
  static: CenteredTextSection,
  staticLeft: LeftTextAndImageSection,
  // groupShowcase: SliderMultiImageSection,
  // individualShowcase: SliderSingleImageSection,
  HotCollections: HotCollectionsSection,
  groupShowcase: NewItemsSection,
  sellers: TopSellersSection,
  categories: BrowseByCategorySection,
  Footer: FooterSection,
  individualShowcase: SliderCarouselSection,
  News: NewsSection
};

const Home = ({t}) => {
  const { configuration } = useContext(DappifyContext);
  const renderLayout = () => {
    const layout = [];
    configuration.landingPage.sections.forEach((segment) => {
      const component = sectionMapping[segment.type](segment.metadata, t)
      layout.push(component);
    });
    return layout;
  }

  return (
    <div className='theme-background'>
        {renderLayout()}
        <Footer context={configuration} key='footer' t={t}/>
    </div>
  )
};
export default Home;