import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface TabItem {
  value: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
}

interface TextTabsProps {
  tabs: TabItem[];
}

export function TextTabs({ tabs }: TextTabsProps) {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
      <TabsList className="flex w-full min-w-max items-center justify-start gap-1 rounded-xl border border-border/60 bg-card p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="group relative flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-transparent px-4 text-sm font-medium text-muted-foreground shadow-none transition-all duration-200 hover:bg-muted/60
                hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 data-[state=active]:border-primary/10 data-[state=active]:bg-primary/10 data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              {Icon && (
                <Icon className="h-4 w-4 shrink-0 transition-colors duration-200 group-data-[state=active]:text-primary" />
              )}

              <span className="whitespace-nowrap">{tab.label}</span>

              {tab.badge !== undefined && (
                <Badge
                  variant="secondary"
                  className="ml-0.5 min-w-5 justify-center rounded-full border-0 bg-muted px-1.5
                    py-0.5 text-[10px] font-semibold leading-none text-muted-foreground transition-all duration-200 group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground"
                >
                  {tab.badge}
                </Badge>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
