import { Card, CardContent } from "@/components/ui/card";
import type { Platform } from "@/types/platform";

interface Props {
  platform: Platform;
}

const PlatformMetrics = ({ platform }: Props) => {
  const metrics = Object.entries(platform.metrics);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Platform Performance
          </h2>

          <p className="text-xl text-muted-foreground">{platform.shortDesc}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map(([key, value]) => (
            <Card key={key} className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-1">{value}</div>

                <div className="text-sm text-muted-foreground">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformMetrics;
