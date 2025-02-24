import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-4 w-[300px] mt-2" />
                </div>
                <Skeleton className="h-10 w-[120px]" />
            </div>
            <Skeleton className="h-10 w-[250px]" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-[150px]" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-4 w-[250px]" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[200px]" />
                                        <Skeleton className="h-4 w-[150px]" />
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
