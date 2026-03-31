import { featureBarItem } from "./feature-bar.types";

interface props {
    feature: featureBarItem
}
export default function FeatureBarCard({ feature }: props) {
    const Icon = feature.icon;
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
        <Icon className="text-xl text-primary-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{feature.h3}</h3>
        <p className="text-gray-500 text-xs font-medium">{feature.p}</p>
      </div>
    </div>
  );
}
