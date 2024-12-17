import BackToMapButton from "@/components/BackToMapButton/BackToMapButton";

export default function PrivacyPolicy() {
  return (
    <div className="confidentiality-rules info-page">
      <h1>PRIVACY POLICY</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          At Walter Water, we prioritize your privacy and are committed to
          maintaining the confidentiality of your personal information. This
          document outlines our confidentiality rules, emphasizing our
          commitment to not storing any user data on our servers.
        </p>
      </section>

      <section>
        <h2>Information Collection</h2>
        <p>
          Walter Water is designed to ensure your privacy by not collecting or
          storing personal information. The app does not maintain any user data,
          including:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Location data</li>
          <li>Usage statistics</li>
        </ul>
      </section>

      <section>
        <h2>Communication with OSM</h2>
        <p>
          The Walter Water app interacts directly with OpenStreetMap (OSM) as a
          backend service to provide you with real-time data. When you use the
          app, requests are sent directly to OSM without any intermediate data
          storage or processing on our part. Your last known position is stored
          only on your device, not on our servers. Walter Water uses the
          overpass API to communicate with OSM.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          While we do not store personal information, we take data security
          seriously. All communications between the app and OSM are conducted
          over secure channels to protect the integrity of the data being
          transmitted.
        </p>
      </section>

      <section>
        <h2>Confidentiality of Your Information</h2>
        <p>
          Since Walter Water does not collect any personal information, there is
          no user data to share with third parties. We do not sell, trade, or
          otherwise transfer any information, ensuring your privacy remains
          intact. The only data storage is local, on your device and enables the
          app to remember your filters and last location.
        </p>
      </section>

      <section>
        <h2>User Control and Access</h2>
        <p>
          As no personal information is stored, you do not need to manage or
          modify any data within the app. Your interactions with the app remain
          entirely within your device and directly with OSM.
        </p>
      </section>

      <section>
        <h2>Changes to Our Confidentiality Rules</h2>
        <p>
          We may update these confidentiality rules periodically. Any changes
          will be posted on this page, and we encourage you to review it to stay
          informed about our practices.
        </p>
      </section>
      <BackToMapButton />

    </div>
  );
}
