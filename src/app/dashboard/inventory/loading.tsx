import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-[290px]" />
                    <Skeleton className="h-4 w-[240px]" />
                </div>
                <Skeleton className="h-10 w-[140px]" />
            </div>

            <div className="flex items-center space-x-2 mb-6">
                <Skeleton className="h-10 flex-1" />
            </div>

            <Card>
                <CardHeader className="space-y-1">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[360px]" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
