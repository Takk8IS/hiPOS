import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-[290px]" />
                <Skeleton className="h-4 w-[370px]" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-[180px]" />
                    <Skeleton className="h-4 w-[280px]" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                        <Skeleton className="h-10 flex-1" />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-8">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center"
                                >
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                    <div className="flex space-x-2">
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
