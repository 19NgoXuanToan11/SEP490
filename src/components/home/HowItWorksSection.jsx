import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Step 1 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="font-semibold text-xl">Step 1: Sign Up</h3>
            <p>Create an account to start buying, selling, or exchanging devices.</p>
          </div>
          {/* Step 2 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="font-semibold text-xl">Step 2: Browse & List</h3>
            <p>Browse available devices or list your own for sale.</p>
          </div>
          {/* Step 3 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="font-semibold text-xl">Step 3: Complete Transaction</h3>
            <p>Complete your transaction securely and enjoy your new device!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 