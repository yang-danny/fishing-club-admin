"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { columns } from "@/components/news/PublishNewsColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import { Plus } from "lucide-react";
const PublishNews = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [publishNews, setPublishNews] = useState([]);
    const getPublishNews = async () => {
        try {
          const res = await fetch("/api/publishNews", {
            method: "GET",
          });
          const data = await res.json();
          setPublishNews(data);
          setLoading(false);
        } catch (err) {
          console.log("[publishNews_GET]", err);
        }
      };
      useEffect(() => {
        getPublishNews();
      }, []);
      return loading ? <Loader /> : (
        <div className="px-10 py-5">
          <div className="flex items-center justify-between">
            <p className="text-heading2-bold">Publish News</p>
            <Button className="bg-blue-1 text-white" onClick={() => router.push("/publishNews/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Publish News
            </Button>
          </div>
          <Separator className="bg-grey-1 my-4" />
          <DataTable columns={columns} data={publishNews} searchKey="title" />
        </div>
      );
    };
    
export default PublishNews