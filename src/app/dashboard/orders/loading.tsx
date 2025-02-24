import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-[290px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
                <Skeleton className="h-10 w-[120px]" />
            </div>

            <Card>
                <CardHeader className="space-y-1">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
                        <Skeleton className="h-10 w-full md:w-1/3" />
                        <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                            <Skeleton className="h-10 w-full md:w-2/3" />
                            <Skeleton className="h-10 w-full md:w-1/3" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
