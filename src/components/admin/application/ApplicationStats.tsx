import { Activity, Globe2, TrendingUp, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ApplicationStatsProps {
  activePlatforms: number;
  totalUsers: number;
  totalVolume: number;
  totalCountries: number;
}

export function ApplicationStats({
  activePlatforms,
  totalUsers,
  totalVolume,
  totalCountries,
}: ApplicationStatsProps) {
  const stats = [
    {
      label: "Active Platforms",
      value: activePlatforms,
      icon: Activity,
    },
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
    },
    {
      label: "Monthly Volume",
      value: `$${Number(totalVolume).toLocaleString()}`,
      icon: TrendingUp,
    },
    {
      label: "Countries",
      value: totalCountries,
      icon: Globe2,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="
              overflow-hidden
              border-border/60
              bg-card
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>

                  <p className="mt-2 text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
