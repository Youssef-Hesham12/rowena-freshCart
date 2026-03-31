import { featuresArr } from "./feature.data";
import FeatureCard from "./FeatureCard";

export default function StoreFeatures() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresArr.map((feature) => (
            <FeatureCard key={feature.h3} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
