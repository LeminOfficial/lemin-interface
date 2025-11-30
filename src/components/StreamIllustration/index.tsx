export const StreamIllustration = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Flowing lines representing streams */}
    <path
      d="M0 100 Q100 80, 200 100 T400 100"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.3"
      className="flow-line"
    />
    <path
      d="M0 150 Q100 130, 200 150 T400 150"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.4"
      className="flow-line"
    />
    <path
      d="M0 200 Q100 180, 200 200 T400 200"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.5"
      className="flow-line"
    />
    <path
      d="M0 250 Q100 230, 200 250 T400 250"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.4"
      className="flow-line"
    />
    <path
      d="M0 300 Q100 280, 200 300 T400 300"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.3"
      className="flow-line"
    />

    {/* Animated dots */}
    <circle cx="50" cy="200" r="4" fill="currentColor" opacity="0.6">
      <animate
        attributeName="cx"
        from="0"
        to="400"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="150" cy="150" r="3" fill="currentColor" opacity="0.5">
      <animate
        attributeName="cx"
        from="0"
        to="400"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="250" cy="250" r="3" fill="currentColor" opacity="0.5">
      <animate
        attributeName="cx"
        from="0"
        to="400"
        dur="3.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
