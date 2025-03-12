import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

export const CategoryCard = () => {
  return (
    <Card className={cn("w-full bg-secondary-accent")}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Category name</span>
          <ArrowRight />{" "}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md ">image</div>
      </CardContent>
      <CardFooter className="px-4">
        <Button className="w-full flex justify-between mx-0" variant={"link"}>
          Mark all as read <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
