import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-amber-400",
  iconBgColor = "bg-amber-500/10",
}: StatsCardProps) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300 card-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-3">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 ${iconBgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
