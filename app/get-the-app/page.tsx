import BackToMapButton from "@/components/BackToMapButton/BackToMapButton";

export default function GetTheApp() {
  return (
    <div className="confidentiality-rules info-page">
      <h1>PUT WALTER IN YOUR POCKET</h1>

      <section>
        <h2>What is a PWA?</h2>
        <p>
          A Progressive Web App (PWA) is a type of application that combines the
          best of websites and mobile apps. It’s fast, and you can easily add it
          to your home screen. With a PWA, you get a smooth experience without
          the need to download anything from an app store.
        </p>
      </section>

      <section>
        <h2>Installing Walter Water on Android</h2>
        <p>
          If you’re using an Android device, here’s how to get the Walter Water
          app:
        </p>
        <ol>
          <li>Open your browser, like Chrome.</li>
          <li>
            Go to our website. You’ll see a prompt at the bottom of your screen.
          </li>
          <li>
            Tap on “Add to Home screen.” This will create a shortcut for you.
          </li>
          <li>
            You can name it whatever you like, then hit “Add.” Now it’s on your
            home screen!
          </li>
        </ol>
      </section>

      <section>
        <h2>Installing Walter Water on iOS</h2>
        <p>For iPhone users, follow these steps to install Walter Water:</p>
        <ol>
          <li>Open Safari on your device.</li>
          <li>
            Visit our website, then tap the share icon (the square with an
            arrow).
          </li>
          <li>Scroll down and select “Add to Home Screen.”</li>
          <li>
            You can give it a name if you want, then tap “Add.” Now it will
            appear on your home screen!
          </li>
        </ol>
      </section>

      <section>
        <h2>Final Thoughts</h2>
        <p>
          That’s it! Installing Walter Water as a PWA is quick and easy. You’ll
          enjoy all the benefits right from your home screen. We hope you enjoy
          using the app!
        </p>
      </section>

      <BackToMapButton />
    </div>
  );
}
