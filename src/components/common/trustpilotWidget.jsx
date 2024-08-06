"use client";
import { useEffect } from "react";

const TrustpilotWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    script.onload = () => {
      window.Trustpilot &&
        window.Trustpilot.loadFromElement(
          document.getElementById("trustpilot-widget")
        );
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="trustpilot-widget"
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="YOUR_TEMPLATE_ID"
      data-businessunit-id="YOUR_BUSINESSUNIT_ID"
      data-style-height="24px"
      data-style-width="100%"
      data-theme="light"
    >
      <a
        href="https://www.trustpilot.com/review/YOUR_WEBSITE"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotWidget;
