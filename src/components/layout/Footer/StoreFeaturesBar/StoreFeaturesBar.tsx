import React from "react";
import FeatureBarCard from "./FeatureBarCard";
import { featuresBarArr } from "./feature-bar.data";

export default function StoreFeaturesBar() {
  return (
    <div className="bg-primary-50 border-y border-primary-100">
      <div className="container mx-auto px-4! py-6!">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresBarArr.map((feature) => (
            <FeatureBarCard key={feature.h3} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
