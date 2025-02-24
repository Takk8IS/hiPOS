import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                <Skeleton className="h-10 w-[300px]" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-[180px]" />
                    <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-[120px]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-[120px]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-[120px]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-[100px]" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-[120px]" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-[150px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-[150px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-[150px]" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-[150px]" />
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
