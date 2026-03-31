import { featureItem } from "./feature.types";

interface props {
  feature: featureItem;
}

export default function FeatureCard({ feature }: props) {
  const Icon = feature.icon;
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div
        className={`${feature.bgColor} ${feature.textColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
      >
        <Icon className="text-xl" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{feature.h3}</h3>
        <p className="text-xs text-gray-500 font-medium">{feature.p}</p>
      </div>
    </div>
  );
}
