import { Link } from 'react-router-dom';
import BackToMapButton from '../components/UI/BackToMapButton/BackToMapButton';
import ExternalLink from '../components/UI/ExternalLink/ExternalLink';

export default function FrequentlyAskedQuestions() {
  return (
    <main className="confidentiality-rules info-page">
      <h1>FREQUENTLY ASKED QUESTIONS</h1>

      <section>
        <h2>What is this app about?</h2>
        <p>
          This app helps users locate water amenities, toilets, and other
          essential points of interest (POIs) in outdoor areas. Whether you are
          hiking, camping, or enjoying a day at the park, this app provides
          information on nearby facilities to enhance your experience.
        </p>
      </section>

      <section>
        <h2>How do I use the interactive map?</h2>
        <p>
          Simply open the app to view the map. You can zoom in and out to
          explore different areas. Tap on the markers to see detailed
          information about each POI, including descriptions, photos, and user
          reviews.
        </p>
      </section>

      <section>
        <h2>How can I share my location?</h2>
        <p>
          You can allow the app to access your device&aposs GPS. Once enabled,
          your current location will be displayed on the map, making it easier
          to find nearby amenities.
        </p>
      </section>

      <section>
        <h2>What types of POIs can I find?</h2>
        <p>
          The app provides information on various amenities, including drinking
          water sources, toilets, rest areas, and other facilities relevant to
          outdoor activities.
        </p>
      </section>

      <section>
        <h2>Can I contribute to the map?</h2>
        <p>
          Yes! As Walter Water relies on OpenStreetMap data, you can directly{' '}
          <ExternalLink href="https://wiki.openstreetmap.org/wiki/Contribute_map_data">
            contribute to the map
          </ExternalLink>
          . This helps keep the map up to date and useful for everyone. In the
          future you will be able to edit POIs and contribute directly within
          the app, this feature is currently under developement.
        </p>
      </section>

      <section>
        <h2>Is the app available offline?</h2>
        <p>
          The app provides some offline functionality, allowing you to view
          previously loaded maps and POIs. However, for the best experience and
          to see the latest updates, an internet connection is recommended. This
          feature is still under developement and will be available in the
          future.
        </p>
      </section>

      <section>
        <h2>How do I report an issue with a POI?</h2>
        <p>
          If you find incorrect information or if a facility is closed, you can{' '}
          <ExternalLink href="https://www.openstreetmap.org/fixthemap">
            report it on OpenStreetMap
          </ExternalLink>
        </p>
      </section>

      <section>
        <h2>Are there any fees to use the app?</h2>
        <p>
          The app is free to download and use. Some premium features may require
          a subscription, but basic functionalities, including map access and
          POI information, are available for free.
        </p>
      </section>

      <section>
        <h2>What should I do if I can’t find a POI?</h2>
        <p>
          If a specific POI is not listed, it may not be included in our
          database yet. You can add the POI yourself or check back later as the
          database is regularly updated.
        </p>
      </section>

      <section>
        <h2>Is my personal information safe?</h2>
        <p>
          Yes, we prioritize your privacy and security. We do not share your
          personal information with third parties without your consent, you read
          more about our privacy policy <Link to="/about/privacy">here</Link>.
        </p>
      </section>

      <section>
        <h2>How can I provide feedback about the app?</h2>
        <p>
          We welcome your feedback! You can{' '}
          <ExternalLink href="https://github.com/Acetoshi/WalterWater/issues">
            submit an issue on github
          </ExternalLink>{' '}
          if you feel something is lacking or have a suggestion for the app !
        </p>
      </section>

      <section>
        <h2>What if I encounter a bug or issue with the app?</h2>
        <p>
          If you experience any technical issues, please{' '}
          <ExternalLink href="https://github.com/Acetoshi/WalterWater/issues">
            submit an issue on github
          </ExternalLink>{' '}
          with as many details as possible, you can include screenshots or any
          other information that might help the developer understand your
          problem
        </p>
      </section>

      <section>
        <h2>Can I support the Developer?</h2>
        <p>
          If you appreciate the work that goes into developing and maintaining
          this app, consider making a donation! Your support helps us improve
          the app and add new features. You can{' '}
          <ExternalLink href="https://www.paypal.com/donate/?business=N4JHHZPNKYP44&amount=5&no_recurring=0&currency_code=EUR">
            donate via PayPal
          </ExternalLink>{' '}
          . Thank you for your generosity!
        </p>
      </section>

      <BackToMapButton />
    </main>
  );
}
