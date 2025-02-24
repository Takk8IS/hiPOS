import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-10 w-[280px]" />
                <Skeleton className="h-4 w-[500px]" />
            </div>

            <Card className="border-border">
                <CardHeader className="space-y-1">
                    <Skeleton className="h-5 w-[180px]" />
                    <Skeleton className="h-4 w-[360px]" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
