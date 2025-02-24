import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <Skeleton className="h-8 w-[200px] mb-2" />
                    <Skeleton className="h-4 w-[300px]" />
                </div>
                <Skeleton className="h-10 w-[100px]" />
            </div>

            <div className="flex items-center space-x-4 mb-6">
                <Skeleton className="h-10 w-[240px]" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-[180px]" />
                    <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card
                        key={i}
                        className="bg-background rounded-lg shadow border-border"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>
                                <Skeleton className="h-4 w-[100px]" />
                            </CardTitle>
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-[100px] mb-1" />
                            <Skeleton className="h-3 w-[140px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-background rounded-lg shadow border-border">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-[200px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="bg-background rounded-lg shadow border-border">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-[200px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-background rounded-lg shadow border-border">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-[200px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="bg-background rounded-lg shadow border-border">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-5 w-[200px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
