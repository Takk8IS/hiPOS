import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-10 w-[180px] mb-2" />
                    <Skeleton className="h-4 w-[240px]" />
                </div>
                <Skeleton className="h-9 w-[100px]" />
            </div>

            <Card>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Skeleton className="h-9 w-[200px]" />
                            <Skeleton className="h-9 w-[120px]" />
                        </div>
                        <Skeleton className="h-9 w-[180px]" />
                    </div>

                    <div className="border rounded-md">
                        <div className="border-b h-10 px-4 flex items-center">
                            {[120, 140, 160, 120, 100].map((width, i) => (
                                <div key={i} className="flex-1 px-2">
                                    <Skeleton
                                        className={`h-4 w-[${width}px]`}
                                    />
                                </div>
                            ))}
                        </div>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <div
                                key={row}
                                className="h-16 px-4 flex items-center border-b last:border-0"
                            >
                                {[120, 140, 160, 120, 100].map((width, i) => (
                                    <div key={i} className="flex-1 px-2">
                                        <Skeleton
                                            className={`h-4 w-[${width}px]`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
