import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex justify-between items-start mb-8">
                <Skeleton className="h-8 w-48" />
            </div>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                <div className="flex-1 space-y-4">
                    <div className="flex space-x-2">
                        <Skeleton className="h-10 flex-1" />
                    </div>
                    <div className="flex space-x-2 pb-4">
                        <Skeleton className="h-10 w-[180px]" />
                    </div>
                    <ScrollArea className="h-[70vh]">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <Card
                                        key={i}
                                        className="bg-background border-border"
                                    >
                                        <CardHeader>
                                            <Skeleton className="h-5 w-32" />
                                        </CardHeader>
                                        <CardContent>
                                            <Skeleton className="h-8 w-24" />
                                        </CardContent>
                                        <CardFooter>
                                            <Skeleton className="h-10 w-full" />
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card className="bg-background border-border">
                        <CardHeader>
                            <Skeleton className="h-6 w-24" />
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[50vh]">
                                {Array(3)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-16" />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Skeleton className="h-8 w-8" />
                                                <Skeleton className="h-4 w-4" />
                                                <Skeleton className="h-8 w-8" />
                                                <Skeleton className="h-8 w-8" />
                                            </div>
                                        </div>
                                    ))}
                            </ScrollArea>
                        </CardContent>
                        <Separator className="my-4" />
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="flex justify-between w-full">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
