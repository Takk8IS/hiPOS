import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px] mt-2" />
            </div>
            <div className="flex space-x-4">
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-[150px]" />
                    <Skeleton className="h-4 w-[250px] mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
