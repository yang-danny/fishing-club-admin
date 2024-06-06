"use client"
import Loader from '@/components/custom ui/Loader'
import React, { useEffect, useState } from 'react'
import PublishNewsForm from '@/components/news/PublishNewsForm'
const publishNewsDetails = ({ params }: { params: { publishNewsId: string }}) => {
    const [loading, setLoading] = useState(true)
    const [publishNewsDetails, setPublishNewsDetails] = useState<PublishNewsType | null>(null)
    const getPublishNewsDetails = async () => {
        try { 
          const res = await fetch(`/api/publishNews/${params.publishNewsId}`, {
            method: "GET"
          })
          const data = await res.json()
          setPublishNewsDetails(data)
          setLoading(false)
        } catch (err) {
          console.log("[productId_GET]", err)
        }
      }
    
      useEffect(() => {
        getPublishNewsDetails()
      }, [])
      return loading ? <Loader /> : (
        <PublishNewsForm initialData={publishNewsDetails} />
      )
}

export default publishNewsDetails