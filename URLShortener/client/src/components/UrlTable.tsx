import React from 'react';
import {UrlAddress} from "../types/UrlAddress";
import { useNavigate } from "react-router";
import {default as testData} from "./testData.json"

const UrlTable = () => {
    const urls = testData as UrlAddress[]
    const navigate = useNavigate()


    const handleDeleteLink = (id: string) => {

    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const navigateToLinkDetails = (id: string) => {
        navigate(`/link/?id=${id}`)
    }

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <input placeholder="Link..." type="text"/>
                <button type="submit">Cut down</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Short Link</th>
                    <th>Original Link</th>
                    <th>User</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {
                    urls.map((value) =>
                        <tr onClick={()=>{navigateToLinkDetails(value.id)}} key={value.id}>
                            <td>{value.shortUrl}</td>
                            <td>{value.originalUrl}</td>
                            <td>{value.userCreator.email}</td>
                            <td>
                                <button className={"delete-btn"} onClick={() => {
                                    handleDeleteLink(value.id)
                                }}>Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </section>
    );
};

export default UrlTable;