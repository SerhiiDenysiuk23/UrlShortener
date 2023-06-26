import React, {useEffect, useLayoutEffect, useState} from 'react';
import {UrlAddress} from "../types/UrlAddress";
import {default as testData} from "./testData.json"



const UrlAbout = () => {
    const [url, setUrl] = useState<UrlAddress>()

    useLayoutEffect(() => {
        const queries = window.location.search.split("?")[1].split("&").reduce((acc: {[key:string]: string}, item) => {
            const keyValue = item.split('=')
            acc[keyValue[0]] = keyValue[1]
            return acc
        }, {})
        setUrl(testData.find(item => item.id == queries.id))
        console.log(queries)
    }, [window.location.search])

    if (!url)
        return null

    return (
        <section className={"aboutUrl"}>
            <div className="row">
                <div className="title">Original Url:</div>
                <div className="content">{url.originalUrl}</div>
            </div>
            <div className="row">
                <div className="title">Short Url:</div>
                <div className="content">{url.shortUrl}</div>
            </div>
            <div className="row">
                <div className="title">Created at:</div>
                <div className="content">{url.createdAt}</div>
            </div>
            <div className="row">
                <div className="title">Creator email:</div>
                <div className="content">{url.userCreator.email}</div>
            </div>
            <div className="row">
                <div className="title">Description:</div>
                <div className="content">{url.description}</div>
            </div>
        </section>
    );
};

export default UrlAbout;